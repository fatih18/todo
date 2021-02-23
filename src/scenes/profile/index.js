import React from 'react';

import contactData from './contact.json';

import Profile from './profile';

const ProfileScreen = () => <Profile {...contactData} />;

ProfileScreen.navigationOptions = () => ({
  header: null,
});

export default ProfileScreen;
