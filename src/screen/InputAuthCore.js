import {
    StyleSheet, Text, View, ImageBackground, Dimensions, SafeAreaView,
    TouchableHighlight
} from 'react-native'
import React, { useState, useEffect } from 'react'
// https://github.com/retyui/react-native-confirmation-code-field
// 安装：npm install --save react-native-confirmation-code-field

import { Navigation } from 'react-native-navigation';
import { MainRoot } from '../navigation';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const { width, height } = Dimensions.get('window');

// 验证码页面
const InputAuthCore = (props) => {
    const CELL_COUNT = 4
    // 验证码
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props1, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    // 是否激活确定按钮的样式
    const [isAcitve, setActive] = useState(false)
    // 初始时间值：
    var second = 60
    const [time, modifyTimeValue] = useState(second)
    const [timeId, setTimeId] = useState(null) // 定时器对象

    // 判断是否输入了4位验证码：
    const checkValueLength = (text) => {
        setValue(() => {
            if (value.length + 1 == 4) {
                setActive(true)
            }
            return text
        })
        // console.log(value.length)
    }
    // 提交请求：手机号码 + 验证码  
    const submitHandler = () => {
        if (isAcitve == false) return
        // console.log("手机号码：", props.telValue)
        // console.log("输入的验证码：",value)
        //  ajax, fetch(), axios,...
        /* 
        fetch('http://192.168.2.253:8000/api/login',
          {
            method: 'post',
            // body: JSON.stringify({tel:props.telValue,authCode:value}),
            body: JSON.stringify({ userName: 'wqw', passWord: '123456' }),
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          }).then(res => res.json())
          .then(res => {
            // console.log("请求后台的数据：",res)
            if (res.code === 200) {
              // Alert.alert('请求结果','成功请求了后台接口')
              Navigation.setRoot(MainRoot)
              // 演示dismissModal(),会回到上一次显示的屏幕页面
              // Navigation.dismissModal(props.componentId)
            }
          })
          .catch(err => {
            console.log("error:", err)
          }) */
        Navigation.dismissModal(props.componentId)
        Navigation.setRoot(MainRoot)

    }

    // 请求发送验证码的方法：
    const getCode = () => {
        console.log('请求后台，发送短信到当前的手机号码', props.telValue)
    }

    // 定时器的函数：
    const changeTime = (time) => {

        const codeTime = time;
        let now = Date.now()
        const overTimeStamp = now + codeTime * 1000 + 100; //100毫秒，用于时间的容错

        setTimeId(setInterval(function () {
            const nowStamp = Date.now()
            if (nowStamp >= overTimeStamp) {
                // 倒计时结束
                clearInterval(timeId)
            } else {
                const leftTime = parseInt((overTimeStamp - nowStamp) / 1000, 10)
                // modifyTimeValue(leftTime)
            }
        }, 1000))
    }

    useEffect(() => {
        getCode()
        // changeTime(second)
        const listener = {
            componentDidAppear: () => {
                changeTime(second)
            },
            componentDidDisappear: () => {
                clearInterval(timeId)
            }
        }
        const unsubscribe = Navigation.events().registerComponentListener(listener, props.componentId);

        return () => {
            clearInterval(timeId)
            unsubscribe.remove()//取消订阅
        }

    }, []);
    
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/tmp1.jpg')} style={styles.bgImg}>
                <View style={styles.bgContainer}>
                    {/* 获取上一个页面的手机号码 */}
                    <View style={styles.headertext}>
                        <Text style={styles.headertextdes}>请输入验证码</Text>
                        <Text style={styles.headertextdestel}>已发送 4 位验证码到+86 <Text style={styles.headertelvalue}>{props.telValue}</Text></Text>
                    </View>
                    {/* 验证码输入框布局 */}
                    <SafeAreaView style={styles.root}>
                        <CodeField
                            ref={ref}
                            {...props1}
                            value={value}
                            onChangeText={(text) => {
                                checkValueLength(text)
                            }}
                            onFocus={() => {
                                setActive(false)
                            }}
                            onSubmitEditing={() => {
                                if (value.length === 4) {
                                    console.log("验证码输入完整")
                                } else {
                                    console.log("验证码输入不完整")
                                }
                            }}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            // android
                            keyboardType="number-pad"
                            // ios
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                    </SafeAreaView>
                    {/* 确定按钮 */}
                    <TouchableHighlight
                        onPress={submitHandler}
                        style={[styles.buttonwrap, isAcitve ? styles.activebuttonwrap : ""]}
                    >
                        <View>
                            <Text style={styles.button}>确定</Text>
                        </View>
                    </TouchableHighlight>

                    {/* 倒计时功能 */}
                    <View>
                        <Text style={styles.regain}
                            onPress={() => {
                                //  防止重复点击
                                if (time != 0) return
                                // 重新初始化time的值； 
                                modifyTimeValue(second)
                                // 重新调用定时器
                                changeTime(second)
                            }}
                        >重新获取(<Text style={styles.time}>{time}</Text>)</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

InputAuthCore.options = {
    topBar: {
        visible: false,
    },
    statusBar: {
        visible: false,
    }
}
export default InputAuthCore

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'flex-start',
    },
    bgImg: {
        flex: 1,
        height: height,
        width: width,
    },
    bgContainer: {
        height: height,
        // width: width,
        backgroundColor: 'rgba(0,0,0,0.3)',
        // alignItems: 'center',
        paddingHorizontal: 40
    },
    headertext: {
        marginTop: 80,

    },
    headertextdes: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    headertextdestel: {
        color: 'white',
        fontSize: 12,
        marginTop: 10,
        fontWeight: '700'
    },
    headertelvalue: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    // 验证码
    root: { padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 60,
        height: 60,
        lineHeight: 58,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#ffffff60',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: 'white',
        borderRadius: 1,
    },
    focusCell: {
        borderColor: '#fff',
    },

    // 确定按钮
    buttonwrap: {
        marginTop: 30,
        borderRadius: 25,
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    activebuttonwrap: {
        backgroundColor: 'rgba(47,152,255,0.8)'
    },
    button: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18
    },
    // 倒计时
    regain: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        marginTop: 20
    },
    time: {
        color: 'gray',
        fontWeight: 'bold'
    }
})
