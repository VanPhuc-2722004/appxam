const express = require('express');
const router = express.Router();
const SanPham = require('../models/sanpham');
const Loai = require('../models/loai');

// Add a new product
router.post('/add', async (req, res) => {
    try {
        const { ten_san_pham, gia, img, rating, _id_loai } = req.body;

        console.log('Received request body:', req.body); // In ra request body để kiểm tra
        console.log('Loai model:', Loai); // In ra model Loai để kiểm tra

        const loai = await Loai.findById(_id_loai);
        if (!loai) {
            return res.status(400).json({ message: 'Loại sản phẩm không tồn tại' });
        }

        const newSanPham = new SanPham({
            ten_san_pham,
            gia,
            img,
            rating,
            _id_loai
        });

        await newSanPham.save();

        res.status(201).json({ message: 'Thêm sản phẩm thành công', sanpham: newSanPham });
    } catch (error) {
        console.error(error); // In lỗi ra console để kiểm tra
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});

// Get list of products
router.get('/', async (req, res) => {
    try {
        const sanphams = await SanPham.find().populate('_id_loai', 'ten_loai');
        res.status(200).json(sanphams);
    } catch (error) {
        console.error(error); // In lỗi ra console để kiểm tra
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});
router.get('/phanloaisp', async (req, res) => {
    try {
        // Lấy danh sách các loại sản phẩm
        const loais = await Loai.find();

        // Tạo một object để chứa các sản phẩm được phân loại
        const groupedProducts = {};

        // Lặp qua từng loại sản phẩm và lấy danh sách sản phẩm tương ứng
        for (const loai of loais) {
            const sanphams = await SanPham.find({ _id_loai: loai._id });

            groupedProducts[loai.ten_loai] = sanphams;
        }

        res.status(200).json(groupedProducts);
    } catch (error) {
        console.error(error); // In lỗi ra console để kiểm tra
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});
// Endpoint để lấy danh sách sản phẩm theo id_loai
router.get('/phanloai/:id_loai', async (req, res) => {
    try {
        const { id_loai } = req.params;

        // Tìm tất cả sản phẩm với _id_loai tương ứng
        const sanphams = await SanPham.find({ _id_loai: id_loai });

        // Kiểm tra xem có sản phẩm không
        if (sanphams.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
        }

        res.status(200).json(sanphams);
    } catch (error) {
        console.error(error); // In lỗi ra console để kiểm tra
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});


module.exports = router;
