const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	grades: [Number],
	totalGrade: Number,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;