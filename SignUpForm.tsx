

import React, { useState, useEffect } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

export default function SignUpForm() {
  // this is used to track the state of the fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [isBuyer, setIsBuyer] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  // this is used to get the location of the user by default from where they are by accessing their location i.e city, country
  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = async () => {
    try {
      // this is used to request permission to access the user's location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // this is used to get the user's current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // this is used to reverse geocoding to convert coordinates into address
      const addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
      const city = addressResponse[0].city || '';
      const country = addressResponse[0].country || '';
      setAddress(`${city}, ${country}`);
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const handleSignUp = () => {
    // this is used to validate form data before sending to backend
    if (!fullName || !email || !userName || !password || !confirmPassword || !address) {
      alert('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  
    // this is used to split full name into first name and last name
    const [firstName, lastName] = fullName.split(' ');
  
    // this is used to construct user object to send to backend
    const user = {
      firstName,
      lastName,
      email,
      userName,
      password,
      address,
      isBuyer,
      profilePic,
    };
  
    // this is used to log user data to see in the terminal
    console.log('User data:', user);
    // this is used to send user data to backend for registration
    fetch('http://143.198.168.244:3000/api/users/register/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => {
      if (response.ok) {
        console.log('User registered successfully');
        // this is used to handle success, maybe navigate to another screen or show a success message
      } else {
        console.error('Error registering user:', response.statusText);
        // this is used to handle error, maybe show an error message to the user
      }
    })
    .catch(error => {
      console.error('Error registering user:', error);
      // this is used to handle error, maybe show an error message to the user
    });
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.label}>Full Name:</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Enter your username"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
        />

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry={true}
        />

        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address (City, Country)"
        />

        <Text style={styles.label}>Is Buyer:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[styles.radioButton, isBuyer ? styles.selectedButton : null]}
            onPress={() => setIsBuyer(true)}
          >
            <Text style={styles.radioText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, !isBuyer ? styles.selectedButton : null]}
            onPress={() => setIsBuyer(false)}
          >
            <Text style={styles.radioText}>No</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Profile Picture (Optional):</Text>
        <TextInput
          style={styles.input}
          value={profilePic}
          onChangeText={setProfilePic}
          placeholder="Enter profile picture URL it is optional"
        />

        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  radioText: {
    fontSize: 16,
    color: 'black',
  },
});
