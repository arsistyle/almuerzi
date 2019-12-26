import React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Alert,
  AsyncStorage
} from 'react-native';
import useForm from '../hooks/useForm';

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    alignSelf: 'stretch',
    marginBottom: 10,
  },
});

export default ({ navigation }) => {
  const initialState = {
    email: '',
    password: '',
  };
  const onSubmit = values => {
    fetch('https://serverless.arsistyle.now.sh/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(x => x.text())
      .then(x => {
        if (typeof x === 'string') {
          try {
            return JSON.parse(x)
          } catch {
            throw x
          }
        }
      }).then(x => {
        AsyncStorage.setItem('token', x.token)
        navigation.navigate('Meals')
      })
      .catch(e => Alert.alert('Error', e))
  };
  const { suscribe, inputs, handleSubmit } = useForm(
    initialState,
    onSubmit
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        autoCapitalize='none'
        value={inputs.email}
        style={styles.input}
        onChangeText={suscribe('email')}
        placeholder='Email'
      />
      <TextInput
        autoCapitalize='none'
        value={inputs.password}
        onChangeText={suscribe('password')}
        style={styles.input}
        placeholder='Password'
        textContentType={'password'}
        secureTextEntry={true}
      />
      <Button title='Iniciar sesión' onPress={handleSubmit} />
      <Button
        title='registrarse'
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};
