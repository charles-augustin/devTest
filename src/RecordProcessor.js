class RecordProcessor {
  // Initialize the records object
  constructor (input) {
    this.records = input;
  }

  validateRecord () {
    if (this.filter ('corporate').length == 0 || this.filter ('government').length == 0)  {
      return false;
    }
    return true;
  }

  filter (type) {
    return this.filterRecordByType (type);
  }

  filterRecordByType (type) {
    return this.records.filter (record => {
      return record.type === type;
    });
  }
  
}

module.exports = RecordProcessor;
