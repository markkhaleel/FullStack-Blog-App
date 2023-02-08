import { ActivityIndicator, Alert, Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { localhost } from '../../Public/Variables';

const AddPost = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageResult, setImageResult] = useState([]);
    const [loading, setLoading] = useState(false)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            // allowsMultipleSelection: true
        });
        if (!result.canceled) {
            // const images = result.assets[0]
            setImageResult(result.assets);
        }
        console.log(result.assets[0])
    };

    const Item = ({ uri, id }) => (
        <Pressable onPress={() => remove(id)} >
            <Image id={id} source={{ uri: uri }}
                style={{ height: 100, width: 100, resizeMode: 'contain', marginRight: 5 }}
            />
        </Pressable>
    );

    const remove = (id) => {
        const objWithIdIndex = imageResult.findIndex((obj) => obj.id === id);
        console.log("hello")
        if (objWithIdIndex > -1) {
            setImageResult(imageResult.splice(objWithIdIndex, 1));
            console.log("hello")
        }
    }

    const createFormData = () => {
        const data = new FormData();
        data.append('photo', {
            name: `${imageResult[0].assetId}.${imageResult[0].uri.split('.').pop()}`,
            type: `image/${imageResult[0].uri.split('.').pop()}`,
            uri: imageResult[0].uri
        });
        data.append('username', "MarkBotros")
        data.append('title', title)
        data.append('description', description)
        return data;
    };

    const handleAddPost = () => {
        if (imageResult[0].uri) {
            setLoading(true);
            console.log("Clicked")
            axios.post(`http://${localhost}:3000/posts`, createFormData())
                .then((response) => {
                    console.log('response', response.data.message);
                    setLoading(false)
                    Alert.alert('', "Post Successfully Added", [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                    setDescription('');
                    setTitle('')
                    setImageResult([])
                })
                .catch((error) => {
                    console.error('error', error.data);
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
                    <Text style={styles.header}>New post</Text>

                    <Text style={styles.title}>Add an Image</Text>

                    <View style={{ height: 100, justifyContent: 'center', alignItems: 'flex-start', marginTop: 10, width: wid }}>

                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.ImagePicker}
                        >

                            <Pressable style={styles.photo} onPress={pickImage}>
                                <Text style={{ color: 'grey', fontSize: 15, fontWeight: 'bold' }}>Add Photo</Text>
                                <FontAwesome5 style={styles.btn} name="images" size={15} color="white" />
                            </Pressable>
                            {/* <FlatList horizontal data={imageResult} renderItem={({ item }) => <Item uri={item.uri} />} /> */}
                            {imageResult.map(({ assetId, uri }) => (<Item id={assetId} uri={uri} />))}

                        </ScrollView>

                    </View>

                    <Text style={styles.title}>Title</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Add a post title..."
                        value={title}
                        onChangeText={setTitle}
                        placeholderTextColor="#979797"

                    />

                    <Text style={styles.title}>Description</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="write a post description..."
                        value={description}
                        onChangeText={setDescription}
                        placeholderTextColor="#979797"
                        multiline
                    />

                    <Pressable
                        style={[styles.btn, { backgroundColor: (title && description && imageResult) ? '#0096FF' : '#1F4979' }]}
                        onPress={handleAddPost} >
                        <Text style={[styles.btnText, { opacity: (title && description && imageResult) ? 1 : 0.6 }]}>Submit</Text>
                    </Pressable>

                </View >}
        </>
    )
}

export default AddPost

const wid = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    header: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
        fontSize: 17,
        width: wid - 40,
        marginTop: 10
    },
    input: {
        backgroundColor: '#363636',
        borderRadius: 8,
        width: wid - 40,
        fontSize: 15,
        padding: 6,
        marginTop: 5,
        color: 'white',
        textAlignVertical: 'top',
        fontSize: 17,
        marginTop: 10
    },
    photo: {
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'dashed',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 20
    },
    ImagePicker: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    btn: {
        width: wid - 60,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 35
    },
    btnText: {
        color: 'white',
        fontSize: 18,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})