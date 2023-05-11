const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Получение всех пользователей
router.get("/users", (req, res) => {
	User.find({})
		.then((users) => {
			res.json(users);
		})
		.catch((error) => {
			console.error("Ошибка при получении пользователей:", error);
			res.status(500).json({error: "Ошибка при получении пользователей"});
		});
});

// Создание пользователя
router.post("/users", (req, res) => {
	const {nickname} = req.body;
	const user = new User({nickname});
	
	user
		.save()
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((error) => {
			console.error("Ошибка при сохранении пользователя:", error);
			res.status(500).json({error: "Ошибка при сохранении пользователя"});
		});
});

// Обновление пользователя по ID
router.put("/users/:id", (req, res) => {
	const userId = req.params.id;
	const {nickname} = req.body;
	
	User.findByIdAndUpdate(userId, {nickname}, {new: true})
		.then((user) => {
			if (user) {
				res.json(user);
			} else {
				res.status(404).json({error: "Пользователь не найден"});
			}
		})
		.catch((error) => {
			console.error("Ошибка при обновлении пользователя:", error);
			res.status(500).json({error: "Ошибка при обновлении пользователя"});
		});
});

// Удаление пользователя по ID
router.delete("/users/:id", (req, res) => {
	const userId = req.params.id;
	
	User.findByIdAndRemove(userId)
		.then((user) => {
			if (user) {
				res.json(user);
			} else {
				res.status(404).json({error: "Пользователь не найден"});
			}
		})
		.catch((error) => {
			console.error("Ошибка при удалении пользователя:", error);
			res.status(500).json({error: "Ошибка при удалении пользователя"});
		});
});

module.exports = router;