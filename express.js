const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ExpressError = require('./expressError');
const { checkResult, getMean, getMedian, getMode } = require('./helpers');


app.get('/mean', (req, res, next) => {
    try {
        let result = getMean(req.query.nums);
        return res.send(checkResult("mean", result));
    } catch (err){
        return next(err);
    }
});

app.get('/median', (req, res, next) => {
    try {
        let result = getMedian(req.query.nums);
        return res.send(checkResult("median", result));
    } catch (err){
        return next(err);
    }
});

app.get('/mode', (req, res, next) => {
    try {
        let result = getMode(req.query.nums);
        return res.send(checkResult("mode", result));
    } catch (err){
        return next(err);
    }
});

// 404 handler
app.use((req, res, next) => {
    const e = new ExpressError("Not Found", 404);
    return next(e);
});

app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
        error: {message, status}
    });
});

app.listen(3000, () => {
    console.log('App runing on port 3000');
});