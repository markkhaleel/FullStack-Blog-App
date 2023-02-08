import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const stories = [
    { id: 1, uri: 'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80' },
    { id: 2, uri: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
    { id: 3, uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
    { id: 4, uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
    { id: 5, uri: 'https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
    { id: 6, uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
    { id: 7, uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80' },
    { id: 8, uri: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
]

const StoryList = () => {
    return (
        <ScrollView horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.container}>
            <View style={styles.storyContainer} >
                <View>
                    <ProfileHead uri={'https://res.cloudinary.com/dhi4lq2xs/image/upload/v1675534856/Profile%20Pictures/ibp7lpnvrhlzwwyjwafa.jpg'} />
                    <View style={styles.addBtn} >
                        <AntDesign name='plus' size={12} color='white' />
                    </View>
                </View>
                {stories.map(({ id, uri }) => (<ProfileHead key={id} uri={uri} />))}
                {/* <FlatList data={stories} renderItem={({ item }) => <ProfileHead uri={item.uri} />}
                    keyExtractor={(item) => item.id} horizontal /> */}

            </View>
        </ScrollView>
    )
}

const ProfileHead = ({ uri }) => {
    return (

        <View style={styles.storyProfile} >
            <Image
                style={styles.storyPicture}
                source={{
                    uri
                }} />
        </View>

    )
}

export default StoryList

const styles = StyleSheet.create({
    storyContainer: {
        flexDirection: 'row',
        paddingTop: 8,
        backgroundColor:'black',
        paddingBottom:8,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        paddingHorizontal: 7,
    },
    storyProfile: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        borderWidth: 2,
        borderColor: '#2764BF',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {

    },
    storyPicture: {
        width: '98%',
        height: '98%',
        borderRadius: 70 / 2,
    },
    addBtn: {
        position: 'absolute',
        backgroundColor: '#2764BF',
        borderRadius: 10,
        bottom: 10,
        right: 9,
        borderWidth: 1,
        padding: 1,
        borderColor: 'white',
    }

})