import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Text, Button, Subheading, Title} from 'react-native-paper';
import {AnimatedButton} from '../components';

const Stage1 = () => {
  return (
    <View style={styles.text}>
      <Subheading style={styles.subHeader}> Email Address</Subheading>
      <TextInput
        placeholderTextColor="gray"
        style={styles.input}
        placeholder="enter your e-mail address"
      />
    </View>
  );
};

const Stage2 = () => {
  return (
    <View style={styles.text}>
      <Subheading style={styles.subHeader}> Verify Code</Subheading>
      <TextInput
        placeholderTextColor="gray"
        style={styles.input}
        placeholder="enter verification code"
      />
    </View>
  );
};

const Stage3 = () => {
  return (
    <View style={styles.text}>
      <Subheading style={styles.subHeader}> New Password</Subheading>
      <TextInput
        placeholderTextColor="gray"
        style={styles.input}
        placeholder="enter new password"
      />
    </View>
  );
};

const ChangePassword = (props) => {
  const [stage, setStage] = useState(1);

  const handleProcess = () => {
    setStage(stage + 1);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reset Your Password</Text>
      {stage === 1 && <Stage1 />}
      {stage === 2 && <Stage2 />}
      {stage === 3 && <Stage3 />}

      {stage >= 4 ? (
        <Title>password changed success</Title>
      ) : (
        <View style={styles.top}>
          <AnimatedButton name="arrow-redo" size={24} onPress={() => handleProcess()} />
        </View>
      )}

      {stage >= 3 && (
        <Button color="orange" uppercase={false} onPress={() => setStage(1)}>
          start again
        </Button>
      )}

      <View style={styles.btnContainer}>
        <Button color="red" uppercase={false} onPress={() => props.navigation.goBack()}>
          go back
        </Button>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {bottom: 20},
  subHeader: {marginBottom: 20},
  top: {marginTop: 20},
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 40,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 200,
    textAlign: 'center',
  },
  text: {justifyContent: 'center', alignItems: 'center'},
  btnContainer: {top: 100},
});
