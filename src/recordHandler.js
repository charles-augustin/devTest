const RecordProcessor = require ('./RecordProcessor');
const {readFile, writeFile} = require ('./utils/common');
const {
  computeSpread,
  computeSpreadToCurve,
} = require ('./spreadCurveCalculator');

exports.handle = async (inputFilePath, outputFilePath) => {
  let inputData;

  try {
    inputData = await readFile (inputFilePath);
  } catch (error) {
    console.log (error);
  }

  if (inputData) {
    let recordProcessor = new RecordProcessor (inputData);

    if (recordProcessor.validateRecord ()) {
      let corporateRecords = recordProcessor.filter ('corporate');
      let governmentRecords = recordProcessor.filter ('government');

      //compute and print yield to spread - challenge 1
      let spreadBenchMarkArray = computeSpread (
        corporateRecords,
        governmentRecords
      );

      console.log ('-----------Yield Spread---------');
      console.log ('bond,benchmark,spread_to_benchmark');
      spreadBenchMarkArray.forEach (record => {
        console.log (
          `${record.bond},${record.benchmark},${record.spread_to_benchmark}`
        );
      });

      //compute and print spread to curve - challenge 2
      let spreadCurveArray = computeSpreadToCurve (
        corporateRecords,
        governmentRecords
      );

      console.log ('');
      console.log ('-----------Spread Curve---------');
      console.log ('bond,spread_to_curve');
      spreadCurveArray.forEach (record => {
        console.log (`${record.bond},${record.spread_to_curve}`);
      });

      // write to local file
      let result = {
        data1: spreadBenchMarkArray,
        data2: spreadCurveArray,
      };
      writeFile (outputFilePath, JSON.stringify (result));
      console.log("--------------------");
      console.log("");
      console.log("Writing to file.. please check output folder for results");
    } else {
      throw new Error ('Records are invalid');
    }
  } else {
    throw new Error ('Input file does not contain data');
  }
};
