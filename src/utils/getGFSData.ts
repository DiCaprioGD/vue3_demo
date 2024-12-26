import axios from 'axios'

// NOAA GFS 数据的 FTP 基础 URL
const GFS_BASE_URL = 'https://nomads.ncep.noaa.gov/pub/data/nccf/com/gfs/prod/'

// 获取最新的 GFS 数据
export const fetchLatestGFSData = async () => {
  try {
    // 获取当前日期
    const date = new Date()
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')

    // 构建 GFS 数据目录 URL
    const gfsDirUrl = `${GFS_BASE_URL}gfs.${year}${month}${day}/00/atmos/`

    // 构建 GFS 数据文件名（示例：gfs.t00z.pgrb2.0p25.f000）
    const gfsFileName = 'gfs.t00z.pgrb2.0p25.f000'

    // 完整的 GFS 数据文件 URL
    const gfsFileUrl = `${gfsDirUrl}${gfsFileName}`

    // 下载 GFS 数据文件
    const response = await axios.get(gfsFileUrl, { responseType: 'arraybuffer' })
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching GFS data:', error)
  }
}
