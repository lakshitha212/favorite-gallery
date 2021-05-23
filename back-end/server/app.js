import createError from 'http-errors'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import indexRouter from './routes/index'
import cors from 'cors';
import {
  postTest,
  postEntries,
  postEntry
} from './controllers'
import makeCallback from './express-callback'

dotenv.config()
var app = express()

app.use(cors())

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)
// app.get('/create-test', makeCallback(postTest))
app.post('/get-entries', makeCallback(postEntries))
app.post('/update-entry', makeCallback(postEntry))


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
