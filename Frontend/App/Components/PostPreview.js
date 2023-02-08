import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ProfileInfo from './ProfileInfo';

const post = [
    {
        id: '1',
        postImage: 'https://images.unsplash.com/photo-1624303262936-8a3fbb967446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80'
    },
    {
        id: '2',
        postImage: 'https://images.unsplash.com/photo-1414115880398-afebc3d95efc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        id: '3',
        postImage: 'https://images.unsplash.com/photo-1535462585845-f4c9f98d5a09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=682&q=80'
    },
    {
        id: '4',
        postImage: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'
    }

]

const PostPreview = () => {

    return (
        <>
            <ProfileInfo />
            <View style={{ paddingHorizontal: 7 }}>
                <Text style={styles.postText}>I have always believed that each man makes his own happiness and is responsible for his own problems. It is a simple philosophy.</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
                <Actions />
            </View>
        </>

    )
}

const Actions = () => {
    return (
        <View style={styles.reactionContainer}>
            <View style={{ flexDirection: 'row' }}>
                <AntDesign style={styles.reaction} name="hearto" size={24} color="white" />
                <AntDesign style={styles.reaction} name="message1" size={24} color="white" />
                <Feather style={styles.reaction} name="send" size={24} color="white" />
            </View>

            <View>
                <Feather style={styles.reaction} name="bookmark" size={24} color="white" />
            </View>
        </View>
    )
}

export default PostPreview

const wid = Dimensions.get('window').width

const styles = StyleSheet.create({
    img: {
        width: wid,
        height: wid,
    },
    reactionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 12,
        backgroundColor: 'black',
        paddingVertical: 12,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    reaction: {
        marginRight: 20
    },
    counter: {
        position: 'absolute',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 10,
        paddingHorizontal: 3,
        top: 25,
        right: 20
    },
    postText: {
        color: 'white',
        paddingHorizontal: 5
    }
})