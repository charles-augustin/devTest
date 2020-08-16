const recordHandler = require('./src/recordHandler');

if (process.argv.length < 4 )
{
    console.log("Invalid arguments");
    return;
}

let args = process.argv.slice(2);
const inputFileLocation = args[0];
const outputFileLocation = args[1];

recordHandler.handle(inputFileLocation, outputFileLocation);



