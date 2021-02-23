import React from 'react';

import {Button, Subheading, Title} from 'react-native-paper';

import {View, StyleSheet} from 'react-native';

const EmptyView = ({content, information, actionTitle, action}) => {
  return (
    <View style={styles.container}>
      <Title style={styles.txtColor}>{content}</Title>
      <Subheading style={styles.subh}>{information}</Subheading>
      <Button mode="outlined" color="magenta" onPress={action}>
        {actionTitle}
      </Button>
    </View>
  );
};
export default EmptyView;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 0.1,
    marginHorizontal: 15,
    top: 40,
    borderRadius: 20,
    height: 200,
  },
  subh: {textAlign: 'center', marginHorizontal: 15, color: 'black'},
  txtColor: {color: 'black'},
});
