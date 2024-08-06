const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    TenNguoiDung: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    Sdt: { type: String },
    Diachi: { type: String },
    Email: { type: String, required: true, unique: true },
    

    MatKhau: { type: String, required: true },

});



module.exports = mongoose.model('User', userSchema);
