var mongoose = require('mongoose');

var sinhvienSchema = new mongoose.Schema({
  mssv: String,
  hoTen: String,
  lop: String,
  dtb: Number
});

module.exports = mongoose.model('SinhVien', sinhvienSchema);
