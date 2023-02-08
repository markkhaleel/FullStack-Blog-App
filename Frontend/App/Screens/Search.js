import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '../Components/SearchBar'
const Search = () => {
  return (
    <View style={styles.container}>
      <SearchBar/>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'black'
  }
})