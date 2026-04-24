const Student = require('../models/student');

exports.getStudents = async (req, res) => {
    const students = await Student.find();
    res.render('index', { students });
};

exports.addStudent = async (req, res) => {
    await Student.create(req.body);
    res.redirect('/');
};