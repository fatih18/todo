import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
});

const SceneHeader = ({name, ...props}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <View style={[styles.container, {backgroundColor: theme.colors.surface}]} {...props}>
        <Icon.Button
          name="menu"
          size={32}
          backgroundColor="#ffcccb"
          onPress={() => navigation.toggleDrawer()}
        />
        <Title>{name}</Title>
      </View>
    </>
  );
};

export default SceneHeader;
