const express = require('express');
const helmet = require('helmet');

const usersRouter = require("../users/users-router.js");
const authRouter = require('../auth/auth-router.js');
const protected = require('../auth/protected-mw.js');

const server = express();

server.use(express.json());
server.use(helmet()) 

server.use("/api/auth", authRouter);
server.use("/api/users", protected, usersRouter);

server.get('/', ( req, res ) => {
  res.status(200).json({ serverMessage: 'Test base endpoint'});
});

module.exports = server;