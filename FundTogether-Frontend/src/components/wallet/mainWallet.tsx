// // App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Screens
// import WelcomeScreen from './screens/onboarding/WelcomeScreen';
// import SecuritySetupScreen from './screens/onboarding/SecuritySetupScreen';
// import SeedPhraseGenerationScreen from './screens/onboarding/SeedPhraseGenerationScreen';
// import SeedPhraseConfirmationScreen from './screens/onboarding/SeedPhraseConfirmationScreen';
// import WalletCreatedScreen from './screens/onboarding/WalletCreatedScreen';
// import PortfolioScreen from './screens/PortfolioScreen';
// import AssetDetailsScreen from './screens/AssetDetailsScreen';
// import SendConfirmationScreen from './screens/SendConfirmationScreen';
// import ReceiveScreen from './screens/ReceiveScreen';
// import SettingsScreen from './screens/SettingsScreen';
// // ... other screens

// const Stack = createNativeStackNavigator();

// export default function App() {
//   // In a real app, you'd check if a wallet exists and navigate accordingly
//   const initialRouteName = 'Welcome'; // Or 'Portfolio' if wallet exists

//   return (
//     <NavigationContainer theme={{
//       dark: true,
//       colors: {
//         primary: '#007AFF', // Electric Blue
//         background: '#12121D', // Dark Navy
//         card: '#1D1D2B', // Slightly lighter dark
//         text: '#E0E0E0', // Light grey for text
//         border: '#2A2A3A',
//         notification: '#FF3B30',
//       },
//     }}>
//       <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
//         {/* Onboarding Flow */}
//         <Stack.Screen name="Welcome" component={WelcomeScreen} />
//         <Stack.Screen name="SecuritySetup" component={SecuritySetupScreen} />
//         <Stack.Screen name="SeedPhraseGeneration" component={SeedPhraseGenerationScreen} />
//         <Stack.Screen name="SeedPhraseConfirmation" component={SeedPhraseConfirmationScreen} />
//         <Stack.Screen name="WalletCreated" component={WalletCreatedScreen} />

//         {/* Main App Flow */}
//         <Stack.Screen name="Portfolio" component={PortfolioScreen} />
//         <Stack.Screen name="AssetDetails" component={AssetDetailsScreen} />
//         <Stack.Screen name="SendConfirmation" component={SendConfirmationScreen} />
//         <Stack.Screen name="Receive" component={ReceiveScreen} />
//         <Stack.Screen name="Settings" component={SettingsScreen} />
//         {/* ... other screens like Swap, Discover */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }