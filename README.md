# TinyApp Project

TinyApp is a full stack application built with Node and Express that allows users to shorten long URLs.

## Expected Usage

Users must create an account with an email and password in order to use TinyApp services. Once an account is created, the user can submit a URL and the website will return a shortened link which will redirect to the original given path. Users can store an unlimited number of links on their account that can be accessed every time they log in. These shortened links can be shared with anyone, but only their owner can make changes or delete them.

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development wed server using the `node express_server.js` command.