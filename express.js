const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fs = require('fs');

const ExpressError = require('./expressError');
const { checkResult, getMean, getMedian, getMode } = require('./helpers');
let SAVE_FILE = true;


app.get('/mean', (req, res, next) => {
    try {
        let result = getMean(req.query.nums);

        let result_content = {
            "operation": "mean",
            "value": checkResult(result)
        }
        
        if(req.query.save){
            let save_value = req.query.save;
            SAVE_FILE = save_value.toLowerCase() == 'true' ? true : false;
        }
        if(SAVE_FILE){
            fs.appendFile('./results.json', JSON.stringify(result_content), 'utf8', (err) => {
                if (err){
                    throw new ExpressError("File write failed", 400);
                }
            });
        }
        
        return res.send(result_content);
    } catch (err){
        return next(err);
    }
});

app.get('/median', (req, res, next) => {
    try {
        let result = getMedian(req.query.nums);
        return res.send({
            "operation": "median",
            "value": checkResult(result)
        });
    } catch (err){
        return next(err);
    }
});

app.get('/mode', (req, res, next) => {
    try {
        let result = getMode(req.query.nums);
        return res.send({
            "operation": "mode",
            "value": checkResult(result)
        });
    } catch (err){
        return next(err);
    }
});

app.get('/all', (req, res, next) => {
    try {
        let result_mean = getMean(req.query.nums);
        let result_median = getMedian(req.query.nums);
        let result_mode = getMode(req.query.nums);
        
        return res.send({
            "operation": "all",
            "mean": checkResult(result_mean),
            "median": checkResult(result_median),
            "mode": checkResult(result_mode)
        });
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