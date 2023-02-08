import { ActivityIndicator, Alert, Dimensions, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { validateUsername, ValidateEmail, validatePassword, ValidateFullname } from '../Components/validation'
import axios from 'axios'
import { AppName, localhost } from '../../Public/Variables'

const Register = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({ email: '', fullname: '', username: '', password: '' })
    const [validInput, setValidInput] = useState(false)

    const emailMsg = "• Enter a valid Email.\n"
    const fullnameMsg = "• Fullname should not contain any numbers or Special Character and each name should be more than 3 letters.\n"
    const usernameMsg = "• Username must be 5-15 characters and should only contain Alphanumeric Characters.\n"
    const passwordMsg = "• Password must be 8-20 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit and one special character.\n"

    const checkValidation = () => {
        if (ValidateEmail(userInfo.email) && ValidateFullname(userInfo.fullname) && validateUsername(userInfo.username) && validatePassword(userInfo.password)) {
            setValidInput(true)
        } else {
            setValidInput(false)
        }
    }

    useEffect(() => {
        checkValidation();
    }, [userInfo])

    const updateInfo = (key, value) => {
        setUserInfo(prevState => ({ ...prevState, [key]: value }))
    }



    const handleSignUp = async () => {
        if (!validInput) {
            return null
        } else {
            setLoading(true)
            setUserInfo({ ...userInfo, email: userInfo.email.toLowerCase() })
            console.log(userInfo)
            axios.post(`http://${localhost}:3000/register`, userInfo)
                .then((response) => {
                    if (response.status == 201) {
                        navigation.navigate("OTPSCREEN", userInfo)
                    } else if (response.status == 203) {
                        Alert.alert('Input Error', response.data.message, [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    }
                    setLoading(false)
                    console.log(response.data.message)
                })
                .catch((err) => {
                    console.error(err.response)
                    setLoading(false)

                })
        }
    }
    return (
        <>
            {loading ?
                <View style={styles.activityIndicator} >
                    <ActivityIndicator size={100} color={'#0096FF'} />
                </View> :

                <ScrollView style={styles.container}
                    contentContainerStyle={{ alignItems: 'center', height: height }}
                    keyboardDismissMode={true}>

                    <Text style={styles.Logo}>{AppName}</Text>
                    <Text style={styles.introText}>Sign up to see posts, photos annd videos from your friends.</Text>

                    <View style={styles.msgContainer}>
                        <Text style={styles.msg}>
                            {!ValidateEmail(userInfo.email) ? emailMsg : null}
                            {!ValidateFullname(userInfo.fullname) ? fullnameMsg : null}
                            {!validateUsername(userInfo.username) ? usernameMsg : null}
                            {!validatePassword(userInfo.password) ? passwordMsg : null}
                        </Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={userInfo.email}
                        onChangeText={(text) => updateInfo('email', text)}
                        placeholderTextColor="#979797"
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={userInfo.fullname}
                        onChangeText={(text) => updateInfo('fullname', text)}
                        placeholderTextColor="#979797"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={userInfo.username}
                        onChangeText={(text) => updateInfo('username', text)}
                        placeholderTextColor="#979797"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={userInfo.password}
                        onChangeText={(text) => updateInfo('password', text)}
                        secureTextEntry={true}
                        placeholderTextColor="#979797"
                        autoCapitalize='none'
                    />

                    <Pressable
                        style={[styles.btn, { backgroundColor: validInput ? '#0096FF' : '#1F4979' }]}
                        onPress={handleSignUp} >
                        <Text style={[styles.btnText, { opacity: validInput ? 1 : 0.6 }]}>Sign Up</Text>
                    </Pressable>

                    <Pressable style={styles.loginBtnContainer} onPress={() => navigation.navigate('LOGIN')}>
                        <Text style={styles.register}>Have an account?</Text>
                        <Text style={styles.login}>  Log in</Text>
                    </Pressable>

                </ScrollView>
            }
        </>
    )
}

export default Register

const wid = Dimensions.get('window').width
const height = Dimensions.get('screen').height

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'black',
    },
    Logo: {
        color: 'white',
        fontSize: 45,
        marginTop: 50,
    },
    introText: {
        fontSize: 20,
        color: 'white',
        paddingHorizontal: 30,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    msgContainer: {
        width: wid - 60,
        marginBottom: 15,
        height: 140
    },
    msg: {
        fontSize: 15,
        color: 'green',
    },
    input: {
        backgroundColor: '#363636',
        borderRadius: 8,
        width: wid - 60,
        height: 40,
        fontSize: 15,
        padding: 5,
        marginBottom: 15,
        color: 'white'
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
    register: {
        color: 'white',
        opacity: 0.6
    },
    loginBtnContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: 'grey',
        width: wid,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
    },
    login: {
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