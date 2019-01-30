import React from 'react';
import { Text, View } from 'react-native';
import NavBar, { NavTitle, NavButton } from 'react-native-nav';


export default function NavBarCustom(screenProps) {
  console.log('Navbar props >>>>', screenProps)
  const { movieInfo } = screenProps
  return (
    <NavBar>
      <NavButton />
      <NavTitle>
        <Text style={{ fontSize: 10, color: '#aaa' }}>💬 MoviePal</Text> {'\n'}
        <Text style={{ fontSize: 12 }}>{`Watching "${movieInfo.title}" `}</Text>
        <Text style={{ fontSize: 12 }}>{` @ ${movieInfo.theater}`}</Text>
        <Text style={{ fontSize: 12 }}>{`, ${movieInfo.selectedTime} `}</Text>
      </NavTitle>
      <NavButton />
    </NavBar>
  );
}