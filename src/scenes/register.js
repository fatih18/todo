import React, {useState, useContext} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useTheme, Text, Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {setUserData} from '../redux/actions/user';
import {AuthContext} from '../contexts/auth';

const Register = ({
  reduxSavePerson,
  reduxSetId,
  reduxUser,
  reduxSaveAccount,
  reduxRegisteredUsers,
}) => {
  const navigation = useNavigation();

  const {register} = useContext(AuthContext);

  const theme = useTheme();

  const [data, setData] = useState({
    id: null,
    username: '',
    password: '',
    confirmPassword: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => {
    setVisible(false);
  };
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
  const handleRegisterSuccess = async () => {
    const uniq = `id${new Date().getTime()}`;

    reduxSaveAccount({
      id: uniq,
      username: data.username,
      password: data.password,
    });
    onToggleSnackBar();
    navigation.navigate('Login');
  };

  const registerHandle = (userName, password) => {
    if (userName.length === 0 || password.length === 0) {
      console.log('Username or password field cannot be empty.');
      return;
    }

    const checkUser = reduxRegisteredUsers.filter((item) => {
      return userName === item.username && password === item.password;
    });
    console.log('chek', checkUser);
    if (!checkUser) {
      console.log('Username or password is incorrect.');
      return;
    }
    reduxSaveAccount(checkUser);
  };

  console.log('USER', reduxUser);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer(theme)}>
        <ScrollView>
          <Text style={styles.text_footer(theme)}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholderTextColor="#666666"
              placeholder="Your Username"
              style={styles.textInput(theme)}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
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

          <Text style={[styles.text_footer(theme), styles.mt35]}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholderTextColor="#666666"
              placeholder="Your Password"
              secureTextEntry={!!data.secureTextEntry}
              style={styles.textInput(theme)}
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
            <Animatable.View animation="fadeInLeft" duration={1000}>
              <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
            </Animatable.View>
          )}

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>By signing up you agree to our</Text>
            <Text style={[styles.color_textPrivate, styles.fw]}> Terms of service</Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, styles.fw]}> Privacy policy</Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={[styles.signIn, styles.bgc]}
              onPress={() => handleRegisterSuccess(data.username, data.password)}>
              <LinearGradient colors={['#08d4c4', '#01ab9d']} style={[styles.signIn]}>
                <Text style={[styles.textSign]}>Register</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.signIn]}>
              <Text style={[styles.textSign]}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

const mapDispatchToProp = (dispatch) => {
  return {
    reduxSaveAccount: (user) => dispatch(setUserData(user)),
  };
};

const mapStateToProp = (state) => {
  return {
    reduxRegisteredUsers: state.userReducer.user,
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Register);

const styles = StyleSheet.create({
  bgc: {bottom: 10},
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: (theme) => ({
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  fw: {fontWeight: 'bold'},
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: (theme) => ({
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: theme.colors.onBackground,
  }),
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#009387',
    borderWidth: 1,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  mt35: {marginTop: 35},
});
