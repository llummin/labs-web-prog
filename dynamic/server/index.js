const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose").default;
const Student = require("./models/Student");

const app = express();
const port = 3000;

// Установка соединения с MongoDB
mongoose.connect("mongodb+srv://admin:123@cluster0.svmgxoh.mongodb.net/JournalDB?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('Соединение с MongoDB успешно установлено.');
	})
	.catch((error) => {
		console.error('Ошибка при подключении к MongoDB:', error);
	});

mongoose.connection.once("open", function () {
	// Создание и сохранение данных студентов
	const students = [
		{
			"name": "Иванов Иван",
			"grades": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			"totalGrade": 0
		},
		{
			"name": "Петров Петр",
			"grades": [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
			"totalGrade": 0
		},
		{
			"name": "Сидоров Семен",
			"grades": [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
			"totalGrade": 0
		},
		{
			"name": "Кузнецов Дмитрий",
			"grades": [0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0],
			"totalGrade": 0
		},
		{
			"name": "Федорова Ольга",
			"grades": [0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0],
			"totalGrade": 0
		},
		{
			"name": "Михайлов Игорь",
			"grades": [0, 0, 0, 0, 0, 6, 0, 6, 0, 0, 0, 0, 0],
			"totalGrade": 0
		},
		{
			"name": "Новиков Артем",
			"grades": [0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0],
			"totalGrade": 0
		}
	];
	
	Student.insertMany(students)
		.then(() => {
			console.log("Данные студентов успешно сохранены в базе данных.");
		})
		.catch((error) => {
			console.error("Ошибка при сохранении данных студентов:", error);
		});
});

app.use(express.static(path.dirname(__dirname) + "/client"));

// Маршрут для получения данных из MongoDB
app.get("/data.json", function (req, res) {
	// Извлечение данных из MongoDB
	Student.find({}, function (err, students) {
		if (err) {
			console.error("Произошла ошибка при получении данных:", err);
			res.status(500).json({error: "Ошибка при получении данных"});
		} else {
			res.json(students);
		}
	});
});

http.createServer(app).listen(port, (error) => {
	if (error) {
		console.error("Произошла ошибка при запуске сервера:", error);
	} else {
		console.log(`Сервер запущен на порту ${port}`);
	}
});
