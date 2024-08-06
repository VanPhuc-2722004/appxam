const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    id_san_pham:{
        type: String,
        required: true,
        trim: true,
        ref: 'sanpham'
    },
    ten_model: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    so_luong: {
        type: Number,
    },
});

module.exports = mongoose.model('Model', modelSchema);
