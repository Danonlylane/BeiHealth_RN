import {
  StyleSheet, Text, View, TextInput, Image, TouchableHighlight, ScrollView, SafeAreaView,
  Alert
} from 'react-native'
import React, { useState } from 'react'
// import CameraRoll from "@react-native-community/cameraroll";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '../constants/storage'

import Icon from 'react-native-vector-icons/FontAwesome'


const options = {
  title: '请选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从相册选择',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

// let photosView ;
let photosView = [];
let photosUrl = [];
let sayData = [];


const deleteSayData = () => {
  sayData = [];
}

const BeiRun = () => {
  let [value, onChangeText] = useState('');

  // const [photo, setPhoto] = useState('');
  let [photo, setPhoto] = useState([]);

  // let [sayData, setSayData] = useState([]);


  const choosePic = () => {
    if (photosView.length >= 3) {
      Alert.alert('最多添加三张照片');
      return;
    }
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        Alert.alert('自定义按钮:' + response.customButton)
      } else {
        const source = { uri: response.assets[0].uri };
        const url = response.assets[0].uri;
        addPic(url);
        setPhoto(source);
      }
    });
  }


  // const addPic = (url) => {
  //   photosView = (
  //     <View style={styles.row}>
  //       <View style={styles.flex}>
  //         <Image style={styles.image} source={{ uri: url }} />
  //       </View>
  //     </View>
  //   )
  // }

  const addPic = (url) => {
    photosUrl.push(url);
    photosView.push(
      <View style={styles.row} key={url}>
        <View style={styles.flex}>
          <Image style={styles.image} source={{ uri: url }} />
        </View>
      </View>
    )
  }

  const deletePic = () => {
    // photosView = null;
    photosView = [];
    setPhoto('');
    Alert.alert('删除成功');
  }

  const deletePicAlert = () => {
    Alert.alert(
      "确认",
      "确定删除所有健康数据",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "确认", onPress: () => deletePic() }
      ]
    );
  }

  const storageJSON = () => {
    let sayMessage = value;
    let time = new Date();
    let obj = {};
    let timeFlag = time.getFullYear() + '年';
    timeFlag += (time.getMonth() + 1) + '月';
    timeFlag += time.getDate() + '日';
    timeFlag += time.getHours() + '时';
    timeFlag += time.getMinutes() + '分';
    timeFlag += time.getSeconds() + '秒';
    obj['time'] = timeFlag;
    obj['detail'] = sayMessage;
    obj['photos'] = photosUrl;
    return obj;
  }

  const storageSave = () => {
    let res = storageJSON();
    let resJSON = JSON.stringify(res);
    sayData.push(resJSON);
    storage.save({
      key: 'sayData',
      data: sayData,
    }).catch((err) => {
      console.log(err);
    })
    onChangeText('');
    photosView = [];
    photosUrl = [];
    Alert.alert('保存成功');
  }

  const clearKeyAll = () => {
    storage.remove({ key: 'sayData' }).catch(err => { console.log(err); });
  }

  const storageGet = () => {
    storage.load({
      key: 'sayData',
    }).then(res => {
      console.log(res);
    }).catch((err) => {
      // console.log(err);
    })
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.textArea}>想说点什么/分享想法……</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={text => onChangeText(text)}
          value={value}
          autoFocus={true}
          multiline={true}
        />

        <View style={styles.buttonWrap}>

          <View style={styles.picContainer}>
            {photosView}
          </View>

          <View style={styles.oneLine}>

            <TouchableHighlight
              style={styles.buttonChoosePlus}
              activeOpacity={0.8}
              onPress={() => choosePic()}>
              {/* <View>
              <Text>选取照片</Text>
            </View> */}
              <Icon name='plus' style={styles.iconPlus} size={20}></Icon>
            </TouchableHighlight>
          </View>

        </View>

        <View style={styles.buttonWrap1}>
          <TouchableHighlight
            style={styles.buttonDelete}
            underlayColor='green'
            activeOpacity={0.8}
            onPress={() => deletePicAlert()}>
            <View>
              <Text>删除照片</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonSave}
            underlayColor='green'
            activeOpacity={0.8}
            onPress={() => storageSave()}>
            <View>
              <Text>保存</Text>
            </View>
          </TouchableHighlight>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default BeiRun

export {
  deleteSayData
}

BeiRun.options = {
  topBar: {
    title: {
      text: '分享'
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
    // backgroundColor: "#F2F2F2",
  },
  scrollContainer: {
    flex: 1,
  },
  picContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },

  image: {
    height: 120,
    width: 120,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  textArea: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
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
    justifyContent: 'flex-start',
    // justifyContent: 'flex-end',

    alignItems: 'center',
  },
  buttonWrap1: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonSave: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 20,
  },
  oneLine: {
    alignItems: 'center',
  },
  buttonChoosePlus: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    width: 80,
    height: 80,
  },
  iconPlus: {

  },
  buttonChoose: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 34,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonDelete: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 34,
    borderRadius: 25,
    marginTop: 20,
  }
})