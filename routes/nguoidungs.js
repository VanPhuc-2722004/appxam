const express = require('express');
const router = express.Router();
const User = require('../models/nguoidung');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const secretKey = 'phuc'; 

// Đăng ký
//http://localhost:3000/users/register
router.post('/register', async (req, res) => {
    const { TenNguoiDung, Email, MatKhau } = req.body;

    try {
        // Kiểm tra xem người dùng hoặc email đã tồn tại chưa
        const checkUser = await User.findOne({ $or: [{ TenNguoiDung: TenNguoiDung }, { Email: Email }] });
        if (checkUser) {
            return res.status(400).json({ status: false, message: 'Người dùng hoặc email đã tồn tại' });
        }

        // Tạo người dùng mới
        const newUser = new User({
            TenNguoiDung: TenNguoiDung,
            Email: Email,
            MatKhau: MatKhau
        });

        // Lưu người dùng vào cơ sở dữ liệu
        await newUser.save();

        return res.status(201).json({ status: true, message: 'Đăng ký thành công', user: newUser });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});

// Đăng nhập
//http://localhost:3000/nguoidungs//users/login
router.post('/login',async (req, res) => {
   
    const { TenNguoiDung, MatKhau } = req.body;

    try {
        const user = await User.findOne({ TenNguoiDung: TenNguoiDung, MatKhau: MatKhau});
        // res.status(200).json(user);
        if (!user) {
            return res.status(405).json({ status:false,message: 'Người dùng không tồn tại' });
        }

        const isMatch = await bcrypt.compare(MatKhau, user.MatKhau);
        
        if (MatKhau != user.MatKhau) {
            return res.status(400).json({ status:false,message: 'Mật khẩu không đúng' });
        }else{
//  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
//         res.json({ token });
           return res.status(200).json({status:true,message: 'đăng nhập thành công',user:user}); 
           
        }

       
    } catch (error) {
        return res.status(500).json({ status:false,message: error.message });
    }
});
router.post("/refreshToken", async function (req, res, next) {
    const { refreshToken } = req.body; // Lấy refreshToken từ request body

    JWT.verify(refreshToken, config.SECRETKEY, async function (err) {
        if (err) {
            res.status(401).json({ err: err }); // Nếu refreshToken không hợp lệ, trả về mã 401
        } else {
            var newToken = JWT.sign({ "data": "FOODDY" }, config.SECRETKEY, { expiresIn: '30s' }); // Tạo mới accessToken với thời gian sống 30 giây
            res.status(200).json({ token: newToken }); // Trả về accessToken mới
        }
    });
});

router.put('/edit/:_id', async (req, res) => {
    const { _id } = req.params;
    const { TenNguoiDung, Email, Sdt, Diachi } = req.body;

    try {
        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ status: false, message: 'Người dùng không tồn tại' });
        }

        // Kiểm tra xem tên người dùng mới đã tồn tại chưa
        if (TenNguoiDung && TenNguoiDung !== user.TenNguoiDung) {
            const userExists = await User.findOne({ TenNguoiDung: TenNguoiDung });
            if (userExists) {
                return res.status(400).json({ status: false, message: 'Tên người dùng đã tồn tại' });
            }
        }

        // Kiểm tra xem email mới đã tồn tại chưa
        if (Email && Email !== user.Email) {
            const emailExists = await User.findOne({ Email: Email });
            if (emailExists) {
                return res.status(400).json({ status: false, message: 'Email đã tồn tại' });
            }
        }

        // Cập nhật thông tin người dùng
        user.TenNguoiDung = TenNguoiDung || user.TenNguoiDung;
        user.Email = Email || user.Email;
        user.Sdt = Sdt || user.Sdt;
        user.Diachi = Diachi || user.Diachi;

        // Lưu thay đổi
        await user.save();

        return res.status(200).json({ status: true, message: 'Cập nhật thành công', user: user });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});
module.exports = router;
