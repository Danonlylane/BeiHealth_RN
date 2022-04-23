import {
  StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Linking,
  Alert, SafeAreaView, Keyboard, ScrollView
} from 'react-native'
import React, { useState } from 'react'

import storage from '../constants/storage'
import { Navigation } from 'react-native-navigation'


let fat = 0;
let fatAddorDec = '减少';
let healthData = [];

const deleteHealthData = () => {
  healthData = [];
}

const BeiHealth = (props) => {
  const [weight, setWeight] = useState('');

  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const onPress = () => {
    console.log('nihao');
  }

  const goHealthData = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'HealthDataShow',
        passProps: {
        }
      }
    })
  }

  const storageJSON = () => {
    let fatMessage = fatAddorDec + fat.toString() + '克脂肪';
    let time = new Date();
    let obj = {};
    let timeFlag = time.getFullYear() + '年';
    timeFlag += (time.getMonth() + 1) + '月';
    timeFlag += time.getDate() + '日';
    timeFlag += time.getHours() + '时';
    timeFlag += time.getMinutes() + '分';
    timeFlag += time.getSeconds() + '秒';
    obj['time'] = timeFlag;
    obj['detail'] = fatMessage;
    return obj;
  }

  const storageSave = () => {
    let res = storageJSON();
    let resJSON = JSON.stringify(res);
    healthData.push(resJSON);
    storage.save({
      key: 'healthData',
      data: healthData,
    }).catch((err) => {
      console.log(err);
    })
    Alert.alert('保存成功！')
  }

  const clearKeyAll = () => {
    storage.remove({ key: 'healthData' }).catch(err => { console.log(err); });
    healthData = [];
  }

  const createTwoButtonAlert = () => {
    Alert.alert(
      "确认",
      "确定删除所有健康数据",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "确认", onPress: () => clearKeyAll() }
      ]
    );
  }

  // 读取数据
  const storageGet = () => {
    storage.load({
      key: 'healthData',
    }).then(res => {

      console.log(res);
    }).catch((err) => {
      // console.log(err);
    })
  }

  // 计算
  const calc = (weight, valueA, valueB) => {
    let numWeight = Number(weight);
    let numValueA = Number(valueA);
    let numValueB = Number(valueB);

    let res = 0;
    res = numValueA - (numWeight * 24 * 0.95) * (1 + 0.45) - numValueB;
    console.log(res);
    let fatRes = 0;

    fatRes = Math.floor(res / 37);
    fat = - fatRes;

    if (fat < 0) {
      fat = -fat;
      fatAddorDec = '增加';
    }
    setValueB('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.textArea}>您的体重/千克</Text>
        <TextInput
          keyboardType='numeric'
          style={styles.TextInput}
          onChangeText={text => setWeight(text)}
          value={weight}
          autoFocus={true}
          multiline={true}
        />
        <Text style={styles.textArea}>今日摄入热量/千焦</Text>
        <TextInput
          keyboardType='numeric'
          style={styles.TextInput}
          onChangeText={text => setValueA(text)}
          value={valueA}
          autoFocus={false}
          multiline={true}
        />
        <Text style={styles.textArea}>运动消耗热量/千焦</Text>
        <TextInput
          keyboardType='numeric'
          style={styles.TextInput}
          onChangeText={text => setValueB(text)}
          value={valueB}
          autoFocus={false}
          multiline={true}
        />

        <View>
          <Text style={styles.congraText}>恭喜你</Text>
          <Text style={styles.textAreaLine}>
            今天大约 <Text style={styles.textAreaNum}>{fatAddorDec}</Text> 脂肪 <Text style={styles.textAreaNum}>{fat}</Text> 克</Text>
        </View>

        <View style={styles.buttonWrap}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='gray'
            activeOpacity={0.8}
            onPress={() => calc(weight, valueA, valueB)}>
            <View>
              <Text>计算</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            underlayColor='gray'
            activeOpacity={0.8}
            onPress={() => storageSave()}>
            <View>
              <Text>保存</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonWrap1}>
          <TouchableHighlight
            style={styles.button1}
            underlayColor='gray'
            activeOpacity={0.8}
            onPress={() => goHealthData()}>
            <View>
              <Text>查看历史记录</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button1}
            underlayColor='gray'
            activeOpacity={0.8}
            onPress={() => createTwoButtonAlert()}>
            <View>
              <Text>清除历史记录</Text>
            </View>
          </TouchableHighlight>
        </View>


        <View>
          <Button
            title="点此查看食物热量大全表"
            style={styles.button}
            onPress={() => { Linking.openURL('https://zhuanlan.zhihu.com/p/88410529') }}>
          </Button>
        </View>
        <Text style={styles.textAreaButton}>计算方法：热量缺口 = 摄入热量 - 静息代谢- 食物热效应 - 行为代谢
        </Text>
      </ScrollView>
    </SafeAreaView>

  )
}

export default BeiHealth
export {
  deleteHealthData
}

BeiHealth.options = {
  topBar: {
    title: {
      text: '每日热量计算'
    },
    visible: true
  },
  status: {
    visible: false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#E5E5E5",
    // backgroundColor: "#F2F2F2",
  },
  textArea: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
  },
  textAreaButton: {
    marginLeft: 10,
    marginTop: 2,
    marginBottom: 10,
    fontSize: 12,
  },
  textAreaLine: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  textAreaNum: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
    color: 'orange'
  },
  congraText: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
  },
  TextInput: {
    marginTop: 10,
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingVertical: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: '#efeff1'
  },
  buttonWrap: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrap1: {
    flex: 1,
    marginTop: 100,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 20,
  },
  button1: {
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 15,
  }
})