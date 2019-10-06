import React from 'react';
import {View, SafeAreaView } from 'react-native';
import defaultStyles from './Style'
import FireStoreService from '../services/FireStoreService'
import { DataTable } from 'react-native-paper';

/**
 * Shows all the golf records that the user has entered into the system.
 */
export default class PreviousResults extends React.Component {

    state = {
        userGolfData: [],
    }

    static navigationOptions = {
        title: 'PreviousResults',
        headerStyle: {
            backgroundColor: '#F2A007', 
        },
    };

    componentDidMount() {
        // Gets the users details to ensure they don't get a copy of anyone else's results
        const { navigation } = this.props;
        const emailAddress = navigation.getParam('currentUser').email;
        
        var names = new FireStoreService().getUserResults(emailAddress);

        names.then(query => {
            const data = query.docs.map(doc => (doc.data()));
            this.setState({ userGolfData: data });
        });
    }

    render() {
        let golfData = [];
        for (var i = 0; i < this.state.userGolfData.length; i++) {
            golfData.push(this.state.userGolfData[i]);
        }

        // Maps the golf record data into individual rows
        let dataRow = golfData.map((item, index) => {
           
            return (
                <DataTable.Row key={index}>
                    <DataTable.Cell>{item["golfCourseName"]}</DataTable.Cell>
                    <DataTable.Cell>{item["timeStamp"]}</DataTable.Cell>
                    <DataTable.Cell>{item["holeValue"].toString().split(":")}</DataTable.Cell>
                    <DataTable.Cell numeric>{item["parTotal"]}</DataTable.Cell>
                    <DataTable.Cell numeric>{item["holeTotal"]}</DataTable.Cell>
                </DataTable.Row>
            )
        })

        return (

            <SafeAreaView style={defaultStyles.gridContainer}>
                    <View>
                
                        <DataTable>
                            <DataTable.Header style={defaultStyles.tableHeaderContainer}>
                                <DataTable.Title>Course Name</DataTable.Title>
                                <DataTable.Title>Time</DataTable.Title>
                                <DataTable.Title>Hole Values</DataTable.Title>
                                <DataTable.Title numeric>Par Score</DataTable.Title>
                                <DataTable.Title numeric>Hole Score</DataTable.Title>
                            </DataTable.Header>

                            {dataRow}

                        </DataTable>
                    </View>
            </SafeAreaView>
        );
    }

}


