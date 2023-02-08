import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppName } from '../../Public/Variables';

const Header = () => {

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <MaterialCommunityIcons name="music-note-eighth-dotted" size={28} color="yellow" />
                <Text style={styles.logoText}>{AppName}</Text>
            </View>
            <View>
                <AntDesign name='message1' size={24} color='white' />
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    logoText: {
        fontSize: 30,
        color: 'white',
        // fontFamily: 'Handlee-Regular',
        paddingLeft: 5
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})