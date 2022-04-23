import { StyleSheet, Text, View, Image, TouchableHighlight, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'

import { Navigation } from 'react-native-navigation'
import IconAntd from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import storage from '../constants/storage'
import { deleteHealthData } from './BeiHealth'
import { deleteSayData } from '../screen/BeiRun'

const My = (props) => {
    const goHealthData = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'HealthDataShow',
                passProps: {}
            }
        })
    }

    const goSayData = () => {
        Navigation.push(props.componentId, {
            component: {
                name: 'HistorySay',
                passProps: {}
            }
        })
    }

    const clearKeyAllHealth = () => {
        storage.remove({ key: 'healthData' });
        deleteHealthData();
        // storage.clearMapForKey({ key: 'healthData' });
        // storage.clearMap();
    }

    const clearKeyAllSay = () => {
        // storage.clearMapForKey({ key: 'sayData' });
        storage.remove({ key: 'sayData' });
        deleteSayData();
    }

    const createTwoButtonAlertHealth = () =>
        Alert.alert(
            "确认",
            "确定删除所有健康数据",
            [
                {
                    text: "取消",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "确认", onPress: () => clearKeyAllHealth() }
            ]
        );

    const createTwoButtonAlertSay = () =>
        Alert.alert(
            "确认",
            "确定删除所有说说数据",
            [
                {
                    text: "取消",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "确认", onPress: () => clearKeyAllSay() }
            ]
        );

    return (
        <View style={styles.container}>
            <View style={styles.bgColor}>
                <View style={styles.userContainer}>
                    <View style={styles.userHeader}>
                        <Image style={styles.userPhoto} source={require('../assets/tmp1.jpg')} />
                        <View>
                            <Text style={styles.userName}>Danonlylane</Text>
                            <Text style={styles.userID}>ID:20183231051</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.userCenter}>用户中心</Text>
                    </View>
                </View>
            </View>

            <View style={styles.iconbars}>

                <View style={styles.whiteLine}></View>

                <TouchableHighlight
                    style={styles.button}
                    underlayColor='#F27600'
                    activeOpacity={0.8}
                    onPress={() => goHealthData()}>
                    <View style={styles.bgColor}>
                        <View style={styles.iconsItem}>
                            <MaterialIcons name='more-horiz' size={20} color='gray' />
                            <Text style={styles.myText}>历史健康数据</Text>
                        </View>

                    </View>
                </TouchableHighlight>
                <View style={styles.whiteLine}></View>

                <TouchableHighlight
                    style={styles.button}
                    underlayColor='#F27600'
                    activeOpacity={0.8}
                    onPress={() => goSayData()}>
                    <View style={styles.bgColor}>
                        <View style={styles.iconsItem}>
                            <MaterialIcons name='more-horiz' size={20} color='gray' />
                            <Text style={styles.myText}>历史动态数据</Text>
                        </View>

                    </View>
                </TouchableHighlight>
                <View style={styles.whiteLine}></View>

                <TouchableHighlight
                    style={styles.button}
                    underlayColor='#F27600'
                    activeOpacity={0.8}
                    onPress={() => createTwoButtonAlertHealth()}>
                    <View style={styles.bgColor}>
                        <View style={styles.iconsItem}>
                            <MaterialIcons name='delete' size={20} color='gray' />
                            <Text style={styles.myText}>清除全部健康记录</Text>
                        </View>
                    </View>
                </TouchableHighlight>

                <View style={styles.whiteLine}></View>

                <TouchableHighlight
                    style={styles.button}
                    underlayColor='#F27600'
                    activeOpacity={0.8}
                    onPress={() => createTwoButtonAlertSay()}>
                    <View style={styles.bgColor}>
                        <View style={styles.iconsItem}>
                            <MaterialIcons name='delete' size={20} color='gray' />
                            <Text style={styles.myText}>清除全部说说记录</Text>
                        </View>
                    </View>
                </TouchableHighlight>

                <View style={styles.whiteLine}></View>

                <TouchableHighlight
                    style={styles.button}
                    underlayColor='#F27600'
                    activeOpacity={0.8}
                    onPress={() => onPress()}>
                    <View style={styles.bgColor}>
                        <View style={styles.iconsItem}>
                            <IconAntd name='setting' size={20} color='gray' />
                            <Text style={styles.myText}>设置</Text>
                        </View>

                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

My.options = {
    topBar: {
        title: {
            text: '我的'
        }
    }
}

export default My

const styles = StyleSheet.create({
    // 动态的内容的CSS：
    container: {
        backgroundColor: "#fff",
    },
    bgColor: {
        backgroundColor: "#F2F2F2",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,

        // marginLeft: 19,
    },
    userHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userPhoto: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    userID: {
        color: 'gray',
        fontSize: 12,
    },
    userCenter: {
        backgroundColor: "#09f",
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 6,
        marginTop: 10,
        borderRadius: 25,
        fontSize: 12,
    },
    // 动态文件内容：

    // 底部的常用字体图标 点赞，分享
    whiteLine: {
        height: 5,
        backgroundColor: 'white',
    },
    iconbars: {
        flexDirection: 'column',
        marginTop: 5,
        paddingVertical: 10,
        // paddingHorizontal: 10,
    },
    iconsItem: {
        marginLeft: 10,
        flexDirection: 'row',
    },
    myText: {
        marginTop: 2,
        marginLeft: 10,
    }
})