import React from 'react';
import LottieView from 'lottie-react-native';

export default function SettingsScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return (
    <LottieView
      source={require('assets/lotties/17903-cool-leaves-animation.json')}
      autoPlay
      loop
    />
  )
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
