import React from 'react';
import { Text, View } from 'react-native';
import NavBar, { NavTitle, NavButton } from 'react-native-nav';


export default function ChatNavBarCustom(screenProps) {
  console.log('Navbar props >>>>', screenProps)
  const { movieInfo } = screenProps
  return (
    <NavBar>
      <NavButton />
      <NavTitle>
        <Text style={{ fontSize: 10, color: '#aaa' }}>💬 MoviePal</Text> {'\n'}
        <Text style={{ fontSize: 12 }}>{`Watching "${movieInfo.movie}" `}</Text>
        <Text style={{ fontSize: 12 }}>{` @ ${movieInfo.theater}`}</Text>
        <Text style={{ fontSize: 12 }}>{`, ${movieInfo.selectedTime} `}</Text>
      </NavTitle>
      <NavButton />
    </NavBar>
  );
}