import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Register from './src/views/Register';
import Login from './src/views/Login';
import Home from './src/views/Home';
import Leaderboard from './src/views/Leaderboard';
import PreviousResults from './src/views/PreviousResults';
import StartAdvisor from './src/views/StartAdvisor';
import AddGolfCourse from './src/views/AddGolfCourses'

const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Home: Home,
    Leaderboard: Leaderboard,
    PreviousResults: PreviousResults,
    StartAdvisor: StartAdvisor,
    AddGolfCourse: AddGolfCourse
  },
  {
    initialRouteName: 'Login',

    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
