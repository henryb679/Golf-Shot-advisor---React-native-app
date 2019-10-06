import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { firebaseAuth } from '../../environment/config';
import {signIn} from '../services/FireAuthService';
import defaultStyles from './Style'

/**
 * Renders the view for the login page.
 */
export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }


  handleLogin = () => {
      signIn(this.state.email, this.state.password)
          .then(() => this.props.navigation.navigate('Home'))
          .catch(error => this.setState({ errorMessage: error.message }))
  }

  static navigationOptions = {
    title: 'Login',
    headerStyle :{
      backgroundColor: '#29D967',
    },
  };

  render() {
    return (

        <SafeAreaView style={defaultStyles.container}>
      
          <Image source={require('../assets/images/golf_shot_advisor_logo.png')} style={defaultStyles.logoImage} />

          <Text style={defaultStyles.title}>GOLF SHOT ADVISOR</Text>

          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            style={defaultStyles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            style={defaultStyles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity onPress={this.handleLogin}>
            <View style={defaultStyles.loginButton}>
              <Text>LOG IN</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <View style={defaultStyles.registerButton}>
              <Text>REGISTER</Text>
            </View>
          </TouchableOpacity>

            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>

        </SafeAreaView>

    )
  }
}
