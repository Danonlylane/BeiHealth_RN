import { StyleSheet, Text, View, SafeAreaView, Linking } from 'react-native';
import React from 'react';

// 字体图标库
// 1. 安装的时候要先停止项目
// npm install --save react-native-vector-icons
// 2.链接 如果不行的话前面加上 npx
// react-native link react-native-vector-icons
import Icon from 'react-native-vector-icons/FontAwesome'

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.layer}>
          <Text style={styles.textred}>App</Text>
          <Text style={styles.textred}>App</Text>
          <Text style={styles.textred}>App</Text>
        </View>

        <View>
          <Text>图标用法</Text>
          <Icon name='home' />
        </View>

        <View>
          <Text style={styles.myButton}
            onPress={() => {
              Linking.openURL('https://danonlylane.github.io')
            }}
          >国安信</Text>
        </View>
      </SafeAreaView>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    color: 'white',
  },
  layer: {
    display: 'flex',
    height: 50,
  },
  textred: {
    color: 'red',
  },
  myButton: {
    backgroundColor: 'lightgreen',
    height: 50,
    width: 200,
    textAlign: 'center',
    lineHeight: 50,
    borderRadius: 25,

  }
})