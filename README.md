# *Code Challenge - Spread Benchmark and Spread Curve calculation*

## Directory Structure
    .   
    ├── input                        # Contains sample input for execution
    ├── output                       # Contains sample output for reference
	├── src                          # Contains all modules for calculation 
    ├── test                         # Contains test components of all source files
    ├── index.js                     # Entry point of application
    └── README.md

## Prerequisites :

### Node JS installation

Please install Node JS to run the application. `https://nodejs.org/en/download/`


## How to run the application

**Node command line execution** - Run `npm install` to install all dependencies followed by `npm run start "inputFilePath" "outputFilePath"` to execute the application.

Note: Path parameters are configured to absolute path. eg: `npm run start "C:\Users\charl\Desktop\devTest\input\sample_input.csv" "C:\Users\charl\Desktop\devTest\output\sampleOutput.json"`

inputFile- CSV format
outputFile - JSON format

## How to run the test suite

Run `npm run test` to execute test suite and will display test results in command line.

Test framework - Chai, Mocha

## Design choices

- I chose Node JS to develop this application as it runs faster than traditional languages and it is easier to maintain due to its wide developer community support.

## Code organization

- Applied SOLID principles to develop individual components. This helps make the app cleaner, easier to read and maintain.

## Reusability

- Created a common utils file with repeated functions that can be resued across the application.

## Coding Standard & Formatting

- Class components are named in TitleCase and other files are named in camelCase format.

- Used prettier for formatting java script code.

- Followed Google coding standard.

## Validation

- Proper test suite is created to test method behaviour independently using chai and mocha frameworks and automatically.

## Improvement

- Could not add more test coverage due to time constraint. Would like to cover more test cases if given additional time.