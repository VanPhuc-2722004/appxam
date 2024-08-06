const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loaiSchema = new Schema({
    ten_loai: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
}, { timestamps: true });

const Loai = mongoose.models.Loai || mongoose.model('Loai', loaiSchema);

module.exports = Loai;
