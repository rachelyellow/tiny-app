const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const PORT = 8080; // default port 8080
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.set('view engine', 'ejs');


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};


const users = {

  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },

  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }

}

generateRandomString = () => Math.random().toString(36).substring(2, 8)


app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls", (req, res) => {

  let templateVars = {
    urls: urlDatabase,
    username: req.cookies["username"]
  };

  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {

  let templateVars = {
  username: req.cookies["username"]
  };

  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {

  let templateVars = {
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id],
    username: req.cookies["username"]
  };

  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;

  let templateVars = {
    longURL: req.body.longURL,
    shortURL: shortURL
  }

  res.redirect(`/urls/${shortURL}`);
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.post("/urls/:id/delete", (req, res) => {
  let shortURL = req.params.id;
  delete urlDatabase[shortURL];
  res.redirect('/urls');
});

app.get(`/urls/:id/edit`, (req, res) => {
  res.redirect(`/urls/${req.params.id}`);
});


app.post("/urls/:id/edit", (req, res) => {
  urlDatabase[req.params.id] = req.body.longURL;
  res.redirect('/urls');
});

app.post("/login", (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/urls');
});

app.post("/logout", (req, res) => {
  res.clearCookie('username');
  res.redirect('urls');
});

app.get("/register", (req, res) => {
  res.render("register-user");
});

app.post("/register", (req, res) => {
  if (req.body.email === '' || req.body.password === '') {

    res.status(400).send('Invalid input!');

  } else {

    for (user in users) {

      if (users[user]['email'] === req.body.email) {

        res.status(400).send('User already registered!');

      }
    }

      const newId = generateRandomString();

      users[newId] = {
        id: newId,
        email: req.body.email,
        password: req.body.password
      };

      res.cookie('user_id', users[newId]['id']);
      res.redirect('/urls');

  }
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});








