var address = require('./Logs.json');
//console.log(address);
var address1 = require('./logs1.json')

console.log(address);
console.log(address1.ipAddress);

var data1 = JSON.stringify([address[0], 1122312312312]);

var fs = require('fs');
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const jsonContent = JSON.stringify(alphabet);

fs.writeFile("./alphabet.json", jsonContent, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
fs.writeFile("./alphabet.json", data1, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 