import React from 'react';
import { Picker, ScrollView, Alert, Platform, Image, View, Text, StyleSheet, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import defaultStyles from './Style'

import FireStoreService from '../services/FireStoreService'

/**
 * Allows the user to add a new golf course to the DB
 * They can enter the name of the golf course, number of holes and the par values
 */
export default class AddGolfCourses extends React.Component {

    state = {
        golfCourseName: '',
        noHoles: 3,
        parValue: [],
        exitingGolfCourses: [],
    }

    static navigationOptions = {
        title: 'Add Golf Course/s',
        headerStyle: {
            backgroundColor: '#F2594B',
        },
    };

    componentDidMount(){
        var names = new FireStoreService().getGolfCourses();
        names.then(query => {
            query.docs.map(doc => this.state.exitingGolfCourses.push(doc.data().golfCourseName));
        });
    }

    // Adds a new golf course to the DB
    addNewGolfCourse = () => {
        new FireStoreService().addGolfCourse(this.state.golfCourseName, this.state.noHoles, this.state.parValue);

        // Clears input fields once a new golf course has been added to the system
        this.setState({
            golfCourseName: '',
            noHoles: 3,
            parValue: [],
        })

        // Returns back to home page
        this.props.navigation.navigate('Home')
    }

    // Handles changes when input fields are modified
    handleChange(index, event) {
        const { text } = event.nativeEvent;

        let newText = '';
        let numbers = '0123456';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                alert("Numbers between 0-6 are allowed");
            }
        }

        const updatedArray = [...this.state.parValue];
        updatedArray[index] = newText;
        this.setState({
            parValue: updatedArray,
        })
    }

    render() {
        var tempArray = [];
        for (let i = 0; i < this.state.noHoles; i++) {
            var placeholderValue = 'Par: ' + `${i + 1}`;
            tempArray.push(
                <View key={i}>
                    <TextInput style={styles.inputBox}
                               type='text'
                               placeholder={placeholderValue}
                               value={this.state.parValue[i]}
                               name={this.state.parValue[i]}
                               maxLength={1}
                               onChange={e => this.handleChange(i, e)} />
                </View>
            );
        }

        // Logic checking to prevent invalid inputs from being added to the DB.
        var valid = () => {
            var golfCourseNameCheck = this.state.golfCourseName.length === 0 ? false : true;
            var noOfElement = this.state.golfCourseName.length === 0 ? false : true;

            // Prevents duplicate golf course names from being added to the DB
            for (let i = 0; i < this.state.exitingGolfCourses.length; i++) {
                if (this.state.exitingGolfCourses[i].toLowerCase() === this.state.golfCourseName.toLowerCase()) {
                    return false;
                }
            }

            if (noOfElement === true) {
                if (golfCourseNameCheck === true) {
                    return true;
                }
            }

            else {
                return false;
            }
        }

        // Returns a list of golf course names that have already been added.
        const golfCourseDetail = this.state.exitingGolfCourses.map(n => {
            return (<View key={n}>
                    <Text style={styles.golfCourseNameBox}>○ {n}</Text>
                </View>
            )
        });


        return (
            <SafeAreaView style={defaultStyles.container}>
                <View style={defaultStyles.row}>
                    <TextInput
                        placeholder="Golf Course Name"
                        autoCapitalize="none"
                        style={defaultStyles.textInput}
                        onChangeText={golfCourseName => this.setState({ golfCourseName })}
                        value={this.state.golfCourseName}
                        maxLength={50}
                    />
                </View>
                <View style={defaultStyles.row}>
                    <View style={defaultStyles.noHolesWidget}>
                        <Text style={defaultStyles.widgetSubHeadingBlack}>NO OF HOLES</Text>
                        <Picker selectedValue={this.state.noHoles} style={styles.holeNoPicker}
                                onValueChange={(itemValue) => this.setState({ noHoles: itemValue })}>
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="9" value="9" />
                            <Picker.Item label="18" value="18" />
                        </Picker>
                    </View>
                </View>
                <View style={defaultStyles.row}>

                    <View style={defaultStyles.addGolfCourseCol1}>
                        <Text style={defaultStyles.widgetSubHeadingBlack}>GOLF COURSES</Text>
                        <ScrollView style={styles.populateInput}>
                            {/* <Text>{this.state.exitingGolfCourses}</Text> */}
                            {golfCourseDetail}
                        </ScrollView>
                    </View>

                    <View style={defaultStyles.addGolfCourseCol2}>
                        <Text style={defaultStyles.widgetSubHeadingBlack}>PAR HOLE</Text>
                        <ScrollView style={styles.populateInput}>
                            {tempArray}
                        </ScrollView>
                        {valid() ? (
                            <TouchableOpacity onPress={this.addNewGolfCourse}>
                                <View style={defaultStyles.addButton}>
                                    <Text style={defaultStyles.buttonText}>ADD NEW GOLF COURSE</Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <Text style={defaultStyles.errorMessage}>Invalid Input parameters</Text>
                        )}

                    </View>
                </View>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    populateInput: {
        margin: 5,
        height: 400,
        padding: 5,
        marginLeft: 20,
    },

    inputBox: {
        fontSize: 15,
        padding: 5,
        borderColor: '#9b9b9b',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },

    holeNoPicker: {
        marginTop: -50,
        marginLeft: 10,
        padding: 10,
        width: 100,
        height: 50,
    },

    button: {
        flex: 1,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
