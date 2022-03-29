import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import GuanZhuItem from '../components/Follow'
//模拟数据
const GUANZHUDATA = [
  {
    uid: 1,
    uNickName: '猫叔慢跑',
    time: '2020/11/04 12:02',
    city: '成都市',
    content: '冬季运动需要注意什么？时间？饮食？装备？做好准备,远离伤病哦！大家加油哦！',
    tag: '冬季运动',
    zanCount: 2342,
    msgCount: 234,
    uPhoto: require('../assets/guanzhu/guanzhu_03.png'),
    imgContent: require('../assets/guanzhu/guanzhu_07.png'),
    leaveWord: [
      { lid: 1, luNickName: '迁徙南方', lmsg: '猫叔好幽默!' },
      { lid: 2, luNickName: '打击鼓起哦', lmsg: '天冷了，不想跑怎么办！' }
    ]
  },
  {
    uid: 2,
    uNickName: '猫叔慢跑',
    time: '2020/11/04 21:02',
    city: '成都市',
    content: '成都晚上真的太冷了，大家都在干什么呢？今天有好好的锻炼嘛？记得要拉伸放松哦！',
    tag: '冬季运动',
    zanCount: 1231,
    msgCount: 122,
    uPhoto: require('../assets/guanzhu/guanzhu_03.png'),
    imgContent: require('../assets/guanzhu/guanzhu_14.png'),
    leaveWord: [
      { lid: 1, luNickName: '啤酒小龙虾', lmsg: '还在拉伸！' },
      { lid: 2, luNickName: '冷静的知了', lmsg: '好的，猫叔' }
    ]
  },
  {
    uid: 3,
    uNickName: '陈背心',
    time: '2020/11/05 12:02',
    city: '成都市',
    content: '最近进入了一个工作、运动、工作的循环当中值得开心的是运动也在这个循环里...更多',
    tag: '坚持运动的那些天',
    zanCount: 1231,
    msgCount: 122,
    uPhoto: require('../assets/guanzhu/guanzhu_17.png'),
    imgContent: require('../assets/guanzhu/guanzhu_20.png'),
    leaveWord: [
      { lid: 1, luNickName: '风轻云淡', lmsg: '补充一下水分哦！' },
      { lid: 2, luNickName: '小猪佩奇', lmsg: '打卡，打卡！' }
    ]
  },
]
const Attention = () => {
  const [list, setList] = useState(GUANZHUDATA)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          list.map((item) => {
            return <GuanZhuItem data={item} key={item.uid} />
          })
        }
        <MaterialIcons style={styles.iconmore} name="timer" size={30} color="gray" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Attention

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  iconmore: {
    textAlign: 'center',
    paddingVertical: 10
  }
})
