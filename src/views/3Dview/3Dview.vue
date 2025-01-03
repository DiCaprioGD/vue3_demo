<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column">
    <el-upload
      action=""
      :before-upload="handleBeforeUpload"
      :on-change="onFileChange"
      accept=".glb,.gltf"
    >
      <el-button type="primary">上传 GLTF/GLB 文件</el-button>
    </el-upload>
    <div ref="threejsContainer" style="width: 100%; height: 90%; flex: 1"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const threejsContainer = ref<HTMLElement | null>(null)
let renderer: THREE.WebGLRenderer
let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let controls: OrbitControls

const initThreeJS = () => {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
  camera.position.set(0, 0, 5)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  updateRendererSize()
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  renderer.outputEncoding = THREE.sRGBEncoding // Enable gamma correction
  renderer.shadowMap.enabled = true
  controls = new OrbitControls(camera, renderer.domElement)
  if (threejsContainer.value) {
    threejsContainer.value.appendChild(renderer.domElement)
  }

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight1.position.set(5, 10, 7.5)
  directionalLight1.castShadow = true
  scene.add(directionalLight1)

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight2.position.set(-5, -10, -7.5)
  scene.add(directionalLight2)

  const pointLight = new THREE.PointLight(0xffffff, 0.3)
  pointLight.position.set(0, 5, 0)
  scene.add(pointLight)

  animate()
}

const updateRendererSize = () => {
  if (threejsContainer.value) {
    const { width, height } = threejsContainer.value.getBoundingClientRect()
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
}

const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

const onWindowResize = () => {
  updateRendererSize()
}

const handleBeforeUpload = (file: File) => {
  return false // 阻止默认上传行为
}

const onFileChange = (file: any, fileList: any) => {
  const reader = new FileReader()
  reader.onload = (event) => {
    try {
      const arrayBuffer = event.target?.result as ArrayBuffer
      const loader = new GLTFLoader()
      loader.parse(
        arrayBuffer,
        '',
        (gltf) => {
          console.log('GLB/GLTF 文件加载成功', gltf)
          scene.add(gltf.scene)
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // 白色环境光，强度为0.5
          // 将环境光添加到场景中
          scene.add(ambientLight)
        },
        (error) => {
          console.error('GLB/GLTF 文件解析失败:', error)
        }
      )
    } catch (error) {
      console.error('GLB/GLTF 文件解析失败:', error)
    }
  }
  reader.readAsArrayBuffer(file.raw || file)
}

onMounted(() => {
  initThreeJS()
  window.addEventListener('resize', onWindowResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
})
</script>

<style scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
