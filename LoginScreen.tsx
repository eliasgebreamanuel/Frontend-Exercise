import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux'; 

type Props = {
  navigation: StackNavigationProp<any>; 
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // this is used to validate email and password entered by the users in the login screen
    if (!email || !password) {
      Alert.alert('Please enter both email and password.');
      return;
    }

    try {
      // this is used to make a POST request to the login endpoint with email and password given by the user at the login screen
      const response = await fetch('http://143.198.168.244:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        // this is used to dispatch action to store user data
        dispatch({ type: 'LOGIN_SUCCESS', payload: userData }); 
        // this is  used to navigate to home screen after successful login
        navigation.navigate('Home'); 
      } else {
        // this is used to handle if the authentication fails 
        Alert.alert('Authentication failed. Please enter the correct email and password.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error logging in:', error);
      Alert.alert('An error occurred while logging in. Please try again later.');
    }
  };
  
  const handleSignUp = () => {
    // this is used to navigate to the sign-up screen
    navigation.navigate('SignUp'); 
  };
  const handleHome = () => {
    // this is used to navigate to the sign-up screen
    navigation.navigate('Home'); 
  };
  return (
    <View style={styles.container}>
      {/* this is used to accept the user email address */}
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password:</Text>
      {/* this is used to accept the user password  */}

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {/* this is a button to navigate to the Login Screen */}
      <Button title="Log In" onPress={handleLogin} />
      {/* this is a button to navigate to the Home Screen */}
      <Button title="Sign Up" onPress={handleSignUp} /> 

    </View>
  );
};
// this is used to set the style of the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
