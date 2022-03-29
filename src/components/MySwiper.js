
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { Navigation } from 'react-native-navigation'
import { LoginRoot, MainRoot } from '../navigation'

const MySwiper = (props) => {
    const goLoginPage = () => {
        // console.log('gologin');
        Navigation.setRoot(LoginRoot)
    }
    let imgs = props.images;
    return (
        <View style={styles.SwiperWrapper}>
            <Swiper style={styles.wrapper} autoplay={true}>
                {
                    imgs.map((item) => {
                        return (
                            <View key={item.id} style={styles.swiperItem}>
                                <View >
                                    <Image style={styles.swiperImg} source={item.img} />
                                </View>
                                {
                                    item.id === 3 && (
                                        <TouchableHighlight
                                            style={styles.swiperImgButton}
                                            underlayColor='#F27600'
                                            activeOpacity={0.8}
                                            onPress={goLoginPage}>
                                            <View>
                                                <Text>立即体验</Text>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                }
                            </View>
                        )
                    })
                }
            </Swiper>
        </View>
    )
}

export default MySwiper

const styles = StyleSheet.create({
    SwiperWrapper: {
        flex: 1,
    },
    swiperItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swiperImg: {
        width: 200,
        height: 200,
    },
    swiperImgButton: {
        backgroundColor: 'lightgreen',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 25,
        marginTop: 50,
    }

})