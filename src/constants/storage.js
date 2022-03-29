// APP本地存储的配置文件
import Storage from 'react-native-storage'
// import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
// 链接：react-native link @react-native-community/async-storage
export default new Storage({
    size: 1000, //最大容量，默认值 是1000条数据循环存储； 
    // 存储引擎： 对于RN来讲，使用AsyncStorage，而不是web中使用的window.localStorage; 
    // 如果不配置这个属性，则数据是保存在内存中的，重启后丢失。
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24, //有效的时间
    enableCache: true
})