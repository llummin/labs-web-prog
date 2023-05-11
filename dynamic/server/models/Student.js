const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	name: String,
	grades: [Number],
	totalGrade: Number,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;