# TinyApp Project

TinyApp is a full stack application built with Node and Express that allows users to shorten long URLs.

## Final Product
!["Screenshot of Login page"](https://github.com/rachelyellow/tiny-app/blob/994c7c5e2a8e50191926ea2539191242eb4bef00/docs/TinyApp%20Login%20Screen.png?raw=true)

!["Screenshot of URLs page"](https://github.com/rachelyellow/tiny-app/blob/994c7c5e2a8e50191926ea2539191242eb4bef00/docs/Screenshot%20of%20URLS%20page.png?raw=true)


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