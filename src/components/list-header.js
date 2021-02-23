import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Caption, Badge, useTheme} from 'react-native-paper';

const ListHeader = ({header, subHeader, count, ...props}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Title>{header}</Title>
        {!!count && (
          <Badge size={32} style={styles.badge(theme)}>
            {count}
          </Badge>
        )}
      </View>
      <Caption>{subHeader}</Caption>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  badge: (theme) => ({
    backgroundColor: theme.colors.onBackground,
    borderRadius: 8,
    right: 20,
    opacity: 0.7,
  }),
  inner: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
});
