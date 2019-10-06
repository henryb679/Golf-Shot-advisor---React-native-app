import React from 'react';
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {register} from "../services/FireAuthService";
import defaultStyles from './Style'

/**
 * Allows thw user to register for a new account.
 */
export default class Register extends React.Component {
    state = {email: '', password: '', errorMessage: null}

    handleRegister = () => {
        // handleRegister firebaseAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        //      .then(() => this.props.navigation.navigate('Login'), Alert.alert('Account has been made'))
        //      .catch(error => this.setState({ errorMessage: error.message }));

        register(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Login'), Alert.alert('Account has been made'))
            .catch(error => this.setState({errorMessage: error.message}));
    }

    static navigationOptions = {
        title: 'Register',
        headerStyle: {
            backgroundColor: '#20C4D5',
        },
    };

    render() {
        return (
            <SafeAreaView style={defaultStyles.container}>

                <Image source={require('../assets/images/golf_shot_advisor_logo.png')} style={defaultStyles.logoImage}/>

                <Text style={defaultStyles.title}>GOLF SHOT ADVISOR</Text>

                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={defaultStyles.textInput}
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={defaultStyles.textInput}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                />
                <TouchableOpacity onPress={this.handleRegister}>
                    <View style={defaultStyles.registerButton}>
                        <Text style={defaultStyles.buttonText}>Register</Text>
                    </View>
                </TouchableOpacity>

                <Text style={{color: 'red'}}>
                    {this.state.errorMessage}
                </Text>

            </SafeAreaView>
        )
    }
}
