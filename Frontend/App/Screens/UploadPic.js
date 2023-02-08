import React, { useState } from 'react';
import { Image, View, StyleSheet, Pressable, Text, Dimensions, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import { localhost } from '../../Public/Variables';
import axios from 'axios';

export default function ProfilePicture({ navigation, route }) {

    const userInfo = route.params;

    const [imageResult, setImageResult] = useState(null);
    const [loading, setLoading] = useState(false)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setImageResult(result.assets[0]);
        }
        // console.log(result)
    };

    const createFormData = () => {
        const data = new FormData();
        data.append('photo', {
            name: `${userInfo.username}.${imageResult.uri.split('.').pop()}`,
            type: `image/${imageResult.uri.split('.').pop()}`,
            uri: imageResult.uri
        });
        data.append('username', userInfo.username)
        return data;
    };

    const handeSubmit = () => {
        if (imageResult) {
            setLoading(true);
            console.log("Clicked")
            console.log(createFormData())
            axios.post(`http://${localhost}:3000/upload-pp`, createFormData())
                .then((response) => {
                    console.log('response', response.data.message);
                    setLoading(false)
                    navigation.navigate("LOGIN");
                })
                .catch((error) => {
                    console.error('error', error);
                    setLoading(false)
                });
        } else {
            return null
        }
    }

    return (
        <>
            {loading ?
                <View style={styles.activityIndicator} >
                    <ActivityIndicator size={100} color={'#0096FF'} />
                </View> :
                <View style={styles.container}>
                    <Text style={styles.text}>Upload a Profile Photo</Text>
                    {/* <Text style={styles.fullname}>{userInfo.fullname}</Text> */}
                    <Pressable onPress={pickImage}>
                        {imageResult ?
                            <View style={{ alignItems: 'center', marginTop: 80 }}>
                                <Image source={{ uri: imageResult.uri }} style={styles.img1} />
                                <Text style={{ color: 'white', fontSize: 20, opacity: 0.5, marginTop: 20 }}>Photo uploaded Succefully</Text>
                            </View> :
                            <View style={styles.photo}>
                                <Text style={{ color: 'grey', fontSize: 22, fontWeight: 'bold' }}>No Photo</Text>
                                <FontAwesome5 style={styles.btn} name="images" size={22} color="white" />
                            </View>
                        }
                    </Pressable>

                    <Pressable style={[styles.submit, { backgroundColor: imageResult ? '#0096FF' : '#1F4979' }]} onPress={handeSubmit}>
                        <Text style={[styles.submitText, { opacity: imageResult ? 1 : 0.5 }]}>Submit</Text>
                    </Pressable>
                </View>
            }
        </>
    )
}

const wid = Dimensions.get('screen').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'black',
    },
    img1: {
        width: 280,
        height: 280,
        borderRadius: 140
    },
    btn: {
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: 15,
        borderRadius: 40,
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    text: {
        color: 'white',
        fontSize: 30,
        marginTop: 50,
    },
    photo: {
        borderWidth: 2,
        borderColor: 'grey',
        borderStyle: 'dashed',
        padding: 60,
        borderRadius: 380,
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80
    },
    submit: {
        width: wid - 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 200
    },
    submitText: {
        color: 'white',
        padding: 10,
        fontSize: 20
    },
    fullname: {
        color: "white",
        fontSize: 25,
        marginTop: 60
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})