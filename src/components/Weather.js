import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import defaultStyles from '../views/Style'

import { WeatherCondition } from '../components/WeatherCondition';

// Gathers all the information from the provided weather widget and generates the view for it
const Weather = ({ weatherData}) => {
	
	// Processes the weather data and puts it into its respective va
	var city = weatherData.name;
	var temperature = weatherData.main.temp;
	var weatherType = weatherData.weather[0].main;
	var windSpeed = weatherData.wind.speed;
	var windDirection = weatherData.wind.deg;

	return (
		<View style={styles.weatherContainer}>
			<View style={[defaultStyles.weatherContainer]}>

				<Text style={[defaultStyles.widgetHeading]}>Weather</Text>

				<Icon style={styles.weatherIcon}size={100} name={WeatherCondition[weatherType].icon} color={'#fff'} />

				<Text style={[styles.weatherText, styles.weatherTypeText]}>{weatherType}</Text>

				<Text style={styles.weatherText}>City: {city}</Text>
				<Text style={styles.weatherText}>Temperature: {temperature}˚C</Text>
				<Text style={styles.weatherText}>Wind Direction: {windDirection}° </Text>
				<Text style={styles.weatherText}>Wind Speed: {windSpeed}meter/sec</Text>
			
			</View>
		</View>
	);
};

const styles = StyleSheet.create({

	weatherText: {
		fontWeight: 'bold',
		fontSize: 15,
		marginLeft: 20,
		color: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
	},

	weatherIcon: {
		padding: 15,
		alignSelf: 'flex-end',
		marginTop: -5,
		position: 'absolute'
	},

	weatherTypeText: {
		alignSelf: 'flex-end',
		position: 'absolute',
		paddingTop: 120,
		paddingRight: 45,
		color: '#000000',
	}
});

export default Weather;