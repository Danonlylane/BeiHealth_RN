import {
    StyleSheet, Text, View, ImageBackground, Dimensions, TextInput, TouchableHighlight,
    Alert, KeyboardAvoidingView, Platform
} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Navigation } from 'react-native-navigation';
// 设置宽高
const { width, height } = Dimensions.get('window');

const Login = (props) => {
    const [telValue, setTelValue] = useState('');

    // 监听输入框的值
    const onChangeText = (v) => {
        setTelValue(v);
    }

    // 清除手机号码
    const clearValue = () => {
        setTelValue('');
    }
    const checkTel = () => {
        let reg = /^[1][3,4,5,6,7,8][0-9]{9}$/
        if (reg.test(telValue)) {
            // Alert.alert('验证通过')
            // InputAuthCore
            // push 方法会有返回键
            Navigation.push(props.componentId, {
                component: {
                    name: 'InputAuthCore',
                    passProps: {
                        telValue
                    }
                }
            })

            // Navigation.showModal({
            //     stack: {
            //         children: [
            //             {
            //                 component: {
            //                     name: 'InputAuthCore',
            //                     // 向下一个导航页传递参数的方法
            //                     passProps: {
            //                         telValue
            //                     },
            //                     options: {
            //                         presentationStyle: {
            //                             fullScreen
            //                         }
            //                     }
            //                 }
            //             }
            //         ]
            //     }
            // })
        } else {
            Alert.alert('验证失败', '手机号输入不规范')
        }
    }
    // 验证手机号码
    return (
        <KeyboardAvoidingView behavior={Platform.OS != 'ios' ? 'padding' : 'height '}>
            <ImageBackground
                source={require('../assets/tmp1.jpg')}
                style={styles.bgImg}
            >
                <View style={styles.imgBgContainer}>
                    {/* 上半部分 */}
                    <View style={styles.header}>
                        <View style={styles.headerText}>
                            <Text style={styles.headerTextBig}>手机登录</Text>
                            <Text style={styles.headerTextSmall}>未注册？点此注册</Text>
                        </View>

                        <View style={styles.inputTel}>
                            <Text style={{ color: 'white', fontSize: 18 }}>+86</Text>
                            <Text style={styles.sortDown}>
                                <Icon name='sort-down' size={20} color='#fff' />
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                keyboardType='phone-pad'
                                value={telValue}
                                onChangeText={text => onChangeText(text)}
                                placeholder='请输入11位的手机号码'
                                placeholderTextColor='white'
                                maxLength={11}
                                onFocues={clearValue}
                                onSubmitEditing={
                                    checkTel
                                    // () => alert('输入完成')
                                }
                            >
                            </TextInput>
                        </View>
                        <TouchableHighlight
                            underlayColor='#DDD'
                            activeOpacity={0.6}
                            onPress={() => { checkTel() }}
                            style={{ borderRadius: 40 }}
                        >
                            <View style={styles.loginButton}>
                                <Text style={styles.loginText}>一键登录</Text>
                            </View>
                        </TouchableHighlight>
                    </View>


                    {/* 下半部分 */}
                    <View style={styles.loginOther}>
                        <View>
                            <Text style={styles.otherTitle}>其他登录方式</Text>
                        </View>
                        <View style={styles.otherIconList}>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor='rgba(0,0,0,0.5)'
                                style={styles.otherIconItem}
                                onPress={() => { }}
                            >
                                <Icon style={styles.otherIcon} name='weixin' size={20} color='#fff' />
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor='rgba(0,0,0,0.5)'
                                style={styles.otherIconItem}
                                onPress={() => { }}

                            >
                                <Icon style={styles.otherIcon} name='qq' size={20} color='#fff' />
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor='rgba(0,0,0,0.5)'
                                style={styles.otherIconItem}
                                onPress={() => { }}

                            >
                                <Icon style={styles.otherIcon} name='weibo' size={20} color='#fff' />
                            </TouchableHighlight>
                        </View>
                        <View>
                            <Text style={styles.footerDes}>登录即代表同意 倍健康
                                <Text style={styles.textLink}> 用户协议 </Text>
                                和
                                <Text style={styles.textLink}> 隐私政策 </Text>
                            </Text>
                        </View>
                    </View>
                </View>

            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

Login.options = {
    statusBar: {
        visible: false,
    },
    topBar: {
        visible: false,
    },
}

export default Login

const styles = StyleSheet.create({
    bgImg: {
        height: height,
        width: width,
    },
    imgBgContainer: {
        height: height,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        paddingHorizontal: 40
    },
    header: {
        height: '50%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
    },
    headerText: {
        paddingTop: 80,
        paddingBottom: 0,
    },
    headerTextBig: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },
    headerTextSmall: {
        fontSize: 12,
        color: 'white',
        paddingTop: 5
    },

    inputTel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 25,
        height: 50,
        paddingHorizontal: 40,
        marginBottom: 0,
    },
    textInput: {
        flexGrow: 1,
        height: 50,
        fontSize: 18,
        borderWidth: 0,
        color: 'white',
    },
    sortDown: {
        marginHorizontal: 5,
        marginTop: -8,
    },
    loginButton: {
        paddingHorizontal: 10,
        paddingVectical: 15,
        marginTop: -40,
        backgroundColor: 'rgba(3, 118, 191, 0.7)',
        borderRadius: 40,
        height: 50,
    },
    loginText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        lineHeight: 50,
    },
    loginOther: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVectical: 20,
        paddingTop: 250,
    },
    otherTitle: {
        color: 'white',
        fontSize: 16,
        paddingBottom: 20,

    },
    otherIconList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVectical: 20,
        paddingBottom: 20,
    },
    otherIconItem: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 25,
        marginHorizontal: 20
    },
    otherIcon: {
        width: 50,
        height: 50,
        textAlign: 'center',
        lineHeight: 50,
    },
    footerDes: {
        color: 'white',
        fontSize: 12,
    },
    textLink: {
        textDecorationLine: 'underline'
    }
})