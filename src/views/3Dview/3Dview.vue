<template>
  <div>
    <el-upload
        action=""
        :before-upload="handleBeforeUpload"
        :on-change="onFileChange"
        accept=".glb,.gltf"
    >
      <el-button type="primary">上传 GLTF/GLB 文件</el-button>
    </el-upload>
    <div ref="threejsContainer" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  setup() {
    const threejsContainer = ref(null);
    let renderer, camera, scene, controls;

    const initThreeJS = () => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
      );
      camera.position.set(0, 0, 5);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.outputEncoding = THREE.sRGBEncoding; // Enable gamma correction
      renderer.shadowMap.enabled = true;
      controls = new OrbitControls(camera, renderer.domElement);
      threejsContainer.value.appendChild(renderer.domElement);

      // Ambient light for general illumination
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Directional light to simulate sunlight
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight1.position.set(5, 10, 7.5);
      directionalLight1.castShadow = true;
      scene.add(directionalLight1);

      // Additional directional light for fill
      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight2.position.set(-5, -10, -7.5);
      scene.add(directionalLight2);

      // Point light for additional highlights
      const pointLight = new THREE.PointLight(0xffffff, 0.3);
      pointLight.position.set(0, 5, 0);
      scene.add(pointLight);

      animate();
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleBeforeUpload = (file) => {
      return false; // 阻止默认上传行为
    };

    const onFileChange = (file, fileList) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const arrayBuffer = event.target.result;
          const loader = new GLTFLoader();
          loader.parse(arrayBuffer, '', (gltf) => {
            console.log('GLB/GLTF 文件加载成功', gltf);
            scene.add(gltf.scene);
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 白色环境光，强度为0.5
            // 将环境光添加到场景中
            scene.add(ambientLight);
          }, (error) => {
            console.error('GLB/GLTF 文件解析失败:', error);
          });
        } catch (error) {
          console.error('GLB/GLTF 文件解析失败:', error);
        }
      };
      reader.readAsArrayBuffer(file.raw || file);
    };

    onMounted(() => {
      initThreeJS();
      window.addEventListener('resize', onWindowResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', onWindowResize);
    });

    return {
      threejsContainer,
      handleBeforeUpload,
      onFileChange,
    };
  },
};
</script>

<style scoped>
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>