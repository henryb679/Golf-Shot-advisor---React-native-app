import React from 'react';
import { TouchableHighlight, Modal, Picker, ScrollView, Alert, Platform, Image, View, Text, StyleSheet, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import defaultStyles from './Style'
import FireStoreService from '../services/FireStoreService'

/**
 * The leaderboard shows how well users are tracking against other players 
 * in the respective golf courses.
 */
export default class Leaderboard extends React.Component {
    state = {
        exitingGolfCourses: [],
        pickerSelectionCourse: '____',
        leaderboardData: [],
    }

    static navigationOptions = {
        title: 'Leaderboard',
        headerStyle: {
            backgroundColor: '#F2A007',
        },
    };

    componentDidMount() {
        var firestoreData = new FireStoreService().getGolfCourses();
        firestoreData.then(query => {
            const data = Array.from(new Set(query.docs.map(doc => (doc.data()['golfCourseName']))));
            this.setState({ exitingGolfCourses: data });
        });
    }

    // When a golf course is selected, the state is set 
    setPickerValue(newValue) {
        this.setState({
            pickerSelectionCourse: newValue
        })
    }

    // Gets the data for the leaderboard
    getGolfData = (pickerSelectionCourse) => {
        if (pickerSelectionCourse === '___') {
            return;
        }
        else {
            var firestoreData = new FireStoreService().getLeaderboardData(pickerSelectionCourse);
            firestoreData.then(query => {
                const data = query.docs.map(doc => ({ holeTotal: doc.data()["holeTotal"], emailAddress: doc.data()["emailAddress"] }));
                this.setState({ leaderboardData: data });
            });
        }
    }

    render() {
        // Renders the golf courses 
        let pick = [];
        for (var i = 0; i < this.state.exitingGolfCourses.length; i++) {
            pick.push(this.state.exitingGolfCourses[i]);
        }
        let optionItems = pick.map((item, index) => {
            return (< Picker.Item label={item} value={index} key={index} />);
        })


        this.getGolfData(this.state.pickerSelectionCourse);
        var populateGolfData = [];

        var a = this.state.leaderboardData.sort(function (a, b) {
            return a.holeTotal - b.holeTotal;
        })

        if (a.length >= 0) {
            for (let i = 0; i < a.length; i++) {
                populateGolfData.push(a[i]);
            }

        }

        // Populates the rendered view for the leaderboard.
        let resultView = populateGolfData.map((value, index) => {
            return (
                <View key={index} style={styles.resultView}>
                    <Text>#{index + 1}        {value.emailAddress}        {value.holeTotal}</Text>
                </View>
            )
        })

        return (

            <SafeAreaView style={styles.container}>

                <Button onPress={() => this.togglePicker()} title={"SELECT AN EXISTING GOLF COURSE"} />
                <Text>You have selected the {this.state.pickerSelectionCourse} Course </Text>

                <Picker
                    style={defaultStyles.golfCoursePicker}
                    selectedValue={this.state.pickerSelectionCourse}
                    onValueChange={(itemValue, itemIndex) => this.setState({ pickerSelectionCourse: this.state.exitingGolfCourses[itemValue] })}>
                    {optionItems}
                </Picker>
                {this.state.pickerSelectionCourse !== '____' ? (
                    <View style={defaultStyles.row}>
                        <View style={styles.resultView}>
                            <Text style={defaultStyles.widgetSubHeadingBlack}>Postion      Email        Score</Text>
                            <ScrollView style={defaultStyles.populateInput}>
                                {resultView}
                            </ScrollView>
                        </View>
                    </View>
                ) : (
                        <Text></Text>
                    )}
            </SafeAreaView>
        );
    }
}

// Specific stylesheet properties for this view.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    resultView: {
        marginTop: 20
    }
});
