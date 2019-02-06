import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import NavBar, { NavTitle, NavButton } from 'react-native-nav';
import { Button, Card, Title, Paragraph, Divider } from 'react-native-paper';

export default function ChatNavBarCustom(screenProps) {
  const { movieInfo } = screenProps;
  return (
    <NavBar>
      <NavTitle>
      <View style={{ flex: 1, margin: 10 }}>
      <LinearGradient colors={[('ff0100', 'cc0d0c', 0, 0)]} style={{}} />
      <Text style={styles.screenHeader}> MOVIE HISTORY</Text>
          <Divider />
        {/* <Text style={{ fontSize: 10, color: '#aaa' }}>💬 MoviePal</Text> {'\n'}
        <Text style={{ fontSize: 12 }}>{`Watching "${movieInfo.title}" `}</Text>
        <Text style={{ fontSize: 12 }}>{` @ ${movieInfo.theater}`}</Text>
        <Text style={{ fontSize: 12 }}>{`, ${movieInfo.movieTime} `}</Text> */}
      </View>
      </NavTitle>
    </NavBar>
  );
}

const styles = StyleSheet.create({
  screenHeader: {
    fontSize: 34,

    letterSpacing: 5,
    color: '#aa1919',
    alignSelf: 'center',
  }
})