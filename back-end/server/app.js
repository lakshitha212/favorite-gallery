import createError from 'http-errors'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import bodyParser from 'body-parser'

import indexRouter from './routes/index'
import cors from 'cors';

import compression from "compression";

/**
 * Enable Loggin
 * Save log files in ../log
 */
import morgan from 'morgan'
const rfs = require("rotating-file-stream");

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "../log"),
});

import {
  getEntries,
  editEntry,
  rearrangeEntries,
  readUser,
  postUser
} from './controllers'
import makeCallback from './express-callback'
dotenv.config()
var app = express()
app.use(express.static('public'))
app.use(cors())
app.use(compression());
app.use(bodyParser.json())

app.use(morgan("combined", { stream: accessLogStream }));
app.use('/', indexRouter)
app.use('/static', express.static('public'))
app.get('/get-entries', makeCallback(getEntries))
app.put('/update-entry', makeCallback(editEntry))
app.post('/sort-entries', makeCallback(rearrangeEntries))
app.get('/get-user', makeCallback(readUser))
app.post('/create-user', makeCallback(postUser))


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.status(err.status).send({ error: err.message })
});

export default app;
