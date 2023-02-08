import { ActivityIndicator, Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ValidateEmail } from '../Components/validation'
import axios from 'axios';
import { AppName, localhost } from '../../Public/Variables';
import { useUserInfo } from '../Components/userInfoProvider';


const Login = () => {

    // const { setUserInfo } = useUserInfo()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [validInput, setValidInput] = useState(false)



    const checkValidation = () => {
        if (ValidateEmail(email) && password.length >= 6) {
            setValidInput(true)
        } else {
            setValidInput(false)
        }
    }

    useEffect(() => {
        checkValidation();
    }, [email, password])

    const nav = useNavigation();

    const handleLogin = () => {
        if (validInput) {
            setLoading(true)
            axios.post(`http://${localhost}:3000/auth`, { email: email.toLowerCase(), password })
                .then((response) => {
                    if (response.status == 200) {
                        nav.navigate("HOMESCREENS")
                        // setUserInfo({email})
                    } else if (response.status == 401) {
                        Alert.alert('Input Error', response.data, [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ])
                    }
                    setLoading(false)
                }).catch((error) => {
                    console.log(error)
                    setLoading(false)
                    Alert.alert('Input Error', 'error', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ])
                })
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
                    <Text style={styles.Logo}>{AppName}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email address"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#979797"
                        keyboardType='email-address'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        placeholderTextColor="#979797"
                    />
                    <Text style={styles.forget}>Forgotten password?</Text>
                    <Pressable
                        style={[styles.btn, { backgroundColor: validInput ? '#0096FF' : '#1F4979' }]}
                        onPress={handleLogin}
                    >
                        <Text style={[styles.btnText, { opacity: validInput ? 1 : 0.6 }]}>Log in</Text>
                    </Pressable>

                    <Pressable style={styles.signupBtn} onPress={() => nav.navigate('REGISTER')}>
                        <Text style={styles.register}>Don't have an account? </Text>
                        <Text style={styles.signup}>Sign Up</Text>
                    </Pressable>
                </View >}
        </>
    )
}

export default Login

const wid = Dimensions.get('window').width - 60

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#363636',
        borderRadius: 8,
        width: wid,
        height: 40,
        fontSize: 15,
        padding: 5,
        marginTop: 10,
        color: 'white'
    },
    Logo: {
        color: 'white',
        fontSize: 45,
        marginBottom: 30
    },
    btn: {
        width: wid,
        height: 40,
        backgroundColor: '#0096FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 10
    },
    btnText: {
        color: 'white',
        fontSize: 15
    },
    forget: {
        fontSize: 14,
        color: '#0096FF',
        marginTop: 12,
        marginBottom: 18,
        left: 110
    },
    register: {
        color: 'white',
        opacity: 0.6
    },
    signupBtn: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        borderTopWidth: 1,
        borderColor: 'grey',
        width: wid + 60,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    signup: {
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
