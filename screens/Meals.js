import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import ListItem from '../components/ListItem';
import useFetch from '../hooks/useFetch';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  list: {
    alignSelf: 'stretch',
  },
});

const Meals = ({ navigation }) => {
  const { loading, data: meals } = useFetch(
    'https://serverless.arsistyle.now.sh/api/meals'
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={meals}
          keyExtractor={x => x._id}
          renderItem={({ item }) => (
            <ListItem
              onPress={() =>
                navigation.navigate('Modal', {
                  _id: item._id,
                })
              }
              name={item.name}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

Meals.navigationOptions = {
  title: 'Comidas disponibles',
};

export default Meals;
