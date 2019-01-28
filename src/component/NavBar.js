import React from 'react';
import { Text } from 'react-native';
import NavBar, { NavTitle, NavButton } from 'react-native-nav';


export default function NavBarCustom() {
  return (
    <NavBar>
      <NavButton />
      <NavTitle>
        <Text style={{ fontSize: 10, color: '#aaa' }}>💬 MoviePal</Text> {'\n'}
        Gifted Chat
      </NavTitle>
      <NavButton />
    </NavBar>
  );
}