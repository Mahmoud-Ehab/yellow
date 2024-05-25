import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SplashScreen } from './js/screens/SplashScreen';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Jua-Regular': require('./assets/Jua-Regular.ttf'),
  });

  return (
    <View style={styles.container}>
      <StatusBar 
        animated={true}
        showHideTransition='fade'
        hidden={true}
      />
      <ScrollView style={{width: '100%'}} contentContainerStyle={{height: "100%"}}>
        <SplashScreen />
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

