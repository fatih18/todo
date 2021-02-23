import React, {useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';

const TextAnimation = ({viewStyle, textStyle, content, duration, theme}) => {
  const textArr = content.trim().split(' ');

  const animatedValues = [];

  textArr.forEach((_, i) => {
    animatedValues[i] = new Animated.Value(0);
  });

  useEffect(() => {
    animated();
  });

  const animated = (toValue = 1) => {
    const animations = textArr.map((_, i) => {
      return Animated.timing(animatedValues[i], {
        toValue,
        duration,
        useNativeDriver: true,
      });
    });
    Animated.stagger(
      duration / 10,

      toValue === 0 ? animations.reverse() : animations
    ).start(() => {
      setTimeout(() => animated(toValue === 0 ? 1 : 0), 1000);
    });
  };

  return (
    <Animated.View style={[viewStyle, styles.textWrapper]}>
      {textArr.map((v, i) => {
        return (
          <Animated.Text
            key={`${v}-${i}`}
            style={[
              textStyle,
              styles.textStyle,
              {color: theme.colors.onSurface},
              {
                opacity: animatedValues[i],
                transform: [
                  {
                    translateY: Animated.multiply(animatedValues[i], new Animated.Value(-2)),
                  },
                ],
              },
            ]}>
            {v}
            {`${i < textArr.length ? ' ' : ''}`}
          </Animated.Text>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {},
  container: {},
  textWrapper: {
    flexDirection: 'row',

    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default TextAnimation;
