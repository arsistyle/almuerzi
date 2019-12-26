import React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Alert,
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
    fetch(
      'https://serverless.arsistyle.now.sh/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
    )
      .then(x => x.text())
      .then(x => {
        if (x === 'Usuario creado con exito') {
          return Alert.alert('Éxito', x, [
            {
              text: 'Ir al inicio',
              onPress: () => navigation.navigate('Login'),
            },
          ]);
        }
        Alert.alert('Error', x);
      });
  };

  const { suscribe, inputs, handleSubmit } = useForm(
    initialState,
    onSubmit
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput
        value={inputs.email}
        style={styles.input}
        onChangeText={suscribe('email')}
        placeholder='Email'
        autoCapitalize='none'
      />
      <TextInput
        value={inputs.password}
        onChangeText={suscribe('password')}
        style={styles.input}
        placeholder='Password'
        textContentType={'password'}
        secureTextEntry={true}
        autoCapitalize='none'
      />
      <Button title='Enviar' onPress={handleSubmit} />
      <Button
        title='Volver'
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};
