import React from 'react';
import { Text } from 'react-native';
import NavBar, { NavTitle, NavButton } from 'react-native-nav';


export default function NavBarCustom(screenProps) {
  console.log('Navbar props >>>>', screenProps.movie)
  return (
    <NavBar>
      <NavButton />
      <NavTitle>
        <Text style={{ fontSize: 10, color: '#aaa' }}>💬 MoviePal</Text> {'\n'}
        <Text>{screenProps.movie}</Text>
      </NavTitle>
      <NavButton />
    </NavBar>
  );
}