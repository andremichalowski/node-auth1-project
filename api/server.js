const express = require('express');
const helmet = require('helmet');
const session = require('express-session');

const usersRouter = require("../users/users-router.js");
const authRouter = require('../auth/auth-router.js');
const protected = require('../auth/protected-mw.js');

const server = express();

const sessionConfiguration = { // 2. CONFIGURE
	name: 'monster', //defaults to sid 
	secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
  cookie: {
    httpOnly: true, // true means JS can't access the cookie data
		maxAge: 1000 * 60 * 10, // expires after 10 mins
		secure: process.env.SECURE_COOKIES || false, //true meaning send cookies over https onlyd
  },
	resave: false, // re save the session information even if there are no changes
	saveUninitialized: true, // read about GDPR compliance
}

server.use(express.json());
server.use(helmet()) 
server.use(session(sessionConfiguration));

server.use("/api/auth", authRouter);
server.use("/api/users", protected, usersRouter);

server.get('/', ( req, res ) => {
  res.status(200).json({ serverMessage: 'Test base endpoint'});
});

module.exports = server;