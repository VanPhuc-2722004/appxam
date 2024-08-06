const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hoaDonChiTietSchema = new Schema({
  IDHoaDonChiTiet: {
    type: String,
    required: true,
    unique: true
  },
  ID_HoaDon: {
    type: String,
    required: true
  },
  ID_SanPham: {
    type: String,
    required: true
  },
  SoLuong: {
    type: Number,
    required: true
  },
  ThanhTien: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const HoaDonChiTiet = mongoose.model('HoaDonChiTiet', hoaDonChiTietSchema);

module.exports = HoaDonChiTiet;
