import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import PostPreview from '../Components/PostPreview'
import { AntDesign } from '@expo/vector-icons';



const Profile = () => {

  const profileImage = 'https://res.cloudinary.com/dhi4lq2xs/image/upload/v1675325586/Profile%20Pictures/e1oatgoyzsf4mzx8a6kb.jpg'
  return (
    <View style={styles.container}>
      <Text style={styles.username}>@username</Text>
      <AntDesign style={styles.editProfile} name="edit" size={25} color="white" />
      <ScrollView>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#18191B', paddingBottom: 10 }} >
          <View style={styles.header}>
            <Image style={styles.profileImage} source={{ uri: profileImage }} />

            <View style={styles.postContainer}>
              <Text style={styles.post}>15</Text>
              <Text style={[styles.post, { fontSize: 15 }]}>Posts</Text>
            </View>

            <View style={styles.followersContainer}>
              <Text style={styles.followers}>564</Text>
              <Text style={[styles.followers, { fontSize: 15 }]}>Followers</Text>
            </View>

            <View style={styles.followingContainer}>
              <Text style={[styles.edit, { opacity: 1 }]}>932</Text>
              <Text style={[styles.edit, { fontSize: 15 }]}>Following</Text>
            </View>

          </View>

          <View >
            <Text style={styles.name}>Mark Botros</Text>
            <Text style={styles.bio}>bio</Text>
          </View>

        </View>

        <View>
          <PostPreview />
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  username: {
    color: "yellow",
    fontSize: 23,
    opacity: 0.9,
    paddingLeft: 13,
    paddingVertical: 10
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems:'center'
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 30,
  },
  name: {
    color: "white",
    fontSize: 18,
    // fontFamily: 'Handlee-Regular',
    marginLeft: 20,
    marginTop: 5
  },
  bio: {
    color: "white",
    fontSize: 18,
    marginLeft: 20,
    opacity: 0.8
  },
  post: {
    color: 'white',
    fontSize: 22,
  },
  postContainer: {
    backgroundColor: 'black',
    borderRadius: 15,
    alignItems: 'center'
  },
  followers: {
    color: 'white',
    fontSize: 20,
  },
  followersContainer: {
    backgroundColor: 'black',
    borderRadius: 15,
    alignItems: 'center'
  },
  edit: {
    color: 'white',
    fontSize: 22,
  },
  followingContainer: {
    backgroundColor: 'black',
    borderRadius: 15,
    alignItems: 'center',
    paddingRight:10
  },
  editProfile: {
    position: 'absolute',
    right: 30,
    top: 10
  }

})