import React from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Button} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme, Text} from 'react-native-paper';

const colorsi = ['#08d4c4', '#01ab9d'];
const bg = '#009387';
const SplashScreen = ({navigation}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={bg} barStyle="light-content" />
      <View style={styles.header} onPress={() => console.log('adana')}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/todo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer(theme)} animation="fadeInUpBig">
        <Text style={[styles.title]}>Get your sheet together!</Text>
        <Text style={styles.text}>Sign in with account</Text>

        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <LinearGradient colors={colorsi} style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <Icon name="navigate-next" color="#fff" size={30} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: (theme) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  }),
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
