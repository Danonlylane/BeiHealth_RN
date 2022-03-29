// GuanZhuItem,关注的内容子组件
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import IconAntd from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const GuanZhuItem = ({ data }) => {
    return (
        <>
            {/* 关注的用户的动态数据 */}
            <View style={styles.container}>
                {/* 头部信息 */}
                <View style={styles.headers}>
                    <Image style={styles.headersimg} source={data.uPhoto} />
                    <View>
                        <Text style={styles.headersnickname}>{data.uNickName}</Text>
                        <Text style={styles.headerstime}>{data.time}.{data.city}</Text>
                    </View>
                </View>
                {/* 发贴的内容 */}
                <View>
                    <Text style={styles.contenttext}>{data.content}</Text>
                </View>
                {/* 发贴的图片 */}
                <View>
                    <Image style={styles.msgimg} source={data.imgContent} />
                </View>
                {/* tags */}
                <View style={styles.tags}>
                    <View style={styles.tagitem} >
                        <Text style={styles.tagfirst}>#</Text>
                        <Text style={styles.tagtext}>{data.tag}</Text>

                    </View>
                </View>

                {/* 点赞，回贴数量 */}
                <View style={styles.tools}>
                    <View style={styles.defaulttools}>
                        <View style={styles.countnumber}>
                            <IconAntd style={[styles.icons, styles.colorblue]} name="like2" size={20} color='gray' />
                            <Text style={styles.colorblue}>{data.zanCount}</Text>
                        </View>
                        <View style={styles.countnumber}>
                            <IconAntd style={styles.icons} name="message1" size={20} color='gray' />
                            <Text>{data.msgCount}</Text>
                        </View>



                    </View>
                    <View style={styles.othertools}>
                        <View>
                            <MaterialIcons name="more-horiz" size={30} color="gray" />
                        </View>
                    </View>

                </View>

            </View>
            {/* 关注的用户的回帖的数据 */}
            {/* 评论，回帖列表 */}
            <View style={styles.msglist}>
                {
                    data.leaveWord.map((item) => {
                        return (
                            <View style={styles.msgitem} key={item.lid}>
                                <Text style={styles.msgnickname}>{item.luNickName}</Text>
                                <Text style={styles.msgtext}>{item.lmsg}</Text>
                            </View>
                        )
                    })
                }
                <View>
                    <Text style={styles.showmoremsg}>查看全部评论</Text>
                </View>
            </View>
        </>
    )
}

export default GuanZhuItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 10
    },
    headers: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    headersimg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    headersnickname: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    headerstime: {
        fontSize: 12,
        color: 'gray'
    },
    contenttext: {
        fontSize: 14,
        fontWeight: '800',
        lineHeight: 25,
        marginVertical: 15
    },
    msgimg: {
        width: 150,
        height: 150
    },
    tags: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10,
    },
    tagitem: {
        backgroundColor: '#7fccff',
        borderRadius: 25,
        flexDirection: 'row',
        padding: 5
    },
    tagfirst: {
        backgroundColor: "#fff",
        width: 16,
        height: 16,
        borderRadius: 8,
        textAlign: 'center',
        lineHeight: 16,
        color: '#c5c2f7',
        marginRight: 4,
        fontSize: 12
    },
    tagtext: {
        fontSize: 12,
        color: 'white'
    },
    tools: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    defaulttools: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    othertools: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    countnumber: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    icons: {
        paddingRight: 10,
    },
    colorblue: {
        color: '#7fccff'
    },
    // 评论，回帖
    msglist: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 10,
    },
    msgitem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    msgnickname: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        lineHeight: 24,
        marginRight: 10
    },
    msgtext: {
        color: '#d3d3d3'
    },
    showmoremsg: {
        lineHeight: 30,
        color: 'gray',
        fontSize: 16,
        marginVertical: 3
    }
})
