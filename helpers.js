/*
* JS with all functions to calculate the mean, median and mode
*/
const ExpressError = require('./expressError');
const fs = require('fs');

function checkResult(result){
    if(result != 0){
        return result;
    }else{
        throw new ExpressError("'nums' are required", 400);
    }
}

function getNumbers(arr){
    let numbers_s = arr.split(',');
    let numbers = numbers_s.map(x => parseInt(x));
    numbers.forEach(function (value, idx){
        if(isNaN(value)){
            throw new ExpressError(`'${numbers_s[idx]}' is not a number`, 400);
        }
    });  
    return numbers;
}

function getMean(arr){
    if(arr){
        let numbers = getNumbers(arr);
        let sum = 0;
        numbers.forEach(value => sum += value);
        
        return sum / numbers.length;
    }else{
        return 0;
    }
}

function getMedian(arr){
    if(arr){
        let numbers = getNumbers(arr);

        const median = arr => {
            let middle = Math.floor(arr.length / 2);
            arr = [...arr].sort((a, b) => a - b);
            return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
        };

        return median(numbers);
    }else{
        return 0;
    }
}

function getMode(arr){
    if(arr){
        let numbers_all = getNumbers(arr);
        let numbers_basic = [...new Set(numbers_all)];
        let number_high = 0;
        let number_high_times = 0;
        let number_times = 0;

        for(let i = 0; i < numbers_basic.length; i++){
            numbers_all.forEach(value => {
                if(value == numbers_basic[i]){
                    number_times++;
                }
            });

            if(number_times > number_high_times){
                number_high_times = number_times;
                number_high = numbers_basic[i];
            }
            number_times = 0;
        }

        return number_high;
    }else{
        return 0;
    }
}

function checkSaveFile(option){
    let save_value = option.toLowerCase() == 'true' ? true : false;
    return save_value;
}

function appendFile(content){
    const currentDate = new Date().toUTCString();
    let new_content = `${currentDate} \n ${content} \n \n`;
    fs.appendFile('./results.json', new_content, 'utf8', (err) => {
        if (err){
            throw new ExpressError("File write failed", 400);
        }
    });
}

module.exports = {
    checkResult,
    getMean,
    getMedian,
    getMode,
    checkSaveFile,
    appendFile
};