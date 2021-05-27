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
  postEntries,
  postEntry,
  rearrangeEntries,
  readUser,
  fetchFavorites
} from './controllers'
import makeCallback from './express-callback'


dotenv.config()
var app = express()

app.use(cors())
app.use(compression());
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../public')))
app.use(morgan("combined", { stream: accessLogStream }));
app.use('/', indexRouter)

app.get('/get-entries', makeCallback(postEntries))
app.put('/update-entry', makeCallback(postEntry))
app.post('/sort-entries', makeCallback(rearrangeEntries))
app.post('/get-user', makeCallback(readUser))
app.get('/get-favorites', makeCallback(fetchFavorites))


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
  res.render('error');
});

export default app;
