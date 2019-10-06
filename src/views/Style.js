import {StyleSheet} from 'react-native'

// This stylesheet is used to promote code reuse.
export default{

    // For the login, register views
    container:{
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title:{
        marginVertical: 1,
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 30,
    },

    headerText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // Sets the constaints for each and every text input.
    textInput: {
        height: 40,
        fontSize: 20,
        width: '70%',
        borderColor: '#9b9b9b',
        borderBottomWidth: 1,
        marginTop: 20,
        marginVertical: 15,
        color: '#000000'
    },

    logoImage: {
        width: 200, 
        height: 200
    },

    loginButton: {
        textAlign: 'center',
        backgroundColor: '#29D967',
        fontSize: 20,
        width: 100,
        padding: 15,

    },

    registerButton: {
        width: 100,
        marginVertical: 15,
        backgroundColor: '#20C4D5',
        padding: 15,
    },

    widgetHeading: {
        fontSize: 25,
        color: '#000000',
        fontWeight: 'bold',
        padding: 20,
    },

    widgetSubHeading: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },

    widgetSubHeadingBlack: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
    },

    weatherContainer: {
		backgroundColor: '#24d6ea',
		height: 180
	},
    
    gridContainer: {
        flex: 1,
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 2,
    },

    noHolesWidget: {
        marginTop: 80,

        height: 150
    },

    // Column property for add golf course
    addGolfCourseCol1: {
        marginTop: 250,
        height: 350,
        width: '40%'
    },

    addGolfCourseCol2: {
        marginTop: 250,
        height: 350,
        width: '60%'
    },

    // Error message CSS
    errorMessage: {
        color: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
    },

    // Add button for start advisor, add golf course pages.
    addButton: {
        backgroundColor: '#F2594B',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        padding: 10,
        marginLeft: 60,
        marginTop: 100,
     
    },

    buttonText: {
        color: '#FFFFFF',
    },

    // Styling properties for number input fields.
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
        width: '40%',
        marginLeft: 50
    },

    // style sheet for previous result page table header view.
    tableHeaderContainer:{
        color: '#000000',
        fontSize: 20,
        height: 60,
    },

    // Golf course picker style sheet.
    golfCoursePicker: {
        marginTop: -50,
        marginLeft: 10,
        width: '100%',
        height: 200,
    },
}
