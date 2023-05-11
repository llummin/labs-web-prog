const {mongoose, Schema} = require("mongoose");

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	grades: [Number],
	totalGrade: Number,
	owner: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;