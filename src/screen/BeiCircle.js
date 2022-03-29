import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Alert, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'

import NearBy from '../components/NearBy'
import Attention from '../components/Attention'
import DynamicState from '../components/DynamicState'

const BeiCircle = (props) => {
    const { componentId } = props
    const [searchText, setSearchText] = useState(' 大家都在搜21天减肥')
    const [searchValue, setSearchValue] = useState("")
    // 点击关注，附近、动态
    const [index, setTabsIndex] = useState(1)

    // 返回要渲染的Tabs组件：
    const showTabsComponent = (componentId) => {
        switch (index) {
            // case 1: return <NearBy componentId={componentId} />;
            case 1: return <Attention componentId={componentId} />;
            case 2: return <DynamicState componentId={componentId} />;
        }
    }

    return (
        <View style={styles.container}>
            {/* 顶部的搜索栏 */}
            <View style={styles.headersearchbar}>
                <View style={styles.searchinputbar}>
                    <Icon name="search" size={24} color="#999999"></Icon>
                    <TextInput
                        placeholder={searchText}
                        value={searchValue}
                        inlineImagePadding={5}
                        returnKeyType='search'
                        maxLength={50}
                        onSubmitEditing={() => {
                            Alert.alert('搜索', searchValue)
                        }}
                        onChangeText={(text) => {
                            setSearchValue(text)
                        }}
                        onFocus={(e) => {
                            e.target.clear() //清空输入框的内容
                        }}
                    ></TextInput>
                </View>
                <View style={styles.headericons}>
                    <Icon name="user-plus" size={20} color='gray'></Icon>
                    <Icon2 name="mail" size={20} color='gray'></Icon2>
                </View>
            </View>

            {/* 选项卡 */}
            <View style={styles.tabs}>
                {/* <View>
                    <TouchableHighlight>
                        <Text
                            style={index === 1 ? styles.activetab : styles.defaulttab}
                            onPress={
                                () => {
                                    setTabsIndex(1)
                                }
                            }
                        >附近</Text>
                    </TouchableHighlight>
                </View> */}
                <View>
                    <TouchableHighlight>
                        <Text
                            style={index === 1 ? styles.activetab : styles.defaulttab}
                            onPress={
                                () => {
                                    setTabsIndex(1)
                                }
                            }
                        >关注</Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight>
                        <Text
                            style={index === 2 ? styles.activetab : styles.defaulttab}
                            onPress={
                                () => {
                                    setTabsIndex(2)
                                }
                            }
                        >动态</Text>
                    </TouchableHighlight>
                </View>
            </View>

            {/* 选项卡内容展示 区 */}

            <View style={styles.tabscontent}>
                {
                    showTabsComponent(componentId)
                }
            </View>
        </View>
    )
}



BeiCircle.options = {
    topBar: {
        title: {
            text: '圈子'
        },
        visible: false
    },
    status: {
        visible: false
    }
}
export default BeiCircle

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headersearchbar: {
        height: 50,
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 30
    },
    searchinputbar: {
        width: '80%',
        height: 35,
        backgroundColor: '#eee',
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexShrink: 1,
        paddingLeft: 9,
    },
    headericons: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    // tabs
    tabs: {
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: "#dbd8d8",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    defaulttab: {
        height: 40,
        lineHeight: 40,
        color: "#000"
    },
    activetab: {
        height: 40,
        lineHeight: 40,
        borderBottomColor: "#0099ff",
        borderBottomWidth: 3,
        color: '#0099ff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    tabscontent: {
        flex: 1,
        // backgroundColor:'red'
    }
})
