import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

import { GetStartedScreen } from './js/screens/GetStartedScreen';
import { HomeScreen } from './js/screens/HomeScreen';
import { NAV_VALUES, screensNavigator } from './js/inits/screensNavigator.init';
import { NotificationsContainer } from './src/components/NotificationsContainer';
import { notifier } from './js/inits/notifier.init';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Jua-Regular': require('./assets/Jua-Regular.ttf'),
  });
  
  const [navValue, setNavValue] = useState(0);

  useEffect(() => {
    screensNavigator.setOnNav("onGetStarted", setNavValue);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar 
        animated={true}
        showHideTransition='fade'
        hidden={true}
      />
      <ScrollView style={{width: '100%'}} contentContainerStyle={{height: "100%"}}>
        {navValue === NAV_VALUES.HOME ? <HomeScreen /> : <GetStartedScreen />}
      </ScrollView>
      <NotificationsContainer notifier={notifier} />
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

