// links=[1,2,3]

WAITMSG=1000
var async = require('async');


// This function waits for 'number' seconds, then calls cb(null, number)
var f = function (tt) {
    setTimeout(function () {
       // cb(null, tt)
       console.log(tt)
    }, arr.indexOf(tt) * WAITMSG)
}

arr=['1', '2', '3', '10']
async.map(arr, f, function (err, results) {
    console.log(results); // [4, 3, 2, 1]
})




