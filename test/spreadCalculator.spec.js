const chaiLib = require ('chai');

const {
  findNearestMinSpread,
  calculateYieldSpread,
  computeSpread,
} = require ('../src/spreadCurveCalculator');

const {fetchDecimalFromString} = require('../src/utils/common')

let should = chaiLib.should ();

describe ('Spread Calculator', () => {
  describe ('Fetch decimal from string', () => {
    it ('should return decimal only value', () => {
      // Acts
      let result = fetchDecimalFromString ('123.0 abc');

      // Assert
      should.exist (result);
      result.should.eql (123.0);
    });
  });
  describe ('Nearest minimum bond', () => {
    let governmentRecords, corporateTerm;
    before (() => {
      governmentRecords = [
        {
          bond: 'g1',
          type: 'government',
          term: '9.4 years',
          yield: '3.70%',
        },
        {
          bond: 'g2',
          type: 'government',
          term: '10.2 years',
          yield: '1.70%',
        },
        {
          bond: 'g3',
          type: 'government',
          term: '9.6 years',
          yield: '3.70%',
        },
      ];
      corporateTerm = '10.3 years';
    });

    it ('should return min value based on governmentRecords when term is greater than corporateTerm', () => {
      // Act
      let result = findNearestMinSpread (governmentRecords, corporateTerm);

      // Assert
      should.exist (result);
      result.should.eql (governmentRecords[1]);
    });

    before (() => {
      governmentRecords = [
        {
          bond: 'g1',
          type: 'government',
          term: '9.4 years',
          yield: '3.70%',
        },
        {
          bond: 'g2',
          type: 'government',
          term: '10.2 years',
          yield: '1.70%',
        },
        {
          bond: 'g3',
          type: 'government',
          term: '9.6 years',
          yield: '3.70%',
        },
      ];
    });
    corporateTerm = '10.3 years';

    it ('should return min value based on governmentRecords when term is nearest less than corporateTerm', () => {
      // Actual
      let result = findNearestMinSpread (governmentRecords, corporateTerm);

      // Assert
      should.exist (result);
      result.should.eql (governmentRecords[1]);
    });
  });

  describe ('Calculate yield spread', () => {
    it ('should return yield spread value', () => {
      // Acts
      let result = calculateYieldSpread ('23.40', '45.80');

      // Assert
      should.exist (result);
      result.should.eql ('22.40');
    });
  });
});
