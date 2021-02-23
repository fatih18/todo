import React from 'react';
import {Card, Icon} from 'react-native-elements';
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTheme} from 'react-native-paper';

import Email from './email';
import Separator from './separator';
import Tel from './tel-number';

const info = {
  tels: [
    {id: 1, name: 'Mobile', number: '+90 (530)-334-17-09'},
    {id: 2, name: 'Home', number: '+90 (312)-282-18-62'},
  ],
  emails: [
    {id: 1, name: 'Work', email: 'fatih.akbayrak@ug.bilkent.edu.tr'},
    {id: 2, name: 'Personal', email: 'f.akbayrak93@gmail.com'},
  ],
};
const onPressPlace = () => {
  console.log('place');
};

const onPressTel = (number) => {
  Linking.openURL(`tel://${number}`).catch((err) => console.log('Error:', err));
};

const onPressSms = () => {
  console.log('sms pressed');
};

const onPressEmail = (email) => {
  Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch((err) =>
    console.log('Error:', err)
  );
};

const renderHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <ImageBackground
        style={styles.headerBackgroundImage}
        blurRadius={5}
        source={{uri: 'https://i.imgur.com/rXVcgTZ.jpg'}}>
        <View style={styles.headerColumn}>
          <Image style={styles.userImage} source={{uri: 'https://i.imgur.com/GfkNpVG.jpg'}} />
          <Text style={styles.userNameText}>Fatih Akbayrak</Text>

          <View style={styles.userAddressRow}>
            <View style={styles.userCityRow}>
              <Text style={styles.userCityText}>Mobile Application Developer</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const Profile = () => {
  const theme = useTheme();

  const renderEmail = () => {
    return (
      <FlatList
        contentContainerStyle={styles.emailContainer(theme)}
        data={info.emails}
        renderItem={(list) => {
          const {email, id, name} = list.item;

          return (
            <Email
              key={`email-${id}`}
              index={list.index}
              name={name}
              email={email}
              onPressEmail={onPressEmail}
            />
          );
        }}
      />
    );
  };

  const renderTel = () => {
    return (
      <FlatList
        contentContainerStyle={styles.telContainer(theme)}
        data={info.tels}
        renderItem={(list) => {
          const {id, name, number} = list.item;

          return (
            <Tel
              key={`tel-${id}`}
              index={list.index}
              name={name}
              number={number}
              onPressSms={onPressSms}
              onPressTel={onPressTel}
            />
          );
        }}
      />
    );
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          {renderHeader()}
          {renderTel()}
          {Separator()}
          {renderEmail()}
        </Card>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: (theme) => ({
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingTop: 30,
  }),
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: (theme) => ({
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingTop: 30,
  }),
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
    top: 5,
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    bottom: 10,
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
});
