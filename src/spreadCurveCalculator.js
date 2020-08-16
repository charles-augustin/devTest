const _ = require ('underscore');

const {
  fetchDecimalFromString,
  sortArrayDesc,
  sortArrayAsc,
} = require ('./utils/common');

exports.findNearestMinSpread = (governmentRecords, corporateTerm) => {
  const corporateDerived = fetchDecimalFromString (corporateTerm);
  const nearestMinimum = _.min (governmentRecords, record => {
    return Math.abs (corporateDerived - fetchDecimalFromString (record.term));
  });
  return nearestMinimum;
};

exports.findNearestMaxCurve = (governmentRecords, corporateTerm) => {
  const corporateDerived = fetchDecimalFromString (corporateTerm);
  const sortedGovernmentRecords = sortArrayAsc (governmentRecords);
  let nearestMaximum;
  for (let i = 0; i < sortedGovernmentRecords.length; i++) {
    if (
      fetchDecimalFromString (sortedGovernmentRecords[i].term) >=
      corporateDerived
    ) {
      nearestMaximum = sortedGovernmentRecords[i];
      break;
    }
  }
  return nearestMaximum;
};

exports.findNearestMinCurve = (governmentRecords, corporateTerm) => {
  const corporateDerived = fetchDecimalFromString (corporateTerm);
  const sortedGovernmentRecords = sortArrayDesc (governmentRecords);

  let nearestMinimum;
  for (let i = 0; i < sortedGovernmentRecords.length; i++) {
    if (
      fetchDecimalFromString (sortedGovernmentRecords[i].term) <=
      corporateDerived
    ) {
      nearestMinimum = sortedGovernmentRecords[i];
      break;
    }
  }
  return nearestMinimum;
};

exports.calculateYieldSpread = (corporateYield, governmentYield) => {
  let absoluteSpread = Math.abs (
    fetchDecimalFromString (corporateYield) -
      fetchDecimalFromString (governmentYield)
  );
  return absoluteSpread.toFixed (2);
};

exports.computeSpread = (corporateRecords, governmentRecords) => {
  let spreadArray = [];
  corporateRecords.forEach (corporateRecord => {
    let govRecord = this.findNearestMinSpread (
      governmentRecords,
      corporateRecord.term
    );

    const yieldSpread = this.calculateYieldSpread (
      corporateRecord.yield,
      govRecord.yield
    );

    spreadArray.push ({
      bond: corporateRecord.bond,
      benchmark: govRecord.bond,
      spread_to_benchmark: `${yieldSpread}%`,
    });
  });
  return spreadArray;
};

exports.calculateSpreadCurve = (
  governmentNearestMin,
  governmentNearestMax,
  corporateRecord
) => {
  let spreadToCurve;

  spreadToCurve =
    fetchDecimalFromString (governmentNearestMax.yield) +
    (fetchDecimalFromString (corporateRecord.term) -
      fetchDecimalFromString (governmentNearestMax.term)) *
      ((fetchDecimalFromString (governmentNearestMax.yield) -
        fetchDecimalFromString (governmentNearestMin.yield)) /
        (fetchDecimalFromString (governmentNearestMax.term) -
          fetchDecimalFromString (governmentNearestMin.term)));

  return spreadToCurve.toFixed (2);
};

exports.computeSpreadToCurve = (corporateRecords, governmentRecords) => {
  let spreadToCurveArray = [];
  corporateRecords.forEach (corporateRecord => {
    let governmentNearestMin, governmentNearestMax;
    governmentNearestMin = this.findNearestMinCurve (
      governmentRecords,
      corporateRecord.term
    );
    governmentNearestMax = this.findNearestMaxCurve (
      governmentRecords,
      corporateRecord.term
    );
    const yIntercept = this.calculateSpreadCurve (
      governmentNearestMin,
      governmentNearestMax,
      corporateRecord
    );
    let spreadCurve = (fetchDecimalFromString (corporateRecord.yield) -
      yIntercept).toFixed (2);
    spreadToCurveArray.push ({
      bond: corporateRecord.bond,
      spread_to_curve: `${spreadCurve}%`,
    });
  });
  return spreadToCurveArray;
};
