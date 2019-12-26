import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Button,
  AsyncStorage,
} from 'react-native';
import useFetch from '../hooks/useFetch';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: StatusBar.currentHeight + 20,
  },
});

export default ({ navigation }) => {
  const id = navigation.getParam('_id');
  const { loading, data } = useFetch(
    `https://serverless.arsistyle.now.sh/api/meals/${id}`
  );

  return loading ? (
    <View style={styles.container}>
      <Text>Cargando...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>{data._id}</Text>
      <Text>{data.name}</Text>
      <Text>{data.desc}</Text>
      <Button
        title='Aceptar'
        onPress={() => {
          AsyncStorage.getItem('token').then(x => {
            if (x) {
              fetch(
                'https://serverless.arsistyle.now.sh/api/orders',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    authorization: x,
                  },
                  body: JSON.stringify({
                    meal_id: id,
                  }),
                }
              ).then(x => {
                // console.log(x);
                // console.log(x.status);
                if (x.status !== 201) {
                  return alert('La orden no pudo ser generada');
                }
                alert('La orden fue generada con exito');
                navigation.navigate('Meals');
              });
            }
          });
        }}
      />
      <Button
        title='Cancelar'
        color='#ff00f0'
        onPress={() => navigation.navigate('Meals')}
      />
    </View>
  );
};
