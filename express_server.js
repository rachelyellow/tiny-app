const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const express = require("express");
const PORT = 8080; // default port 8080
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['abcdef'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.set('view engine', 'ejs');


const urlDatabase = {
  userRandomID: {
    "b2xVn2": "http://www.lighthouselabs.ca",
    "9sm5xK": "http://www.google.com",
  }
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

urlsForUser = (id) => urlDatabase[id]


app.get("/", (req, res) => {
  res.redirect('/login');
});

app.get("/urls", (req, res) => {


  let templateVars = {
    urls: urlDatabase[req.session.user_id],
    user: users[req.session.user_id],
    'user_id': req.session.user_id
  };

  //ignore existing cookies if they don't correspond with a user in user database
  if (users[req.session.user_id] === undefined) {
    res.send('Please log in or register.');
  } else {
    res.render("urls_index", templateVars);
  }
});

app.get("/urls/new", (req, res) => {

  let templateVars = {
    user: users[req.session.user_id],
    'user_id': req.session.user_id
  };

  //ignore existing cookies if they don't correspond with a user in user database
  if (users[req.session.user_id] === undefined) {
    res.redirect('/login');
  } else {
    res.render("urls_new", templateVars);
  }

});


app.get("/urls/:id", (req, res) => {

  let urlsUser = urlsForUser(req.session.user_id);

  //checks if user is logged in
  if (urlsUser)
  {
    //checks if the url belongs to the user logged in
    if (req.params.id in urlsUser)
    {
       let templateVars = {
        shortURL: req.params.id,
        longURL: urlsUser[req.params.id],
        user_id: req.session.user_id,
        user: users[req.session.user_id]
      };
      return res.render("urls_show", templateVars);
    }
  }
  res.status(403).send('Invalid link.');
});

app.get("/u/:shortURL", (req, res) => {

  for (let username in urlDatabase) {
    for (let key in urlDatabase[username]) {
      if (req.params.shortURL in urlDatabase[username]) {
        res.redirect(urlDatabase[username][req.params.shortURL]);
     }
    }
  }
  res.status(403).send('The link you requested is invalid, or expired.');
});

app.get(`/urls/:id/edit`, (req, res) => {
  res.redirect(`/urls/${req.params.id}`);
});



app.post("/urls", (req, res) => {
  let shortURL = generateRandomString();
  urlDatabase[req.session.user_id][shortURL] = req.body.longURL;
  let templateVars = {
    longURL: req.body.longURL,
    shortURL: shortURL
  }

  res.redirect('/urls');
});

app.post("/urls/:id/delete", (req, res) => {
  let shortURL = req.params.id;
  delete urlDatabase[req.session.user_id][shortURL];
  res.redirect('/urls');
});


app.post("/urls/:id/edit", (req, res) => {
  if (req.params.id in urlsForUser(req.session.user_id)) {
    urlDatabase[req.session.user_id][req.params.id] = req.body.longURL;
    res.redirect('/urls');
  } else {
    res.status(403).send('Invalid link.');
  }
});

app.get("/register", (req, res) => {
  res.render("register-user");
});

app.get("/login", (req, res) => {
  req.session = null;
  res.render('user_login');
});

app.post("/login", (req, res) => {

  for (user in users) {
    let userEmail = users[user]['email'];
    let userPassword = users[user]['password'];
    if (req.body.email === userEmail && bcrypt.compareSync(req.body.password, userPassword)) {
      req.session.user_id = users[user]['id'];
      res.redirect('/urls/new');
    }
  }
    res.status(403).send('Invalid username and password combination.');
  });

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect('urls');
});

app.post("/register", (req, res) => {
  if (req.body.email === '' || req.body.password === '') {

    res.status(400).send('Invalid input!');

  } else {

    for (user in users) {

      if (users[user]['email'] === req.body.email) {

        res.status(400).send('User already registered. Please log in.');

      }
    }

      const newId = generateRandomString();

      users[newId] = {
        id: newId,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      };

      urlDatabase[newId] = {};
      req.session.user_id = users[newId]['id'];
      res.redirect('/urls/new');

  }
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});








