import React, {useState, useContext} from 'react';

import {useSelector} from 'react-redux';
import {View, TouchableOpacity, TextInput, Platform, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme, Snackbar, Text} from 'react-native-paper';

import {AuthContext} from '../contexts/auth';

const Login = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const registeredUsers = useSelector((state) => state.userReducer.users);

  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const theme = useTheme();

  const {login} = useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        isValidUser: false,
      });
    }
  };

  const loginHandle = () => {
    if (data.username.length === 0 || data.password.length === 0) {
      onToggleSnackBar();
      console.log('Username or password field cannot be empty.');
      return;
    }

    const checkUser = registeredUsers.find((item) => {
      return data.username === item.username && data.password === item.password;
    });
    if (!checkUser) {
      onToggleSnackBar();
      console.log('Username or password is incorrect.');
      return;
    }
    console.log('checkUser', checkUser);
    login(checkUser);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={[styles.footer(theme)]}>
        <Text style={styles.text_footer(theme)}>Username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={theme.colors.onBackground} size={20} />
          <TextInput
            placeholder="Your Username"
            placeholderTextColor="#666666"
            style={styles.textInput(theme)}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            // actual value passing to the func.
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={1000}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
          </Animatable.View>
        )}

        <Text style={[styles.text_footer(theme)]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color={theme.colors.onBackground} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={!!data.secureTextEntry}
            style={[styles.textInput(theme)]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={750}>
            <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}>
            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
              <Text style={[styles.textSign]}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={[styles.signIn, styles.signInT]}>
            <Text style={[styles.textSign]}>Register</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      <Snackbar
        style={styles.snackbar}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Check',
          onPress: () => {
            onDismissSnackBar();
          },
        }}>
        Please check your account information!
      </Snackbar>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: (theme) => ({
    flex: 3,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingHorizontal: 30,
    paddingVertical: 35,
  }),
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: (theme) => ({
    color: theme.colors.onBackground,
    fontSize: 18,
  }),
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: (theme) => ({
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: theme.colors.onBackground,
  }),
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signInT: {borderColor: '#009387', borderWidth: 1, marginTop: 15},
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  snackbar: {backgroundColor: 'tomato', top: 145, height: 60, marginHorizontal: -15},
});
