import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, Button, View, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const Main = () => {

    const[data, setData] = useState('activity')
    const[activityType, setActivityType] = useState('relaxation')

    getJsonData = () => {
        fetch('http://www.boredapi.com/api/activity?type='+ activityType, {method: 'GET'})
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            setData(responseJson)
        }
    ).catch((error) => {
        console.error(error)
    })
}

    useEffect(() => {
        getJsonData()
    }, [])

  return (
    <SafeAreaView>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>Things to do when bored</Text>
      <View style={styles.pickerWrapper}>
        <Picker
        selectedValue={activityType}
        onValueChange={(itemValue, itemIndex) =>{
            setActivityType(itemValue)
        }}>
            <Picker.Item label="Relaxation" value="relaxation" />
            <Picker.Item label="Social" value="social" />
            <Picker.Item label="Recreational" value="recreational" />
            <Picker.Item label="Education" value="education" />
            <Picker.Item label="Charity" value="charity" />
            <Picker.Item label="Music" value="music" />
            <Picker.Item label="DIY" value="diy" />
        </Picker>
      </View>
      <View style={styles.buttonWrapper}>
          <Button 
            title="Get Activity"
            onPress={() => getJsonData()}
          /> 
      </View>
      <View style={styles.resultWrapper}>
        <Text style={styles.activity}>{data['activity']}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        fontSize: 30,
        marginTop: Platform.OS === 'android' ? 70 : 30,
        fontWeight: 'bold',
        color: "navy",
        alignSelf: 'center',
    },
    pickerWrapper: {
        marginTop: Platform.OS === 'android' ? 30 : 0
    },
    buttonWrapper: {
        marginTop: Platform.OS === 'android' ? 50: 20
    },
    resultWrapper: {
        flexDirection: 'row',
        marginTop: Platform.OS === 'android' ? 100 : 60,
        backgroundColor: 'orange',
        borderRadius: 200,
        alignItems: 'center',
        height: 300,
        width: 300,
        alignSelf: 'center',
    },
    activity: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        margin: 20,
        textAlign: 'center'
    },
})

export default Main