import React, { useRef, useState } from 'react'
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import IconAntd from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Navigation } from 'react-native-navigation'

import Storage from './../constants/storage'

// 动态数据模拟：
const DtData = [
    {
        dtId: 1,
        uNickName: "-这家伙很懒-",
        time: '2020/11/04 21:02',
        uPhoto: require("../assets/dongtai/dongtai_13.png"),
        guanzhuCount: 65000,
        dtContent: '等待马甲线的52天今天只练早场消耗也蛮大的中午的牛排杂粮卷好好吃.',
        zanCount: 6696,
        msgCount: 2256,
        contentImg: [
            {
                cimgId: 1,
                img: require("../assets/dongtai/dongtai_17.png")
            },
            {
                cimgId: 2,
                img: require("../assets/dongtai/dongtai_19.png")
            },
        ]
    },
    {
        dtId: 2,
        uNickName: "冲A大力！",
        time: '2020/11/04 21:02',
        uPhoto: require("../assets/dongtai/dongtai_24.png"),
        guanzhuCount: 15000,
        dtContent: '帕梅拉简直是宝藏女孩啊！要说健练还是国外的狠，你累得面目全非，人家却无任何喘粗气的痕迹。',
        zanCount: 350,
        msgCount: 103,
        contentImg: [
            {
                cimgId: 1,
                img: require("../assets/dongtai/dongtai_28.png")
            },
            {
                cimgId: 2,
                img: require("../assets/dongtai/dongtai_29.png")
            },
        ]
    },
    {
        dtId: 3,
        uNickName: "撸铁绅士",
        time: '2020/11/04 21:02',
        uPhoto: require("../assets/dongtai/dongtai_32.png"),
        guanzhuCount: 25000,
        dtContent: '真正的稀缺资源是对方的谈吐，对方的知识面，对方 的商业视野，对方控制局面的能力，对方的情绪稳定。不要小看上面这些特点，要培养这些优点..',
        zanCount: 1235,
        msgCount: 564,
        contentImg: [
            {
                cimgId: 1,
                img: require("../assets/dongtai/dongtai_36.png")
            },
            {
                cimgId: 2,
                img: require("../assets/dongtai/dongtai_37.png")
            },
        ]
    },
    {
        dtId: 4,
        uNickName: "木木就是我啊",
        time: '2020/11/04 21:02',
        uPhoto: require("../assets/dongtai/dongtai_41.png"),
        guanzhuCount: 25000,
        dtContent: '时间返回到9年前记忆海绵体搜索其实顺产当天结束后一切正常',
        zanCount: 1234,
        msgCount: 244,
        contentImg: [
            {
                cimgId: 1,
                img: require("../assets/dongtai/dongtai_45.png")
            },
            {
                cimgId: 2,
                img: require("../assets/dongtai/dongtai_46.png")
            },
        ]
    }
]

// DynamicStateHeader子组件
const DynamicStateHeader = () => {
    return (
        <View style={styles.headercontainer}>
            <View style={styles.headeritem}>
                <MaterialIcons style={[styles.headericonview, styles.bglightblue]} name="library-books" size={30} color='white' />
                <Text style={styles.headertextview}>全部课程</Text>
            </View>
            <View style={styles.headeritem}>
                <MaterialIcons style={[styles.headericonview, styles.bglightpink]} name="tag" size={30} color='white' />
                <Text style={styles.headertextview}>热议话题</Text>
            </View>
            <View style={styles.headeritem}>
                <IconAntd style={[styles.headericonview, styles.bglightorange]} name="filetext1" size={30} color='white' />
                <Text style={styles.headertextview}>热议话题</Text>
            </View>
        </View>
    )
}
// DynamicStateFooter子组件
const DynamicStateFooter = () => {
    return (
        <View >
            <MaterialIcons style={styles.loads} name="timer" size={30} color="red" />
        </View>
    )
}

// renderitem的组件：
const dtRenderItem = (item, componentId) => {
    // 跳转到动态详细页面
    const goDynamicDetail = (dtId) => {
        Navigation.push(componentId, {
            component: {
                name: 'DynamicDetail',
                passProps: {
                    dtId
                }
            }
        })
    }
    return (
        <View style={styles.dtlistitem}>
            <View style={styles.dtitemheader}>
                <View style={styles.headeruser}>
                    <Image style={styles.uphoto} source={item.uPhoto} />
                    <View>
                        <Text style={styles.headerusername}>{item.uNickName}</Text>
                        <Text style={styles.headergzcount}>{item.guanzhuCount}人关注ta</Text>
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
                <Text style={styles.dtcontent}>{item.dtContent}...
                    <Text style={styles.dtmore} onPress={() => {
                        goDynamicDetail(item.dtId)
                    }}>全部</Text>
                </Text>
            </View>
            <View style={styles.dtimgs}>
                {item.contentImg.map((obj) => {
                    return (
                        <Image style={styles.dtimg} key={obj.cimgId} source={obj.img} />
                    )
                })}
            </View>
            <View style={styles.iconbars}>
                <View style={styles.iconbarleft}>
                    <View style={styles.iconsitem}>
                        <IconAntd style={styles.icons} name='like2' size={20} />
                        <Text>{item.zanCount}</Text>
                    </View>
                    <View style={styles.iconsitem}>
                        <IconAntd style={styles.icons} name='message1' size={20} />
                        <Text>{item.msgCount}</Text>
                    </View>

                </View>
                <View style={styles.iconbarright}>
                    <MaterialIcons name="more-horiz" size={30} color='gray' />
                </View>

            </View>
        </View>
    )
}

// 动态组件：
const DynamicState = (props) => {
    const flatref = useRef()
    const { componentId } = props
    const [list, setList] = useState(DtData)

    // 存储数据 到本地；
    Storage.save({
        key: "DtData",
        // id:'1',
        data: DtData
    })

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ref={flatref}
                data={list}
                style={styles.flatlist}
                keyExtractor={(item) => { //Key绑定
                    return item.dtId
                }}
                ListHeaderComponent={<DynamicStateHeader />}  //flatlist header子组件
                ListFooterComponent={<DynamicStateFooter />} // flatlist  footer子组件

                renderItem={({ item }) => { //容器的成员
                    return dtRenderItem(item, componentId)
                }}
                onEndReachedThreshold={0.01}
                onEndReached={() => {
                    Alert.alert('上拉触底', '可以通过上拉触底来加载新的数据')
                    flatref.current.scrollToIndex({  //设置滚动条滚动到容器的什么位置。
                        animation: true,
                        index: 1,  //滚动到容器的一个高度的比值； 
                        viewPosition: 1//当viewPosition 为 0 时将它滚动到屏幕顶部，为 1 时将它滚动到屏幕底部，为 0.5 时将它滚动到屏幕中央。
                    })
                }}
                refreshing={false}  //不显示加载数据的Loading效果动画
                onRefresh={() => {
                    Alert.alert('下拉刷新', '可以通过下拉刷新来加载新的数据')
                    flatref.current.scrollToIndex({  //设置滚动条滚动到容器的什么位置。
                        animation: true,
                        index: 0
                    })
                }}
            >
            </FlatList>
        </SafeAreaView>
    )
}


export default DynamicState

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    flatlist: {
        flex: 1,
        // backgroundColor:'orange'
    },
    headercontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20
    },
    headericonview: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 25,
        textAlign: 'center',
        lineHeight: 50
    },
    headeritem: {
        alignItems: 'center'
    },
    bglightblue: {
        backgroundColor: "#8baae1"
    },
    bglightpink: {
        backgroundColor: "#8a87d4"
    },
    bglightorange: {
        backgroundColor: "#e9c885"
    },
    headertextview: {
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    // footer
    loads: {
        textAlign: 'center',
        // backgroundColor:'#f3f3f3',
        // marginVertical: 20,
        paddingVertical: 20,
        color: 'gray'
    },
    // 动态的内容的CSS：
    dtlistitem: {
        marginBottom: 5,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    dtitemheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems:'center'
    },
    headeruser: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    uphoto: {
        width: 50,
        height: 50,
        marginRight: 5,
        borderRadius: 25,
    },
    headerusername: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    headergzcount: {
        color: 'gray',
        fontSize: 12,
    },
    guanzhutag: {
        backgroundColor: "#09f",
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 25,
        fontSize: 12,
    },
    // 动态文件内容：
    dtcontentview: {
        marginVertical: 10
    },
    dtcontent: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 30,
        color: '#4a4b4b'
    },
    dtmore: {
        color: "#c3c3c3",
        fontWeight: 'bold'
    },
    dtimgs: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    dtimg: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
    // 底部的常用字体图标 点赞，分享
    iconbars: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconbarleft: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconbarright: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    iconsitem: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    icons: {
        marginRight: 5
    },
    activezan: {
        color: '#0099ff'
    },
    // 关注ed
    guanzhued: {
        backgroundColor: 'gray'
    }
})
