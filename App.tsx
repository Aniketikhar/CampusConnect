import React, {useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  useColorScheme,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';

function App(): React.JSX.Element {
  const theme = useColorScheme();
  const webviewRef = useRef<any>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [exitApp, setExitApp] = useState(false);

  // useEffect(() => {
  //   const onBackPress = () => {
  //     if (canGoBack && webviewRef.current) {
  //       webviewRef.current.goBack();
  //       return true;
  //     } else {
  //       ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
  //       return true;
  //     }
  //   };

  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //   return () => backHandler.remove();
  // }, [canGoBack]);

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      } else {
        if (exitApp) {
          BackHandler.exitApp();
        } else {
          setExitApp(true);
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
          setTimeout(() => setExitApp(false), 2000);
          return true;
        }
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => backHandler.remove();
  }, [canGoBack, exitApp]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? '#000000' : '#ffffff'}
      />
      <WebView
        ref={webviewRef}
        source={{ uri: 'https://my.campusconnecthub.com' }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007bff" />
          </View>
        )}
        cacheEnabled={true}
        cacheMode="LOAD_DEFAULT"
        originWhitelist={['*']}
        scrollEnabled={true}
        allowsInlineMediaPlayback={true}
        setSupportMultipleWindows={false}
        pullToRefreshEnabled={Platform.OS === 'android'}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff', // White background during loading
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
