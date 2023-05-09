const express = require("express");
const http = require("http")
const path = require("path")

const app = express();
const port = 3000;
data = [
	{
		"students": [
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
		]
	}
]

app.use(express.static(path.dirname(__dirname) + "/client"))
http.createServer(app).listen(port, (error) => {
	if (error) {
		console.error("Произошла ошибка при запуске сервера:", error);
	} else {
		console.log(`Сервер запущен на порту ${port}`);
	}
});

app.get("/data.json", function (req, res) {
	res.json(data);
})