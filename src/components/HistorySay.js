import { StyleSheet, Text, View, SafeAreaView, FlatList, Button, ScrollView, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import storage from '../constants/storage'


const DataDetail = (props) => {
    const { itemObj } = props;
    return (
        <View>
            <View style={styles.textContainer}>
                <View><Text style={styles.textLeft}>时间：{itemObj.time}</Text></View>
                <View><Text style={styles.textLeft}>动态：{itemObj.detail}</Text></View>
                <View style={styles.picContainer}>
                    {
                        itemObj.photos.map(item => {
                            return (
                                <View style={styles.picContainer} key={item}>
                                    <View style={styles.flex}>
                                        <Image style={styles.image} source={{ uri: item }} />
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View style={styles.divi}></View>
        </View>

    )
}



// 主展示页面
const HistoryDataShow = (props) => {
    let [data, setData] = useState([]);
    // let [data1, setData1] = useState(0);

    storage.load({
        key: 'sayData',
    }).then(res => {
        // data = JSON.parse(res);
        data = res;
        setData(data);
        console.log(data);
        // setData([...data]); // 此做法会引起不断重复渲染
        // setData1(data1 + 1);
        // console.log('data: ', data);
        // console.log('data1: ', data1);
        // console.log(data instanceof Array);
        console.log(data)
    }).catch(err => {
        // console.log(err);
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.textContainer}>
                    {
                        data.map((item, index) => {
                            let itemObj = JSON.parse(item);
                            return <DataDetail itemObj={itemObj} key={index} />
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HistoryDataShow

HistoryDataShow.options = {
    topBar: {
        title: {
            text: '您的说说记录',
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f3f3f3',
    },
    divi: {
        height: 3,
        backgroundColor: 'white',
    },
    myText: {
        fontSize: 20,
    },
    textContainer: {
        // paddingHorizontal: 15,
        // paddingVertical: 6,
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 6,
        backgroundColor: '#f3f3f3',
    },
    textLeft: {
        fontSize: 13,
    },
    textRight: {
        fontSize: 13,
    },
    image: {
        height: 100,
        width: 100,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    picContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row'
    }
})