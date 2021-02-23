/* eslint-disable import/prefer-default-export */
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';

import IconS from 'react-native-vector-icons/SimpleLineIcons';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import {
  useTheme,
  Avatar,
  Caption,
  Title,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Button,
  Switch,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from '../contexts/auth';
import {toggleTheme} from '../redux/actions/theme';

const Content = (props) => {
  const {signOut} = React.useContext(AuthContext);

  const dispatch = useDispatch();
  const isThemeDark = useSelector((state) => state.themeReducer.mode) === 'dark';
  const loggedUser = useSelector((state) => state.userReducer.activeUser);

  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Title style={styles.userName}>Welcome {loggedUser.username}</Title>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => <Icon name="home-outline" color={color} size={size} />}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => <Icon name="account-outline" color={color} size={size} />}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerS} title="Preferences">
            <TouchableRipple
              onPress={() => {
                dispatch(toggleTheme());
              }}>
              <View style={styles.preference}>
                <Text>Change Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isThemeDark} />
                </View>
              </View>
            </TouchableRipple>

            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Change Language</Text>
                <View pointerEvents="none">
                  <Switch value={isThemeDark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.drawerSettings} title="Settings">
        <View>
          <Button
            labelStyle={styles.btnLbl}
            uppercase={false}
            mode="text"
            onPress={() => props.navigation.navigate('ChangePassword')}>
            Change Password
          </Button>
        </View>
      </Drawer.Section>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => <Icon name="exit-to-app" color={color} size={size} />}
          label="Exit"
          onPress={() => {
            signOut();
            console.log('logout');
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  userName: {top: 20, left: 20},
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 40,
  },
  bottomDrawerSection: {
    marginBottom: 20,

    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  drawerS: {marginTop: 20},
  drawerSettings: {marginBottom: 120},
  btnLbl: {
    left: -60,
  },
});
