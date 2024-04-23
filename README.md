# Frontend-Exercise
This React Native Expo mobile application, developed with TypeScript, encompasses features such as user registration, login, profile updating, and retrieving user lists. It leverages Redux Saga for state management.

Users have the option to either log in using their email and password or sign up if they're new to the application. When signing up, users are prompted to provide their first name, last name, username, and additional personal details. The application automatically detects the user's current location and fetches information about their city and country, populating these fields like this City, Country.

Upon successful login, users are directed to the home screen, where a text input field is displayed by default with a value of 10. This field fetches 10 random users from the API endpoint. Modifying the input fetches the corresponding number of users, displaying their details in cards containing full names, email addresses, usernames, and avatars. Buyers are distinguished by a green box on the right side of the card, indicating their buyer status. The word "Buyer" is displayed in green text exclusively for buyers.

The profile screen defaults to displaying the logged-in user's information in input fields. Changes made trigger an "update" button, which calls the API endpoint to update the user's profile information.
