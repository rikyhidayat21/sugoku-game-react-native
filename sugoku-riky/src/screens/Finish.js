
import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Button
} from 'react-native'
import { useSelector } from 'react-redux';

export default function Finish({ navigation }) {
    const name = useSelector(state => state.boardReducer.leaderBoard)

    return (
      <>
        <ImageBackground style={{height: '100%', width: '100%'}} source={{
            uri: 'https://images.unsplash.com/photo-1526566661780-1a67ea3c863e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }}
          style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
          }}
        >
          {name.length ? 
          <View>
              <Text style={style.text}>LEADER BOARD: </Text>
              {name.map((name, i) => {
                  return <Text style={{ 
                    color: '#fff', 
                    justifyContent: 'center',
                    textAlign: 'center' 
                    }} key={i}>{name}</Text>
              })}
          </View> : <Text style={style.text}>
              NO ONE WIN THE GAME
          </Text> 
          }
        </ImageBackground>
        
        <Button 
          title="Home"
          onPress={() => navigation.navigate('Home') }
        />
      </>
    )
}

const style = StyleSheet.create({
    text: {
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold'
    }
})

