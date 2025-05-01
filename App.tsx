import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  useColorScheme,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview'; // ✅ Correct import

function App(): React.JSX.Element {
  const theme = useColorScheme();
  const webviewRef = useRef<any>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      } else {
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#000000' : '#ffffff'}
      />
      <WebView
        ref={webviewRef}
        source={{ uri: 'https://my.campusconnecthub.com' }}
        javaScriptEnabled
        domStorageEnabled
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});

export default App;
