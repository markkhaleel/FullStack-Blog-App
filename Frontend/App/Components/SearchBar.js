import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const SearchBar = ({ containerStyle, value, onChangeText, onClear }) => {

    return (
        <View style={[styles.container, { ...containerStyle }]}>
            <TextInput
                style={[styles.searchbar, { backgroundColor: 'white' }]}
                placeholder={'Search here...'}
                value={value}
                onChangeText={onChangeText}
            />
            {value ?
                <AntDesign
                    name='close'
                    size={20}
                    color={theme.primary}
                    onPress={onClear}
                    style={styles.closeBtn} /> : null}
        </View>
    )
}

export default SearchBar

const wid = Dimensions.get('window').width - 40

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchbar: {
        borderWidth: 1,
        borderRadius: 10,
        width: wid,
        height: 40,
        fontSize: 20,
        padding: 5,
        marginTop: 10
    },
    closeBtn: {
        position: 'absolute',
        right: 10,
        top: 20
    }
})