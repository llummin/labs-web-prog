// Загрузка данных из сервера
async function fetchData() {
	const response = await fetch('/api/v1/students');
	return await response.json();
}

// Создание новых строк с данными студентов
function createStudentRow(student) {
	const tr = document.createElement('tr');
	tr.classList.add('grades__tr');
	
	const nameTd = document.createElement('td');
	nameTd.classList.add('grades__td');
	nameTd.textContent = student.name;
	tr.appendChild(nameTd);
	
	for (let i = 0; i < 13; i++) {
		const gradeTd = document.createElement('td');
		gradeTd.classList.add('grades__td');
		const input = document.createElement('input');
		input.classList.add('grades__input');
		input.type = 'number';
		input.min = '0';
		input.value = student.grades[i] || 0;
		gradeTd.appendChild(input);
		tr.appendChild(gradeTd);
	}
	
	const totalGradeTd = document.createElement('td');
	totalGradeTd.classList.add('grades__total-grade');
	totalGradeTd.textContent = student.totalGrade;
	tr.appendChild(totalGradeTd);
	
	return tr;
}

// Рассчитать общее количество баллов для каждого студента
function calculateTotalGrade(student) {
	const totalGrade = student.grades.reduce((sum, grade) => sum + grade, 0);
	return Math.min(totalGrade, 100); // Ограничение итогового балла до значения не больше 100
}

// Заполнение таблицы данными из JSON-файла
async function fillTable() {
	try {
		const students = await fetchData();
		const tbody = document.querySelector('.grades__tbody');
		
		students.forEach(student => {
			student.totalGrade = calculateTotalGrade(student);
			const studentRow = createStudentRow(student);
			tbody.appendChild(studentRow);
		});
		
		const inputs = document.querySelectorAll(".grades__input");
		inputs.forEach((input) => {
			input.addEventListener("input", () => {
				const gradesRow = input.closest(".grades__tr");
				const totalGrade = gradesRow.querySelector(".grades__total-grade");
				let sum = 0;
				for (let i = 1; i <= 13; i++) {
					const grade = parseInt(gradesRow.children[i].querySelector("input").value);
					if (!isNaN(grade) && grade >= 0 && grade <= 99) {
						sum += grade;
					} else {
						// Сбрасываем входное значение, если оно неверно
						gradesRow.children[i].querySelector("input").value = "";
					}
				}
				const clampedTotalGrade = Math.min(sum, 100);
				totalGrade.textContent = clampedTotalGrade.toString();
			});
		});
	} catch (error) {
		console.error("Произошла ошибка при заполнении таблицы:", error);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	fillTable().catch(error => console.error("Произошла ошибка:", error));
});