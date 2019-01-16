var express = require("express");
var app = express();
var PORT = 8080; // default port 8080

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

generateRandomString = () => Math.random().toString(36).substring(2, 8)






app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // debug statement to see POST parameters
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  let templateVars = { longURL: req.body.longURL, shortURL: shortURL }
  // res.send(templateVars);
  res.redirect(301, `urls/${shortURL}`);
  console.log(urlDatabase);      // Respond with 'Ok' (we will replace this)
});


// app.get("/urls.json", (req, res) => {
//   res.json(urlDatabase);
// });



// app.get("/hello", (req, res) => {
//   let templateVars = { greeting: 'Hello World!' };
//   res.render("hello_world", templateVars);
// });


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});








