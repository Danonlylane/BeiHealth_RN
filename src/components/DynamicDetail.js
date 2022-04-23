// 动态详细组件页面
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import Storage from '../constants/storage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

//具体内容展示的子组件：
const DtRender = (props) => {
  let { item } = props
  return (
    <View style={styles.dtlistitem}>
      <View style={styles.dtitemheader}>
        <View style={styles.headeruser}>
          <Image style={styles.uphoto} source={item.uPhoto} />
          <View>
            <Text style={styles.headerusername}>{item.uNickName}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.guanzhutag}
            onPress={
              () => {
                Alert.alert('确定关注', "请确定你是否要关注该用户", [{ text: '取消' }, { text: '确定' }])
              }
            }
          >关注</Text>
        </View>
      </View>
      <View style={styles.dtcontentview}>
        <Text style={styles.dtcontent}>{item.dtContent}</Text>
      </View>
      <View style={styles.dtimgs}>
        {item.contentImg.map((obj) => {
          return <Image style={styles.dtimg} key={obj.cimgId} source={obj.img} />
        })}
      </View>
      <View style={styles.iconBars}>
        <View>
          <Text style={styles.time}>{item.time} 分享</Text>
        </View>
        <View>
          <MaterialIcons name="more-horiz" size={30} color="gray" />
        </View>
      </View>
    </View>
  )
}

const DynamicDetail = (props) => {
  // console.log(props.dtId)
  // let [dtId,setDtId]=useState(props.dtId)
  let [userInfo, setUserInfo] = useState({})

  Storage.load({
    key: "DtData"
  })
    .then(result => {
      let arr = result.filter((item) => {
        return item.dtId == props.dtId 
      })
      console.log("arr---", arr)
      console.log(result);
      arr.length !== 0 && setUserInfo(arr[0])
    })
    .catch(err => {
      // console.log(err)
    })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {userInfo.dtId != undefined && (<DtRender item={userInfo} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

DynamicDetail.options = {
  topBar: {
    title: {
      text: '动态详细'
    },
    rightButtons: [{
      id: 'ShareCom',
      component: {
        name: 'ShareCom'
      }
    }],
  },
  stateBar: {
    visible: false,
  }
}
export default DynamicDetail


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // 动态样式
  dtlistitem: {
    marginBottom: 5,
    backgroundColor: "#ffffff",
    // height: 200,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  // 动态内容的头部
  dtitemheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headeruser: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  uphoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  headerusername: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  headergucount: {
    fontSize: 12,
    color: 'gray',
    lineHeight: 25,
  },
  guanzhutag: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#0099ff",
    borderRadius: 25,
    color: 'white'
  },
  // 动态的文本内容
  dtcontentview: {
    marginVertical: 10,
  },
  dtcontent: {
    fontSize: 16,
    // fontFamily: '宋体',
    fontWeight: '500',
    lineHeight: 30,
  },
  dtmore: {
    color: '#c3c3c3',
    fontWeight: 'bold'
  },
  dtimgs: {
    marginVertical: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  dtimg: {
    width: 100,
    height: 100,
    marginRight: 20
  },
  // 底部的iconsBar.
  iconBars: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  time: {
    color: 'gray',
    fontSize: 12
  }
})
