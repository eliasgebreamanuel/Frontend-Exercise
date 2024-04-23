import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignUpForm from './SignUpForm';
import LoginScreen from './LoginScreen';
import Home from './Home';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    // this is used to navigate to different screens using stack navigator

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUpForm} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
