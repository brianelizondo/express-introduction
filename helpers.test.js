/*
* Unit tests for mean, median and mode
*/

const { getMean, getMedian, getMode } = require('./helpers');

describe("MEAN function", function (){
    test("get query key of 'nums' and return the result number", function (){
        let mean = getMean("1,3,5,7");
        expect(mean).toEqual(4);
    });
    test("without passing any nums", function (){
        let mean = getMean("");
        expect(mean).toEqual(0);
    });
});

describe("MEDIAN function", function (){
    test("get query key of 'nums' and return the result number", function (){
        let mean = getMedian("1,3,5,7,10");
        expect(mean).toEqual(5);
    });
    test("without passing any nums", function (){
        let mean = getMedian("");
        expect(mean).toEqual(0);
    });
});

describe("MODE function", function (){
    test("get query key of 'nums' and return the result number", function (){
        let mean = getMode("1,3,5,5,7,7,7,10");
        expect(mean).toEqual(7);
    });
    test("without passing any nums", function (){
        let mean = getMode("");
        expect(mean).toEqual(0);
    });
});