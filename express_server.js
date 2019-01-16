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
  console.log(req.body);
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // debug statement to see POST parameters
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  let templateVars = { longURL: req.body.longURL, shortURL: shortURL }
  res.redirect(`/urls/${shortURL}`);
  console.log(urlDatabase);
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  console.log(longURL);
  res.redirect(longURL);
});

app.post("/urls/:id/delete", (req, res) => {
  let shortURL = req.params.id;
  delete urlDatabase[shortURL];
  res.redirect('/urls');
  console.log(urlDatabase);
});

app.get(`/urls/:id/edit`, (req, res) => {
  res.redirect(`/urls/${req.params.id}`);
});



app.post("/urls/:id/edit", (req, res) => {
  // console.log(newLongURL);
  urlDatabase[req.params.id] = req.body.longURL;
  res.redirect('/urls');
  // console.log(urlDatabase);
});




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});








