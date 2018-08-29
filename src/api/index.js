import AV from 'leancloud-storage'

const appId = 'q8g3HlgUiKEqf24UrolYvq2A-gzGzoHsz'
const appKey = 'jfcq3yLqQAUdynoHJNPVCUHv'

AV.init({ appId, appKey })

export default { SDK: AV }