import React, {useCallback, useRef} from 'react';
import {TouchableWithoutFeedback, Animated, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'magenta',
    bottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

const AnimatedButton = ({name, size, colors, onPress}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animatedScale = useCallback(
    (newValue) => {
      Animated.spring(scale, {
        toValue: newValue,
        friction: 4,
        useNativeDriver: true,
      }).start();
    },
    [scale]
  );

  return (
    <TouchableWithoutFeedback
      onPressIn={() => animatedScale(0.7)}
      delayPressIn={0}
      onPressOut={() => {
        animatedScale(1);
        onPress();
      }}
      delayPressOut={111}>
      <Animated.View style={[styles.container, {transform: [{scale}]}]}>
        <Icon name={name} size={size} color={colors} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedButton;
