import React from 'react'
import { Alert } from 'react-native';
import { db } from "../../environment/config";

import { sumTotal, checkValue } from '../components/Calculation';

const GOLF_COURSE_COLLECTION = 'golf_course';
const GOLF_RECORD_COLLECTION = 'golf_data';


export default class FireStoreService extends React.Component {

    // Adds new golf records into the DB
    addGolfRecord = (emailAddress, golfCourseName, holeValue, parValue, noHoles, timeStamp) => {
        var value = checkValue(holeValue, noHoles);

        const data = {
            emailAddress: emailAddress,
            golfCourseName: golfCourseName,
            noHoles: noHoles,
            holeValue: value,
            holeTotal: sumTotal(value),
            parTotal: sumTotal(parValue),
            timeStamp: timeStamp
        };
        db.collection(GOLF_RECORD_COLLECTION)
            .doc()
            .set(data)
            .then(() => {
                Alert.alert("A new golf record has been added, ");
            })
            .catch(error => {
                Alert.alert(error.message, "Can't add new golf record");
            });
    }

    // Adds golf courses to the DB
    addGolfCourse = (golfCourseName, noHoles, parValue) => {
        var value = checkValue(parValue, noHoles);
        const data = {
            golfCourseName: golfCourseName,
            noHoles: noHoles,
            parValue: value,
            parTotal: sumTotal(value)
        };


        db.collection(GOLF_COURSE_COLLECTION)
            .doc()
            .set(data)
            .then(() => {
                Alert.alert("A new golf course has been added, ");
            })
            .catch(error => {
                Alert.alert(error.message, "Can't add new golf record");
            });
    };


    // GET golf courses that are already in the db
    getGolfCourses = () => {
        // db.collection(GOLF_COURSE_COLLECTION)
        //     .get()
        //     .then(query => {
        //         const data = query.docs.map(doc => doc.data())
        //         Alert.alert(data);
        //     })

        return db.collection(GOLF_COURSE_COLLECTION).get();
    };

    // GET DATA that matches the particular golf course name
    getGolfCourseName = (courseName) => {
        return db.collection(GOLF_COURSE_COLLECTION).where("golfCourseName", "==", courseName).get();
    }

    // GET previous results for a specified user
    getUserResults = (emailAddress) => {
        return db.collection(GOLF_RECORD_COLLECTION).where("emailAddress", "==", emailAddress).get();
    }

    // GET Leaderboard of golf courses with data.
    getLeaderboardInfo = () => {
        return db.collection(GOLF_RECORD_COLLECTION).get();
    }

    // GET Leaderboard data of particular course name
    getLeaderboardData = (courseName) => {
        return db.collection(GOLF_RECORD_COLLECTION).where("golfCourseName", "==", courseName).get();
    }
}
