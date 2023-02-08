import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import StoryList from '../Components/StoryList'
import PostPreview from '../Components/PostPreview'
import { useUserInfo } from '../Components/userInfoProvider'
import axios from 'axios'
import { localhost } from '../../Public/Variables'

const Home = () => {

    const { userInfo, setUserInfo } = useUserInfo()
    const [loading, setLoading] = useState(false)
    const [postData, setPostData] = useState([])

    const handleStart = () => {
        setLoading(true);
        axios.get(`http://${localhost}:3000/posts/?userId=63e36b85351a1f97c5e37eb5`)
            .then((response) => {
                console.log(response.data);
                setPostData(response)
                console.log(postData)
                setLoading(false);

            })
            .catch((error) => {
                console.error('error', error.data);
                setLoading(false)
            });
    }

    useEffect(() => {
        handleStart();
    }, [])

    return (
        <>
            <StatusBar />
            {loading ?
                <View style={styles.activityIndicator} >
                    <ActivityIndicator size={100} color={'#0096FF'} />
                </View> :
                <View style={styles.container}>
                    <Header />

                    <ScrollView>
                        <StoryList />
                        {/* <PostPreview data={postData} /> */}
                    </ScrollView>
                </View>}
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})