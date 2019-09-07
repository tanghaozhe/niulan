var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var staffSchema = new Schema({
  "name":String,
  "staffId":String,
  "password":String,
  "confirmed":String,
  "staffJob":String,
  "hourlyWage":String,
  "workhour":String,
  "commute":String,
  "expences":String,
  "bonus":String,
  "workTime":[
    {
      "index":String,
      "date":String,
      "startTime":String,
      "endTime":String,
      "restTime":String,
      "checkInTime":String,
      "checkOutTime":String
    }
  ]
});

module.exports = mongoose.model('Staff',staffSchema);
