import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { User } from './types/types';


interface Props {
  users: User[];
}

const UserList: React.FC<Props> = ({ users }) => {
  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Image
              source={{uri: "https://images.assetsdelivery.com/compings_v2/metelsky/metelsky1809/metelsky180900220.jpg"}}
              style={styles.avatar}
            />
            <Text>{item.firstName} {item.lastName}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Username: {item.userName}</Text>
            <Text>Address: {item.address}</Text>
          </View>
        )}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default UserList;
