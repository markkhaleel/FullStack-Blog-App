import { ActivityIndicator, Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Feather, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { localhost } from '../../Public/Variables';
import { validateUsername } from '../Components/validation';

const VerifyOTP = ({ route, navigation }) => {

    const userInfo = route.params;

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false)

    const handleVerification = () => {
        if (otp < 6) {
            return null
        } else {
            setLoading(true)
            axios.post(`http://${localhost}:3000/verifyOTP`, { email: userInfo.email.toLowerCase(), otp })
                .then((response) => {
                    if (response.status == 200) {
                        navigation.navigate("UPLOADPICTURE", userInfo)
                        Alert.alert('', "Successfully Registered", [
                            { text: 'OK', onPress: () => console.log('OK Pressed') }
                        ]);
                    } else if (response.status == 203) {
                        Alert.alert('Input Error', response.data.message, [
                            { text: 'OK', onPress: () => console.log('OK Pressed') }
                        ]);
                    }
                    setLoading(false)
                })
                .catch((err) => {
                    console.error(err.response.data)
                    setLoading(false)
                })
        }
    }

    const handleSendAgein = () => {
    }

    return (
        <>
            {
                loading ?
                    <View style={styles.activityIndicator} >
                        <ActivityIndicator size={100} color={'#0096FF'} />
                    </View > :

                    <View style={styles.container}>
                        <Feather style={styles.logo} name="lock" size={100} color="white" />
                        <Text style={styles.title}>OTP Verification </Text>
                        <Text style={styles.name}>Hello {userInfo.fullname}, </Text>
                        <Text style={styles.text}>Thanks for registering. please type the OTP as shared on your email:</Text>
                        <Text style={styles.email}>{userInfo.email}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="OTP"
                            value={otp}
                            onChangeText={setOtp}
                            placeholderTextColor="#979797"
                            keyboardType='number-pad'
                            maxLength={6}
                        />

                        <Pressable style={styles.resetOTPContainer} onPress={handleSendAgein}>
                            <Text style={styles.resetOTP}>OTP not recieved?</Text>
                            <Text style={styles.reset}> Resend</Text>
                        </Pressable>

                        <AntDesign style={{ marginTop: 35 }}
                            name="checkcircle" size={45}
                            color={otp.length < 6 ? '#1F4979' : '#0096FF'}
                            onPress={handleVerification}
                        />



                    </View>
            }
        </>
    )
}

export default VerifyOTP

const wid = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 110
    },
    logo: {
        marginBottom: 25
    },
    title: {
        fontSize: 35,
        color: 'white'
    },
    name: {
        fontSize: 25,
        color: 'white',
        marginTop: 8,
        marginBottom: 5
    },
    text: {
        fontSize: 18,
        color: 'white',
        paddingHorizontal: 30
    },
    email: {
        color: '#0096FF',
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        backgroundColor: '#363636',
        borderRadius: 8,
        width: wid - 60,
        height: 60,
        fontSize: 35,
        padding: 5,
        marginTop: 10,
        color: 'white',
        textAlign: 'center',
        letterSpacing: 6
    },
    resetOTP: {
        color: 'white',
        opacity: 0.6
    },
    resetOTPContainer: {
        flexDirection: 'row',
        width: wid,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    reset: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})
