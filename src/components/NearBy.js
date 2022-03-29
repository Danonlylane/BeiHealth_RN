//GO圈0附件组件页面
import React, { useRef, useState } from 'react'
import { Alert, FlatList, SafeAreaView, StyleSheet, Image, Text, View } from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconAntd from 'react-native-vector-icons/AntDesign'
// 必须要有的Data:
const DATA = [
    {
        zid: 1, title: '家家都有本难念的经，希望大家都好',
        nickname: '冲啊！黎明',
        zancount: 323,
        msgcount: 3,
        img: require('../assets/1.jpeg'),
        userphoto: require('../assets/1.jpeg')
    },
    {
        zid: 2, title: '练功练功！',
        nickname: '乐呵呵',
        zancount: 233,
        msgcount: 7,
        img: require('../assets/1.jpeg'),
        userphoto: require('../assets/1.jpeg')
    }, {
        zid: 3, title: '家家都有本难念的经，希望大家都好',
        nickname: '冲啊！黎明',
        zancount: 323,
        msgcount: 3,
        img: require('../assets/1.jpeg'),
        userphoto: require('../assets/1.jpeg')
    },
    {
        zid: 4, title: '练功练功！',
        nickname: '乐呵呵',
        zancount: 233,
        msgcount: 7,
        img: require('../assets/1.jpeg'),
        userphoto: require('../assets/1.jpeg')
    }, {
        zid: 5, title: '家家都有本难念的经，希望大家都好',
        nickname: '冲啊！黎明',
        zancount: 323,
        msgcount: 3,
        img: require('../assets/1.jpeg'),
        userphoto: require('../assets/1.jpeg')
    },
    {
        zid: 6, title: '练功练功！',
        nickname: '乐呵呵',
        zancount: 233,
        msgcount: 7,
        img: require('../assets/1.jpeg'),
        userphoto: require('../assets/1.jpeg')
    },
]
// 每个要渲染的列表成员
const renderItem = ({ item }) => {

    return (
        <View style={styles.item}>
            <View>
                <Image style={styles.themeImg} source={item.img}></Image>
            </View>
            <View style={styles.titleview}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.userinfo}>
                <Image style={styles.userphoto} source={item.userphoto} />
                <Text style={styles.nickname}>{item.nickname}</Text>
            </View>
            <View style={[styles.userinfo, styles.counts]}>
                <View style={styles.countnumber}>
                    <IconAntd name="like2" size={20} style={styles.icons} />
                    <Text>{item.zancount}</Text>
                </View>
                <View style={styles.countnumber}>
                    <IconAntd name="message1" size={15} style={styles.icons} />
                    <Text>{item.msgcount}</Text>
                </View>
            </View>
        </View>
    )
}

// 附近组件：
const Neraby = () => {
    const flatref = useRef()
    const [list, setList] = useState(DATA)

    const onEndReachedHandler = () => {
        Alert.alert('上列触底', '数据加载成功')
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* FlatList在进行多列布局时，目前不实现容器中成员的高度不致展示 效果。 */}
            <FlatList
                ref={flatref}
                data={list} //要渲染的数据
                renderItem={renderItem}  //每个容器成员组件
                keyExtractor={item => item.zid} //每个成员对应的Key，
                horizontal={false} // 取消水平布局
                numColumns={2} //设置多列布局的列数
                scrollEnabled={true}// false ,内容不能滚动，默认是true
                onRefresh={() => {
                    // 下拉刷新时，做一个交互
                    Alert.alert('下拉刷新', '重新请求后台数据')
                }}
                refreshing={false} //在等待加载新数据时将此属性设为 true，列表就会显示出一个正在加载的符号。
                onEndReachedThreshold={0.05} //设置上拉触底的位置，一个比例值
                onEndReached={onEndReachedHandler} //上拉触底事件的回调
                ListFooterComponent={(<View>
                    <MaterialIcons style={styles.loads} name="timer" size={30}></MaterialIcons>
                </View>)}
            >

            </FlatList>
        </SafeAreaView>
    )
}

export default Neraby

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",

    },
    // flatList 的Renderitem的样式
    item: {
        width: '50%',
        height: 350,
        padding: '1.5%',
        marginVertical: 5
    },
    themeImg: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 5,
        borderTopLeftRadius: 5
    },
    titleview: {
        height: 45,
        marginVertical: 5
    },
    title: {
        fontSize: 14,
        color: 'black'
    },
    userinfo: {
        display: 'flex',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nickname: {
        fontSize: 14,
        marginLeft: 10
    },
    userphoto: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    counts: {
        justifyContent: 'space-around'
    },
    countnumber: {
        display: 'flex',
        flexDirection: 'row'
    },
    icons: {
        paddingRight: 10
    },
    // footercomponent css:
    loads: {
        textAlign: 'center',
        marginVertical: 20
    }
})
