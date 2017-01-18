// Steps:
// 
// 1. Initialize Firebase
// 2. Create a way to retrieve train information from the database
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

	// referencing the database
	var database = firebase.database();
	console.log(database);

// 2. Button for adding Trains
$("#train-btn").on("click", function(event) {
  

  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var trainDest = $("#destination").val().trim();
  var trainStart = $("#first-train").val().trim();
  var trainFreq = $("#frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    "name": trainName,
    "destination": trainDest,
    "start": trainStart,
    "frequency": trainFreq
  };
  
  console.log(newTrain);
  
  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train time successfully added");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");

  // Prevents moving to new page
  event.preventDefault();
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("value", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var nameSnap = childSnapshot.val().name;
  var destSnap = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var freqSnap = childSnapshot.val().frequency;

  // Train Info
  console.log(nameSnap);
  console.log(destSnap);
  console.log(trainStart);
  console.log(freqSnap);

  // Prettify the Train start time
  var trainStartPretty = moment(nextTrain).format("hh:mm");

  // Calculate the Minutes Away using hardcore math
  var trainMinutes = moment().diff(moment(trainStart, "mm"), "minutes");
  console.log(trainMinutes);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + nameSnap + "</td><td>" + destSnap + "</td><td>" +
  trainStartPretty + "</td><td>" + freqSnap + "</td></tr>");
}), function(errorObject) {
	console.log("You didn't choo choo choose correctly!" + errorObject.code);

};


