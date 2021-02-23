import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';

const BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: 20,
  },
});

const AppStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={[styles.statusBar, backgroundColor]}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default AppStatusBar;
