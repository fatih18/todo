import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${hours} hours left`;
}

const Task = ({todoItem, onPress}) => {
  return (
    <View style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <View style={styles.square} />
        <View style={styles.col}>
          <Text style={styles.title}>{todoItem.title}</Text>
          {!!todoItem.dueDate && <Text style={styles.body}>{msToTime(todoItem.dueDate)}</Text>}
        </View>
      </View>
      <View style={styles.circular} />
    </View>
  );
};

const styles = StyleSheet.create({
  col: {flexGrow: 1, paddingHorizontal: 16},
  item: {
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 24,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  title: {
    fontSize: 21,
    fontWeight: '700',
  },
  body: {
    fontSize: 16,
  },
  circular: {
    marginRight: 12,
    width: 24,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
