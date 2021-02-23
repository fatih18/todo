import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  textInput: {
    height: 20,
    backgroundColor: 'white',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
});

const leftIcon = (name, size, color) => {
  return <TextInput.Icon name={name} size={size} color={color} />;
};

const FormInput = (props) => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        mode="flat"
        left={<TextInput.Icon name="form-textarea" size={16} color="tomato" />}
        style={[styles.textInput, hasError && styles.errorInput]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]} </Text>}
    </>
  );
};

export default FormInput;
