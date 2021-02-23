import React from 'react';
import {StyleSheet, View} from 'react-native';

const Separator = () => (
  <View style={styles.container}>
    <View style={styles.separatorOffset} />
    <View style={styles.separator} />
  </View>
);

export default Separator;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    borderColor: '#EDEDED',
    borderWidth: 0.8,
    flex: 8,
    flexDirection: 'row',
  },
});
