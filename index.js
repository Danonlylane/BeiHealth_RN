/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import { Navigation } from "react-native-navigation";
import App from "./App";

// Navigation.registerComponent('App', () => App);

// const WelcomeScreen = {
//     root: {
//         stack: {
//             id: 'WELCOMESCREEN',
//             children: [
//                 {
//                     component: {
//                         name: 'App'
//                     }
//                 }
//             ]
//         }
//     }
// }


import { WelcomeScreen, MainRoot } from "./src/navigation";
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot(WelcomeScreen);
})
