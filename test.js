const _ = require('lodash')

let myArray = [
    { email: "caio.majdalani@gmail.com" },
    { email: "caio.teste@gmail.com" }
]
let grouppedArray = _.groupBy(myArray, 'email')
console.log(grouppedArray)