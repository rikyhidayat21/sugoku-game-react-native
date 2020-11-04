import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Home({ navigation }) {

  const [name, setName] = useState('')

  const goToGame = (value) => {
    navigation.navigate('Game', {
      nickname: name,
      level: value
    })
  }
  

  return (
    <>
      <Text style={{
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: '#007AFF',
        padding: 10,
        color: '#fff',
        fontWeight: 'bold'
      }}> ARE YOU READY TO PLAY SUGOKU ?
      </Text>

      <View style={styles.container}>
        <Text>Please enter your nickname: </Text>
        <TextInput
          style={{
              borderWidth: 2,
              width: 200,
              borderRadius: 5,
              textAlign: 'center',
          }}
          placeholder="input your nickname"
          onChangeText={(text) => setName(text)}
          
        />

        <View style={{marginTop: 4}} >
          <Text>SELECT DIFICULTY: </Text>
          <View style={{ marginTop: 5 }}>
              <Button 
                  color='#007AFF'
                  disabled={!name}
                  title="EASY"
                  onPress={() => goToGame('easy')}
              />
          </View>
          <View style={{ marginTop: 5 }}>
              <Button 
                  color='#007AFF'
                  disabled={!name}
                  title="MEDIUM"
                  onPress={() => goToGame('medium')}
              />
          </View>
          <View style={{ marginTop: 5 }}>
              <Button 
                  color='#007AFF'
                  disabled={!name}
                  title="HARD"
                  onPress={() => goToGame('hard')}
              />
          </View>
        </View>

        <StatusBar style="auto" />
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 100,
    backgroundColor: '#dbe2ef',
  },
});
