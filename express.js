const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function getNumbers(arr){
    let numbers_s = arr.split(',');
    let numbers = numbers_s.map(x => parseInt(x));  
    return numbers;
}

app.get('/mean', (req, res) => {
    let numbers = getNumbers(req.query.nums);

    let sum = 0;
    numbers.forEach(value => sum += value);
    
    let average = sum / numbers.length;
    
    return res.send({
        "operation": "mean",
        "value": average
    });
});

app.get('/median', (req, res) => {
    let numbers = getNumbers(req.query.nums);

    const median = arr => {
        let middle = Math.floor(arr.length / 2);
        arr = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
    };

    return res.send({
        "operation": "median",
        "value": median(numbers)
    });
});

app.get('/mode', (req, res) => {
    let numbers_all = getNumbers(req.query.nums);
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

    return res.send({
        "operation": "mode",
        "value": number_high
    });
});

app.listen(3000, () => {
    console.log('App runing on port 3000');
});