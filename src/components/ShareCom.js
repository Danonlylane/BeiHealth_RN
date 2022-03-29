// topBar 分享组件
import React from 'react'
import { StyleSheet, View, Share, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
const ShareCom = () => {
  // 分享的函数
  const userShare = async () => {
    // console.log("share")

    Share.share({
      message: '这是分享的数据信息',
      title: 'This is Title', //Android
      Content: '分享的内容',  //内容，Android,IOS通用
      url: "http://gxaedu.com"   //IOS
    }, {
      dialogTitle: '描述的标题'
    }).then(res => {
      console.log("分享的结果：", res)
      //  {"action": "sharedAction", "activityType": null}
      if (res.action == Share.sharedAction) {

        if (res.activityType) {
          // Alert.alert('',`成功分享到${res.activityType}`)
          console.log(`成功分享到${res.activityType}`)
        } else {
          console.log("分享成功")
          // Alert.alert('','分享成功')
        }

      } else if (res.action === Share.dismissedAction) {
        // Alert.alert('','分享失败')
        console.log('IOS分享失败')
      }
    }).catch(err => {
      console.log("err:", err)
    })
  }


  return (
    <View>
      <Icon name="share" size={30} color="gray" onPress={
        () => {
          // console.log("分享")
          userShare()
        }
      } />
    </View>
  )
}

export default ShareCom

const styles = StyleSheet.create({})
