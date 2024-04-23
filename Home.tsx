import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { fetchUsersRequest, updateUserInfo } from './actions/userActions';
import UserCard from './UserCard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  // this is used to call dispatch function
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.user);
  // this is used to track the state of the limit variable
  const [limit, setLimit] = useState<number>(10);
  // this is used to handle if there a change and call to fetch new users
  useEffect(() => {
    dispatch(fetchUsersRequest(limit));
  }, [dispatch, limit]);
  // this is used to handle the fetch users
  const handleFetchUsers = () => {
    dispatch(fetchUsersRequest(limit));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* this is used to accept the number of users we want to fetch from the endpoint */}
        <TextInput
          style={styles.input}
          value={limit ? limit.toString() : ''}
          onChangeText={(text) => {
            const parsedValue = parseInt(text);
            setLimit(isNaN(parsedValue) ? 0 : parsedValue);
          }}
          keyboardType="numeric"
        />
        {/* this is a button to trigger the function to fetch the users */}
        <Button title="Fetch Users" onPress={handleFetchUsers} />
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error}</Text>}
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </ScrollView>
    </View>
  );
};


const ProfileScreen: React.FC = () => {
  // this is used to get teh currently logged in stored user information
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  // this is used to call the dispatch function
  const dispatch = useDispatch();
  // this is used to get the logged in user informations
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  // this is used to handle the onlcike event of update button
  const handleUpdateUserInfo = () => {
    dispatch(updateUserInfo({ firstName, lastName, email }));
  };

  return (
    <View>
      {currentUser ? (
        <View>
          <View>
            <Text>First Name:</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View>
            <Text>Last Name:</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View>
            <Text>Email:</Text>
            <TextInput
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </View>
          <Button title="Update" onPress={handleUpdateUserInfo} />
        </View>
      ) : (
        <Text>No user information available</Text>
      )}
    </View>
  );
};

const Home: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    width: 200,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: 300,
  },
  text: {
    marginBottom: 5,
  },
});

export default Home;
