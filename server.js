// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", function (request, response) {
   response.json(quotes);
});


app.get("/quotes/random", function (request, response) {
  response.json(pickFromArray(quotes));
});

app.get("/search", function(request, response) {
  let term = request.query.term;
  let quoteHas = request.query.quotehas;  
  let authorHas = request.query.authorhas;  
  (quoteHas && authorHas) ? response.json(quotes.filter(item => item.quote.toLowerCase().includes(quoteHas.toLowerCase()) && 
  item.author.toLowerCase().includes(authorHas.toLowerCase()))):
  quoteHas ?  response.json(quotes.filter(item => item.quote.toLowerCase().includes(quoteHas.toLowerCase()))):  
  authorHas ? response.json(quotes.filter(item => item.author.toLowerCase().includes(authorHas.toLowerCase()))):
  response.json(quotes.filter(item => item.quote.toLowerCase().includes(term.toLowerCase()) || 
  item.author.toLowerCase().includes(term.toLowerCase())));
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
//app.listen(3000, () => console.log("Server is listening on port 3000. !"));