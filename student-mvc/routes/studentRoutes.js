const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentController');

router.get('/', controller.getStudents);
router.post('/add', controller.addStudent);

module.exports = router;