const express = require('express');
const router = express.Router();
const Loai = require('../models/loai'); // Import model Loai

// Route thêm loại mới
router.post('/add', async (req, res) => {
    const { ten_loai } = req.body;

    try {
        // Kiểm tra xem tên loại đã tồn tại chưa
        const existingLoai = await Loai.findOne({ ten_loai });
        if (existingLoai) {
            return res.status(400).json({ status: false, message: 'Loại đã tồn tại!' });
        }

        // Tạo loại mới
        const newLoai = new Loai({
            ten_loai
        });

        // Lưu loại vào cơ sở dữ liệu
        await newLoai.save();

        return res.status(201).json({
            status: true,
            message: 'Thêm loại thành công!',
            loai: newLoai
        });
    } catch (error) {
        console.error('Lỗi khi thêm loại:', error);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

module.exports = router;
