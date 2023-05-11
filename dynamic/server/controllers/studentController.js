const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// Получение всех студентов
router.get("/students", (req, res) => {
	Student.find({})
		.then((students) => {
			res.json(students);
		})
		.catch((error) => {
			console.error("Ошибка при получении студентов:", error);
			res.status(500).json({error: "Ошибка при получении студентов"});
		});
});

// Получение студента по ID
router.get("/students/:id", (req, res) => {
	const studentId = req.params.id;
	Student.findById(studentId)
		.then((student) => {
			if (student) {
				res.json(student);
			} else {
				res.status(404).json({error: "Студент не найден"});
			}
		})
		.catch((error) => {
			console.error("Ошибка при получении студента:", error);
			res.status(500).json({error: "Ошибка при получении студента"});
		});
});

// Создание студента
router.post("/students", (req, res) => {
	const {name, grades, totalGrade} = req.body;
	const student = new Student({name, grades, totalGrade});
	
	student
		.save()
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((error) => {
			console.error("Ошибка при сохранении студента:", error);
			res.status(500).json({error: "Ошибка при сохранении студента"});
		});
});

// Обновление студента по ID
router.put("/students/:id", (req, res) => {
	const studentId = req.params.id;
	const {name, grades, totalGrade} = req.body;
	
	Student.findByIdAndUpdate(studentId, {name, grades, totalGrade}, {new: true})
		.then((student) => {
			if (student) {
				res.json(student);
			} else {
				res.status(404).json({error: "Студент не найден"});
			}
		})
		.catch((error) => {
			console.error("Ошибка при обновлении студента:", error);
			res.status(500).json({error: "Ошибка при обновлении студента"});
		});
});

// Удаление студента по ID
router.delete("/students/:id", (req, res) => {
	const studentId = req.params.id;
	
	Student.findByIdAndRemove(studentId)
		.then((student) => {
			if (student) {
				res.json(student);
			} else {
				res.status(404).json({error: "Студент не найден"});
			}
		})
		.catch((error) => {
			console.error("Ошибка при удалении студента:", error);
			res.status(500).json({error: "Ошибка при удалении студента"});
		});
});

module.exports = router;