const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose").default;
const studentController = require("./controllers/studentController");
const userController = require("./controllers/userController");

const app = express();
const port = 3000;

// Установка соединения с MongoDB
mongoose.connect("mongodb+srv://admin:123@cluster0.svmgxoh.mongodb.net/JournalDB?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log("Соединение с MongoDB успешно установлено.");
	})
	.catch((error) => {
		console.error("Ошибка при подключении к MongoDB:", error);
	});

app.use(express.json());
app.use(express.static(path.dirname(__dirname) + "/client"));
app.use("/api/v1", studentController);
app.use("/api/v1", userController);

http.createServer(app).listen(port, (error) => {
	if (error) {
		console.error("Произошла ошибка при запуске сервера:", error);
	} else {
		console.log(`Сервер запущен на порту ${port}`);
	}
});
