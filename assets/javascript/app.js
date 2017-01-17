// Steps:
// 
// 1. initialize Firebase
// 2. create a way to retrieve train information from the database
// 3. Create a way to calculate the minutes (moment.js?)
// 4. Calculate estimated arrival times

// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyDfzJm1fwIRmw43S2bm_3am6mJbrW8GJ70",
    authDomain: "traintimes-6f25e.firebaseapp.com",
    databaseURL: "https://traintimes-6f25e.firebaseio.com",
    storageBucket: "traintimes-6f25e.appspot.com",
    messagingSenderId: "222867689502"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#train-btn").on("click", function() {

  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var trainDest = $("#destination").val().trim();
  var trainStart = moment($("#first-train").val().trim(), "DD/MM/YY").format("X");
  var trainFreq = $("#frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trainName: trainName,
    destination: trainDest,
    startTime: trainStart,
    frequency: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.startTime);
  console.log(newTrain.frequency);

  // Alert
  alert("Train time successfully added");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var nameSnap = childSnapshot.val().name;
  var destSnap = childSnapshot.val().role;
  var trainStart = childSnapshot.val().start;
  var freqSnap = childSnapshot.val().rate;

  // Train Info
  console.log(nameSnap);
  console.log(destSnap);
  console.log(trainStart);
  console.log(freqSnap);

  // Prettify the Train start time
  var trainStartPretty = moment.unix(trainStart).format("HH:MM");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainMinutes = moment().diff(moment.unix(trainStart, "X"), "months");
  console.log(trainMinutes);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + nameSnap + "</td><td>" + destSnap + "</td><td>" +
  trainStartPretty + "</td><td>" + freqSnap + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
