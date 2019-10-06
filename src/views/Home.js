import React from 'react'
import { Alert, Platform, Image, View, Text, StyleSheet, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { firebaseAuth } from '../../environment/config';
import Geolocation from 'react-native-geolocation-service';
import defaultStyles from './Style'
import {API_KEY} from '../../environment/weatherAPI'
import {logout} from '../services/FireAuthService'
import Weather from '../components/Weather';

// Loads the font face from Material UI.
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();

/**
 * The home page shows the weather, and allows the user
 * to access the different components of the app.
 */
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            weatherData: null,
            gpsAvailable: true,
        }
    }

    componentDidMount() {
        const { currentUser } = firebaseAuth;
        this.setState({ currentUser })

        // Gets the current geolocation of the device.
        Geolocation.getCurrentPosition(
            position => {
                this.getWeatherData(position.coords.latitude, position.coords.longitude);
            },
            error => {
                this.setState({
                    error: 'Error Getting Weather Conditions'
                });
            }
        );
    }

    // Fetches the weather information in real time
    getWeatherData(latitude, longitude) {
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
        )
            .then(res => res.json())
            .then(json => {
                this.setState({
                    gpsAvailable: false,
                    weatherData: json,
                });
            });
    }

    // Redirects the user to signing out
    logOut = () => {
        logout()
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => this.setState({ errorMessage: error.message }));
    }

    // These calls - refer the navigation to the correct pages
    redirectStartAdvisor = () => {
        this.props.navigation.navigate('StartAdvisor');
    }

    redirectAddGolfCourse = () => {
        this.props.navigation.navigate('AddGolfCourse');
    }

    redirectPreviousResults = () => {
        this.props.navigation.navigate('PreviousResults',{currentUser: this.state.currentUser});
    }

    redirectLeaderboard = () => {
        this.props.navigation.navigate('Leaderboard');

    }

    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#29D967',
        },
        headerLeft: null
    };


    render() {
        const { currentUser } = this.state
        const { gpsAvailable } = this.state;

        return (
            <SafeAreaView style={defaultStyles.gridContainer}>

                {/* Welcome message, logout button */}
                <View style={defaultStyles.row}>
                    <View style={[styles.widgetBox, styles.welcomeBox]}>
                        <Text style={defaultStyles.widgetHeading}>Welcome {currentUser && currentUser.email}</Text>
                        <TouchableOpacity style={[styles.logOutButton]} onPress={this.logOut}>
                            <View style={[styles.logOutButtonView]}>
                                <Text style={styles.buttonText}>Log out</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

                {/* Weather information */}
                <View>
                    {gpsAvailable ? (

                        <View style={[defaultStyles.weatherContainer]}>
                            <Text style={[defaultStyles.widgetHeading]}>Weather Information is not avaiable,
                                GPS is currently disabled</Text>
                        </View>
                    ) : (
                        <Weather
                            weatherData={this.state.weatherData}
                        />
                    )}
                </View>

                {/* Grid of buttons that allows the user to navigate to other functions of the application*/}
                <View style={defaultStyles.row}>
                    <TouchableOpacity style={[styles.button, styles.startAdvisorButton]} onPress={this.redirectStartAdvisor}>
                        <Text style={styles.buttonText}>START ADVISOR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.addGolfCourseButton]} onPress={this.redirectAddGolfCourse}>
                        <Text style={styles.buttonText}>ADD GOLF COURSES</Text>
                    </TouchableOpacity>
                </View>

                <View style={defaultStyles.row}>

                    <TouchableOpacity style={[styles.button, styles.previousGolfResultsButton]} onPress={this.redirectPreviousResults}>
                        <Text style={styles.buttonText}>PREVIOUS RESULTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.leaderboardButton]} onPress={this.redirectLeaderboard}>
                        <Text style={styles.buttonText}>LEADERBOARD</Text>
                    </TouchableOpacity>
                </View>

                <View style={defaultStyles.row}></View>
                <View style={defaultStyles.row}></View>

            </SafeAreaView>
        );
    }
}

// CSS for home page
const styles = StyleSheet.create({
    // Fixed size constraints for the widget boxes
    widgetBox: {
        flex: 1,
        height: 120,
    },

    // Properities for the menu buttons.
    button: {
        flex: 1,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    startAdvisorButton: {
        backgroundColor: '#29D967',
    },

    addGolfCourseButton: {
        backgroundColor: '#F2594B'
    },

    previousGolfResultsButton: {
        backgroundColor: '#F2A007'
    },

    leaderboardButton: {
        backgroundColor: '#F2B807'
    },

    buttonText: {
        fontWeight: "800",
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },

    // Welcome box style properties
    welcomeBox: {
        backgroundColor: '#FFFFFF'
    },

    // Style properties for the weather widget.
    weatherContainer: {
        backgroundColor: '#24d6ea'
    },

    weatherInfoText: {
        fontSize: 20,
        color: '#FFFFFF',
        paddingLeft: 20,
    },

    // Log out button style properties
    logOutButtonView: {
        width: 100,
        marginVertical: 15,
        backgroundColor: '#000000',
        padding: 15,
    },

    logOutButton: {
        color: '#FFFFFF',
        alignItems: 'flex-end',
        height: 150,
        marginVertical: -25,
    },


})
