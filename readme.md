
# README - GOLF SHOT ADVISOR

Link to the video demonstration
https://youtu.be/6MlKTIKJCmE


## Golf Shot Advisor - App Description
* The golf shot advisor application is designed to replace the need to write the results of each and every golf game on a piece of paper. 
* App was built using react-native.
* The app allows the user to see the current weather forecast based on their current GPS location, 
see results from other golf players that use the app to improve their golf scores in 
the future.


To run the app 

***NOTE: ensure XCODE is install + iPhone simulator***
```
npx react-native run-ios
```

## App code Structure

### /app 
#### Home
Once the user has logged in, they are first greeted to the current weather conditions subject to the user allowing for GPS permission to track the current weather conditions. This is done via the inbuilt react Geolocation plugin. From the Geolocation data provided, the user can the weather. The weather information is sourced by the open weather API. The home also is the key place to access the other features of the app.

#### Leaderboard
The leaderboard is designed to allow the user to compare their golf results with others. The sum of the hole values is used and is sorted by the lowest score.

### StartAdvisor
Start Advisor allows the user to enter their new golf records into the system by pre-selecting a golf course that has been already to the DB via the AddGolfCourse view page.

### AddGolfCourse
The add golf course page allows the user to add a new golf course to the DB. With the new golf course, they can set the number of holes, and the respective par hole values.

### PreviousResults
This shows all the golf records entered by the user in a table layout. The table has the following fields, courseName, time that the result was submitted into the system, hole values, par and hole scores.

#### Login 
The login page is the first point of call when the user first opens the app. The logo of the app is present on this page. This page requires the use of FireAuthService.js to validate people's login details.

#### Register
The register page allows a new user to the system to create a personalized account to use the app. The user's email address and password details are taken with the password being encrypted in google firebase.

#### /services
This is primarily handled in the data layer as data is being outsourced via Google firebase and open weather API.

* **FireAutbService**
    * Handles all the login operations within the app.
    * Uses an email address and password combination to get into the app.
* **FireStoreService**
    * Handles the accessing and adding of data into the database.

#### /assets

In the assets folder, it contains the golf_shot_advisor.logo which can be changed at any time. 

#### environment

In this folder, there are 2 files:

* **config.js**
    * It has the credential information for connecting to the Database (firestore) and the initialising the authentication
    for login (firebase auth)
* **weatherAPI.js**
    * This stores the openWeather API KEY.


#### Components
Only code that could be reused has been added to their respective file names
* **Calculation**
    * This is used, to sum up, the total hole and par numbers.

* **Validation**
    * For the par, hole value inputs, a function has been developed to check for invalid inputs in real-time.
    * Other conditions can be changed i.e. the max, min par numbers for example.e

* **Weather**
    * This projects the view of the weather forecast and returns it as a usable view that is used in the Home view.
    * Weather information includes; wind speed, wind direction, current temperature, weather type and the city name.

* **WeatherCondition**
    * This returns the weather icon name for the Weather component as the weather conditions change.
    
#### Styling

In this folder, there is a Style.js file that contains all the default styling CSS attributes used to improve
the appearance of the app. Any styling properties that are common to more than 1 view are handled in this file.

In addition to this, individual style properties have been set for each view under the const styles (Stylesheet).






