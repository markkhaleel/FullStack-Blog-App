import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const profileImage = 'https://res.cloudinary.com/dhi4lq2xs/image/upload/v1675534856/Profile%20Pictures/ibp7lpnvrhlzwwyjwafa.jpg'
const ProfileInfo = ({ data }) => {

    const [showModal, setShowModal] = useState(false)
    const nav = useNavigation();

    return (
        <>
            <View style={styles.container}>
                <Pressable onPress={() => { nav.navigate('ANOTHERPROFILE') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={styles.profileImage} source={{ uri: data.profilePicture }} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{data.fullname}</Text>
                            <Text style={styles.location}>@{data.username}</Text>
                        </View>
                    </View>
                </Pressable>
                <Ionicons name="ellipsis-vertical" size={24} color="white" onPress={() => setShowModal(true)} />
            </View>
            <Modal transparent visible={showModal} onRequestClose={() => setShowModal(false)} animationType='fade'>
                <Pressable style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onPress={() => setShowModal(false)}>
                    <View style={{ backgroundColor: 'white', borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingBottom: 5 }} >
                        <Pressable style={({ pressed }) => {
                            return {
                                paddingVertical: 10,
                                backgroundColor: pressed ? '#ccc' : 'white'
                            }
                        }}
                            onPress={() => { console.log('option one') }}>
                            <Text style={styles.text}>Option One</Text>
                        </Pressable>
                        <Pressable style={({ pressed }) => {
                            return {
                                paddingVertical: 10,
                                backgroundColor: pressed ? '#ccc' : 'white'
                            }
                        }} onPress={() => { console.log('option two') }}>
                            <Text style={styles.text}>Option Two</Text>
                        </Pressable>
                        <Pressable style={({ pressed }) => {
                            return {
                                paddingVertical: 10,
                                backgroundColor: pressed ? '#ccc' : 'white'
                            }
                        }} onPress={() => { console.log('option three') }}>
                            <Text style={styles.text}>Option Three</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal >
        </>
    )
}

export default ProfileInfo

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor: 'black',
        paddingTop: 9,
        paddingBottom: 7,
        paddingHorizontal: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    info: {
        marginLeft: 8
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white'

    },
    location: {
        fontSize: 12,
        color: 'white'

    },
    text: {
        paddingHorizontal: 8,
        fontSize: 20
    },

})