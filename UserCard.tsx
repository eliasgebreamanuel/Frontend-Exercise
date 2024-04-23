import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { User } from './types/types';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Image source={{ uri: 'https://images.assetsdelivery.com/compings_v2/metelsky/metelsky1809/metelsky180900220.jpg' }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.userName}>{user.userName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      {user.isBuyer && <Text style={styles.buyerLabel}>Buyer</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  textContainer: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  avatar: {
    width: 50, 
    height: 50,
    borderRadius: 25,
  },
  buyerLabel: {
    backgroundColor: 'green',
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
});

export default UserCard;
