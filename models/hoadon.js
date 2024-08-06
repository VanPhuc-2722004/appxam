const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hoaDonSchema = new Schema({
  IDHoaDon: {
    type: String,
    required: true,
    unique: true
  },
  ID_NguoiDung: {
    type: String,
    required: true
  },
  TongTien: {
    type: Number,
    required: true
  },
  ThoiGian: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

const HoaDon = mongoose.model('HoaDon', hoaDonSchema);

module.exports = HoaDon;
