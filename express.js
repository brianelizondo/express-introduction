const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ExpressError = require('./expressError');
const { checkResult, getMean, getMedian, getMode, checkSaveFile, appendFile } = require('./helpers');
let SAVE_FILE = true;


app.get('/mean', (req, res, next) => {
    try {
        let result = getMean(req.query.nums);

        let result_content = {
            "operation": "mean",
            "value": checkResult(result)
        }
        
        if(req.query.save){ SAVE_FILE = checkSaveFile(req.query.save); }
        if(SAVE_FILE){ appendFile(JSON.stringify(result_content)); }
        
        return res.send(result_content);
    } catch (err){
        return next(err);
    }
});

app.get('/median', (req, res, next) => {
    try {
        let result = getMedian(req.query.nums);

        let result_content = {
            "operation": "median",
            "value": checkResult(result)
        };

        if(req.query.save){ SAVE_FILE = checkSaveFile(req.query.save); }
        if(SAVE_FILE){ appendFile(JSON.stringify(result_content)); }
        
        return res.send(result_content);
    } catch (err){
        return next(err);
    }
});

app.get('/mode', (req, res, next) => {
    try {
        let result = getMode(req.query.nums);
        
        let result_content = {
            "operation": "mode",
            "value": checkResult(result)
        };

        if(req.query.save){ SAVE_FILE = checkSaveFile(req.query.save); }
        if(SAVE_FILE){ appendFile(JSON.stringify(result_content)); }
        
        return res.send(result_content);
    } catch (err){
        return next(err);
    }
});

app.get('/all', (req, res, next) => {
    try {
        let result_mean = getMean(req.query.nums);
        let result_median = getMedian(req.query.nums);
        let result_mode = getMode(req.query.nums);
        
        let result_content = {
            "operation": "all",
            "mean": checkResult(result_mean),
            "median": checkResult(result_median),
            "mode": checkResult(result_mode)
        };

        if(req.query.save){ SAVE_FILE = checkSaveFile(req.query.save); }
        if(SAVE_FILE){ appendFile(JSON.stringify(result_content)); }
        
        return res.send(result_content);
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