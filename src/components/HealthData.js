import { StyleSheet, Text, View, SafeAreaView, FlatList, Button, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'

import storage from '../constants/storage'

const DataDetail = (props) => {
    const { itemObj } = props;
    return (
        <View>
            <View style={styles.textContainer}>
                <View><Text style={styles.textLeft}>时间：{itemObj.time}</Text></View>
                <View><Text style={styles.textLeft}>效果：{itemObj.detail}</Text></View>
            </View>
            <View style={styles.divi}></View>
        </View>

    )
}

// 主展示页面
const HealthDataShow = (props) => {
    let [data, setData] = useState([]);
    // let [data1, setData1] = useState(0);


    storage.load({
        key: 'healthData',
    }).then(res => {
        // data = JSON.parse(res);
        data = res;
        setData(data);
        // setData([...data]); // 此做法会引起不断重复渲染
        // setData1(data1 + 1);
        // console.log('data: ', data);
        // console.log('data1: ', data1);
        // console.log(data instanceof Array);
    }).catch(err => {
        console.log(err);
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

export default HealthDataShow

HealthDataShow.options = {
    topBar: {
        title: {
            text: '您的健康记录',
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
        marginHorizontal: 15,
        marginVertical: 6,
        backgroundColor: '#f3f3f3',
    },
    textLeft: {
        fontSize: 13,
    },
    textRight: {
        fontSize: 13,
    }
})