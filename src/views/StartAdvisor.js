import React from 'react';
import { TouchableHighlight, Modal, Picker, ScrollView, Alert, Platform, Image, View, Text, StyleSheet, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import defaultStyles from './Style'
import FireStoreService from '../services/FireStoreService'
import { db } from "../../environment/config";
import { firebaseAuth } from '../../environment/config';
import { validation } from '../components/Validation'
import moment from "moment";

/**
 * The start advisor page allows the user to add their own golf records
 * to the DB.
 */
export default class StartAdvisor extends React.Component {

    state = {
        currentUser: null,
        exitingGolfCourses: [],
        selectedGolfCourseData: [],
        pickerSelectionCourse: '____',
        parValue: [],
        holeValue: [],
        noHoles: [],
        currentDate: new Date(),
    }

    static navigationOptions = {
        title: 'Start Advisor',
        headerStyle: {
            backgroundColor: '#29D967',
        },
    };

    componentDidMount() {
        const { currentUser } = firebaseAuth;
        this.setState({ currentUser })

        var names = new FireStoreService().getGolfCourses();
        names.then(query => {
            const data = query.docs.map(doc => (doc.data()['golfCourseName']));
            this.setState({ exitingGolfCourses: data });
        });
    }

    // When a golf course is selected, the state is set 
    setPickerValue(newValue) {
        this.setState({
            pickerSelectionCourse: newValue
        })
    }

    // Adds a new golf course to the DB
    addNewGolfRecord = () => {
        const timeStamp = moment(this.state.currentDate).format("DD-MMM-YYYY HH:mm:ss");

        // Pass in golf course name, holeValues, 
        new FireStoreService().addGolfRecord(this.state.currentUser.email, this.state.pickerSelectionCourse,
            this.state.holeValue, this.state.parValue, this.state.parValue.length, timeStamp);

        this.setState({
            pickerSelectionCourse: '____',
            parValue: [],
            holeValue: [],
            noHoles: [],
        })

        // Returns back to home page
        this.props.navigation.navigate('Home')
    }
    /*
    getSelectedGolfCourse = (pickerSelectionCourse) => {
        if (pickerSelectionCourse === '___') {
            return;
        }
        else {
            db.collection("golf_course")
                .where("golfCourseName", "==", pickerSelectionCourse)
                .get()
                .then(querySnapshot => {
                    //   const data = querySnapshot.docs.map(doc => doc.data()['golfCourseName']);
                    //   const data = querySnapshot.docs.map(doc => {golfCourseName: doc.data()['golfCourseName'], golfCourseName: doc.data()['golfCourseName']}));

                    const data = querySnapshot.docs.map(doc => ({ golfCourseName: doc.data()['golfCourseName'], noHoles: doc.data()['noHoles'], parValue: doc.data()['parValue'] }));
                    // var d = JSON.stringify(data);
                    var modifiedData = JSON.parse(JSON.stringify(data).substring(1, JSON.stringify(data).length - 1));
                    this.setState({ parValue: modifiedData['parValue'] });
                    this.setState({ selectedGolfCourseData: modifiedData });

                    // var ddd = JSON.parse(dd);

                    // ORIGINAL
                    //   this.setState({ selectedGolfCourseData: JSON.stringify(data) });
                    //   var result = this.state.selectedGolfCourseData.substring(1, this.state.selectedGolfCourseData.length-1);
                    // var a = JSON.parse(result);
                    // Alert.alert(a["noHoles"]);

                    // Alert.alert(this.state.selectedGolfCourseData["golfCourseName"]);
                    // Alert.alert(this.state.selectedGolfCourseData["noHoles"]);
                    // Alert.alert(this.state.selectedGolfCourseData["parValue"]);


                    // Alert.alert(a["golfCourseName"]);
                    //   var AA = '{"name": "mkyong","age": 30,"address": {"streetAddress": "88 8nd Street","city": "New York"},"phoneNumber": [{"type": "home","number": "111 111-1111"},{"type": "fax","number": "222 222-2222"}]}';
                    //   var json = JSON.parse(AA);
                    //   alert(json["name"]); //mkyong

                });
        }
    }
    */

    getParData = (pickerSelectionCourse) => {
        if (pickerSelectionCourse === '___') {
            return;
        }
        else {

            var names = new FireStoreService().getGolfCourseName(pickerSelectionCourse);
            names.then(query => {
                const data = query.docs.map(doc => ({ parValue: doc.data()['parValue'] }));
                var modifiedData = JSON.parse(JSON.stringify(data).substring(1, JSON.stringify(data).length - 1));
                this.setState({ parValue: modifiedData['parValue'] });
            });

        }
    }


    // Handles changes when input fields are modified
    handleChange(index, event) {
        const { text } = event.nativeEvent;

        const updatedArray = [...this.state.holeValue];
        updatedArray[index] = validation(text);

        this.setState({
            holeValue: updatedArray,
        })
    }

    // Populates the golf course names inside of the picker.
    populateGolfCourseNames = this.state.exitingGolfCourses.map((item) => {
        return (
            <Picker.Item label={item.name} value={item.name} key={item.name} />
        );
    })


    render() {

        var valid = () => {
            var golfCourseNameCheck = this.state.pickerSelectionCourse === '____' ? false : true;

            if (golfCourseNameCheck === true) {
                return true;
            }

            else {
                return false;
            }
        }

        let pick = [];

        for (var i = 0; i < this.state.exitingGolfCourses.length; i++) {
            pick.push(this.state.exitingGolfCourses[i]);
        }

        let optionItems = pick.map((item, index) => {
            return (< Picker.Item label={item} value={index} key={index} />);
        })

        let aa = () => {
            this.getParData(this.state.pickerSelectionCourse)
            // this.getSelectedGolfCourse(this.state.pickerSelectionCourse);


            return (
                <View>
                    {
                        this.state.parValue.map((value, index) =>
                            (
                                <View key={index} style={styles.parValueContainer}>
                                    <Text style={styles.inputBox}>PAR:({index + 1}) - {value}</Text>
                                </View>
                            ))
                    }
                </View>

            )
        }

        var tempArray = [];
        for (let i = 0; i < this.state.parValue.length; i++) {
            var placeholderValue = 'Hole: ' + `${i + 1}`;
            tempArray.push(
                <View key={i}>
                    <TextInput style={defaultStyles.inputBox}
                        type='text'
                        placeholder={placeholderValue}
                        value={this.state.holeValue[i]}
                        name={this.state.holeValue[i]}
                        maxLength={1}
                        onChange={e => this.handleChange(i, e)} />
                </View>
            );
        }


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

                {/* <View style={defaultStyles.row}>
                {populateInput} */}

                {this.state.pickerSelectionCourse !== '____' ? (
                    // <View>


                    // </View>
                    <View style={defaultStyles.row}>

                        <View style={styles.parValueCol}>

                            <Text style={defaultStyles.widgetSubHeadingBlack}>PAR VALUE</Text>


                            <ScrollView style={defaultStyles.populateInput}>
                                {aa()}
                            </ScrollView>

                        </View>

                        <View style={styles.holeValueCol}>
                            <Text style={defaultStyles.widgetSubHeadingBlack}>HOLE VALUE</Text>
                            <ScrollView style={defaultStyles.populateInput}>

                                {tempArray}
                            </ScrollView>
                        </View>

                    </View>


                ) : (
                        <View>
                            <Text style>Need to select a golf course before continuing</Text>
                        </View>
                    )}

                {valid() ? (<TouchableOpacity onPress={this.addNewGolfRecord}>
                    <View style={defaultStyles.addButton}>
                        <Text style={defaultStyles.buttonText}>ADD NEW GOLF RECORD</Text>
                    </View>
                </TouchableOpacity>) : (<Text></Text>)}

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    parValueCol: {
        marginTop: 50,
        height: 350,
        width: '40%'
    },
    holeValueCol: {
        marginTop: 50,
        height: 350,
        width: '60%'
    },
    inputBox: {
        fontSize: 15,
        padding: 5,
        borderColor: '#9b9b9b',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    parValueContainer: {
        marginLeft: 15,
    }
});