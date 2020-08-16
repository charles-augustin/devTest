const csv = require ('csvtojson');
const fs = require('fs');

exports.readFile = async function (inputFilePath) {
  try {
    const jsonData = await csv ().fromFile (inputFilePath);
    return jsonData;
  } catch (err) {
    throw err;
  }
};

exports.writeFile = function(filePath, data){
  try {
      if (!fs.existsSync(filePath)) {
          console.log("output folder doesn't exists, creating");
          const outputFolder = path.parse(filePath).dir;
          fs.mkdirSync(outputFolder);
      }
      fs.writeFileSync(filePath, data);
  } catch (error) {
      throw error;
  }
}

exports.fetchDecimalFromString = input => {
  return parseFloat (input.match (/[0-9]+\.?[0-9]+/));
};

exports.sortArrayAsc = records => {
  return records.sort ((prevRecord, currentRecord) => {
    let prevTerm = this.fetchDecimalFromString (prevRecord.term);
    let currentTerm = this.fetchDecimalFromString (currentRecord.term);
    return prevTerm - currentTerm;
  });
};

exports.sortArrayDesc = records => {
  return records.sort ((prevRecord, currentRecord) => {
    let prevTerm = this.fetchDecimalFromString (prevRecord.term);
    let currentTerm = this.fetchDecimalFromString (currentRecord.term);
    return currentTerm - prevTerm;
  });
};
