const express = require('express')
const path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let tables = [
  {name: "Daniel",
  phone: "1234567890",
  email: "daniel@daniel.com",
  customerID: 1},
  {name: "eric",
  phone: "1555567890",
  email: "eric@meric.com",
  customerID: 2},
  {name: "sam",
  phone: "9999999999",
  email: "sam@sam.com",
  customerID: 3},
  {name: "anna",
  phone: "1234567890",
  email: "anna@anna.com",
  customerID: 4},
  {name: "samsung",
  phone: "1555567890",
  email: "samsung@samsung.com"
  }];


app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all reservations in tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// // Displays a single character, or returns false
// app.get("/api/reserve", function(req, res) {
//   let chosen = req.params.character;

//   console.log(chosen);

//   for (let i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

// reserve API call
app.post('/api/tables', function (req, res) {
	console.log('reserve request submitted');
	console.log(req.body);

  let newReservation = req.body;

  tables.push(newReservation);

  // Check if user is in the first 4 in list
  let isBooked;
  if(tables.length <= 4){
    isBooked = true;
  }
  else{
    isBooked = false;
  }

  res.json(isBooked);

});


app.post('/api/clear', function (req, res) {
  console.log('clear all tables');
  tables = [];
  res.sendFile(path.join(__dirname, 'app/tables.html'));
});

app.post('/api/reserve', function (req, res) {
  console.log(req.body.id);

  tables.splice(req.body.id, 1);
  res.json(tables);
});


app.listen(PORT, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on port ${PORT}.`)
})
