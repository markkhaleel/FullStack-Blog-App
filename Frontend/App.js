import { StyleSheet, View } from 'react-native';
import Home from './App/Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './App/Screens/Profile';
import { AntDesign, Octicons } from '@expo/vector-icons';
import Search from './App/Screens/Search';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './App/Screens/Login';
import Register from './App/Screens/Register';
import { UserInfoProvider } from './App/Components/userInfoProvider';
import VerifyOTP from './App/Screens/VerifyOTP';
import AddPost from './App/Screens/AddPost';
import ProfilePicture from './App/Screens/UploadPic';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: 'black' }, headerShown: false, tabBarShowLabel: false }} initialRouteName='HOME' >
      <Tab.Screen options={{ tabBarIcon: ({ size, color }) => <AntDesign name="home" size={size} color={color} /> }} name='HOME' component={Home} />
      <Tab.Screen options={{ tabBarIcon: ({ size, color }) => <Octicons name="diff-added" size={size} color={color} /> }} name='ADDPOST' component={AddPost} />
      <Tab.Screen options={{ tabBarIcon: ({ size, color }) => <AntDesign name="search1" size={size} color={color} /> }} name='SEARCH' component={Search} />
      <Tab.Screen options={{ tabBarIcon: ({ size, color }) => <AntDesign name="user" size={size} color={color} /> }} name='PROFILE' component={Profile} />
    </Tab.Navigator>
  )
}

export default function App() {

  return (
    <>
    <UserInfoProvider>
      <View style={styles.container}>
        <NavigationContainer >

          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HOMESCREENS'>
            <Stack.Screen name='LOGIN' component={Login} />
            <Stack.Screen name='REGISTER' component={Register} />
            <Stack.Screen name='OTPSCREEN' component={VerifyOTP} />
            <Stack.Screen name='UPLOADPICTURE' component={ProfilePicture} />
            <Stack.Screen name='HOMESCREENS' component={HomeNavigation} />
          </Stack.Navigator>

        </NavigationContainer>
      </View>
    </UserInfoProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

}); 
