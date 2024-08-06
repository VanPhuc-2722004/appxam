var express = require('express');
var router = express.Router();
var SinhVien = require('../models/sinhvien');

// Lấy danh sách sinh viên
router.get('/list', function(req, res, next) {
  SinhVien.find({}, function(err, sinhviens) {
    if (err) return next(err);
    res.status(200).json(sinhviens);
  });
});

// Thêm sinh viên
router.post('/add', function(req, res, next) {
  var newSinhVien = new SinhVien(req.body);
  newSinhVien.save(function(err, sinhvien) {
    if (err) return next(err);
    res.status(200).json(sinhvien);
  });
});

// Lấy chi tiết sinh viên
router.get('/detail', function(req, res, next) {
  SinhVien.findOne({ mssv: req.query.mssv }, function(err, sinhvien) {
    if (err) return next(err);
    res.json(sinhvien);
  });
});

// Chỉnh sửa sinh viên
router.post('/edit', function(req, res, next) {
  SinhVien.findOneAndUpdate({ mssv: req.body.mssv }, req.body, { new: true }, function(err, sinhvien) {
    if (err) return next(err);
    res.json(sinhvien);
  });
});

// Xóa sinh viên
router.delete('/delete/:mssv', function(req, res, next) {
  SinhVien.findOneAndRemove({ mssv: req.params.mssv }, function(err) {
    if (err) return next(err);
    res.status(200).json({ message: 'Sinh viên đã được xóa' });
  });
});

module.exports = router;
