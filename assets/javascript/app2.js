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
  $("#train-btn").on("click", function() {
 
  // setting variables for input fields
  var trainName = $("#train-name").val().trim();
  var trainDest = $("#destination").val().trim();
  var trainStart = $("#first-train").val().trim();
  var trainFreq = $("#frequency").val().trim();

  database.ref().push({
    train:trainName,
    place:trainDest,
    start:trainStart,
    howOften:trainFreq,
  });

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

// 3. Create Firebase event for adding train to the database, and a row into the table
database.ref().on("value", function(childSnapshot){

  console.log(childSnapshot.val());

  // store everything into a variable
  var nameSnap = childSnapshot.val().train;
  var destSnap = childSnapshot.val().place;
  var startSnap = childSnapshot.val().start;
  var freqSnap = childSnapshot.val().howOften;

    // console.log Train Info
  console.log(nameSnap);
  console.log(destSnap);
  console.log(trainStart);
  console.log(freqSnap);
})
