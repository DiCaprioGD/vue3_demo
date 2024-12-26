<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import WindJSLeaflet from 'wind-js-leaflet'
import config from '@/utils/mapconfig'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
let map = null
onMounted(() => {
  initMap()
  // fetchLatestGFSData()
})
const initMap = () => {
  // 创建地图对象
  const Esri_WorldImagery = L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  )

  //底图切换设置
  const baseLayers = {
    Satellite: Esri_WorldImagery
  }

  map = L.map('map', {
    attributionControl: false,
    layers: [Esri_WorldImagery]
  })
  const layerControl = L.control.layers(baseLayers)
  layerControl.addTo(map)
  //设置地图初始化中心点和级别
  map.setView([50.0, 14.44], 3)
  //风场图初始化加载
  WindJSLeaflet.init({
    localMode: true, //true，则加载本地风场数据源
    map: map, //地图对象
    layerControl: layerControl, //地图底图切换控件
    useNearest: false,
    timeISO: null,
    nearestDaysLimit: 7,
    displayValues: true,
    displayOptions: {
      displayPosition: 'bottomleft',
      displayEmptyString: 'No wind data'
    },
    overlayName: '风场图',
    errorCallback: handleError
  })
}
const handleError = async (err) => {
  console.log('handleError...')
  console.log(err)
}
// const GFS_BASE_URL = 'http://localhost:5173/pub/data/nccf/com/gfs/prod/'
// const fetchLatestGFSData = async () => {
//   try {
//     // 获取当前日期
//     const date = new Date()
//     const year = date.getUTCFullYear()
//     const month = String(date.getUTCMonth() + 1).padStart(2, '0')
//     const day = String(date.getUTCDate()).padStart(2, '0')
//
//     // 构建 GFS 数据目录 URL
//     const gfsDirUrl = `${GFS_BASE_URL}gfs.${year}${month}${day}/00/atmos/`
//
//     // 构建 GFS 数据文件名（示例：gfs.t00z.pgrb2.0p25.f000）
//     const gfsFileName = 'gfs.t00z.pgrb2.0p25.f000'
//
//     // 完整的 GFS 数据文件 URL
//     const gfsFileUrl = `${gfsDirUrl}${gfsFileName}`
//
//     // 下载 GFS 数据文件
//     const response = await axios.get(gfsFileUrl, { responseType: 'arraybuffer' })
//     console.log(response.data)
//   } catch (error) {
//     console.error('Error fetching GFS data:', error)
//   }
// }
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
.leaflet-canvas-layer {
  opacity: 0.55;
}
.leaflet-control-wind-position {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 0 5px;
  margin: 0 !important;
  color: #333;
  font:
    11px/1.5 'Helvetica Neue',
    Arial,
    Helvetica,
    sans-serif;
}
.wind-overlay {
  position: absolute;
  z-index: 1;
}
.titleContainer {
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.45);
  height: 50px;
  width: 100vw;
  z-index: 999;
  font-size: 14px;
  color: #fff;
  font-size: 28px;
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
