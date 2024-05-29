import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { newGlobal } from './js/inits/globals.init'

import { SplashScreen } from './js/screens/SplashScreen';
import { HomeScreen } from './js/screens/HomeScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Jua-Regular': require('./assets/Jua-Regular.ttf'),
  });
  const [navValue, setNavValue] = useState(0);

  const navValues = {
	HOME: 1
  }

  newGlobal({
	name: "nav",
	value: {
		navToHome: () => setNavValue(navValues.HOME),
	},
	type: "navcontroller"
  });	
  
  return (
    <View style={styles.container}>
      <StatusBar 
        animated={true}
        showHideTransition='fade'
        hidden={true}
      />
      <ScrollView style={{width: '100%'}} contentContainerStyle={{height: "100%"}}>
        {navValue === navValues.HOME ? <HomeScreen /> : <SplashScreen />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },
});

