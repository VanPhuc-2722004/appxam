const mongoose = require('mongoose');

const sanPhamSchema = new mongoose.Schema({
    ten_san_pham: { type: String, required: true },
    gia: { type: Number, required: true },
    img: { type: String },
    rating: { type: Number },
    _id_loai: { type: mongoose.Schema.Types.ObjectId, ref: 'Loai' } // Đảm bảo rằng _id_loai là ObjectId
});

const SanPham = mongoose.model('SanPham', sanPhamSchema);
module.exports = SanPham;
