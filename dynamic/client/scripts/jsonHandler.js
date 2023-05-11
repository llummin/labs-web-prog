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
	
	// Кнопка "Удалить"
	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Удалить';
	deleteButton.classList.add('delete-button');
	deleteButton.addEventListener('click', () => {
		deleteStudent(student);
	});
	tr.appendChild(deleteButton);
	
	return tr;
}

function showAddStudentModal() {
	const modal = document.createElement('div');
	modal.classList.add('modal');
	
	const modalContent = document.createElement('div');
	modalContent.classList.add('modal-content');
	
	const nameLabel = document.createElement('label');
	nameLabel.textContent = 'Имя студента:';
	
	const nameInput = document.createElement('input');
	nameInput.type = 'text';
	nameInput.classList.add('modal-input');
	nameLabel.appendChild(nameInput);
	
	const saveButton = document.createElement('button');
	saveButton.textContent = 'Сохранить';
	saveButton.classList.add('modal-button');
	saveButton.addEventListener('click', () => {
		const studentData = {
			name: nameInput.value,
			grades: [],
			totalGrade: 0,
		};
		
		saveStudent(studentData);
		closeModal();
	});
	
	const cancelButton = document.createElement('button');
	cancelButton.textContent = 'Отмена';
	cancelButton.classList.add('modal-button');
	cancelButton.addEventListener('click', () => {
		closeModal();
	});
	
	modalContent.appendChild(nameLabel);
	
	modalContent.appendChild(saveButton);
	modalContent.appendChild(cancelButton);
	
	modal.appendChild(modalContent);
	document.body.appendChild(modal);
}

function closeModal() {
	const modal = document.querySelector('.modal');
	if (modal) {
		modal.remove();
	}
}

function saveStudent(studentData) {
	const url = '/api/v1/students';
	
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(studentData),
	})
		.then((response) => response.json())
		.then((createdStudent) => {
			console.log('Студент успешно создан:', createdStudent);
			
			alert(`Студент "${createdStudent.name}" успешно создан`);
			
			refreshTable();
		})
		.catch((error) => {
			// Обработка ошибки при создании студента
			console.error('Ошибка при создании студента:', error);
		});
}

function deleteStudent(student) {
	const {_id, name} = student;
	
	// Отображение всплывающего окна с подтверждением удаления
	if (confirm(`Вы действительно хотите удалить студента "${name}"?`)) {
		const url = `/api/v1/students/${_id}`;
		
		fetch(url, {
			method: 'DELETE'
		})
			.then(response => response.json())
			.then(deletedStudent => {
				// Обработка успешного удаления студента
				console.log('Студент успешно удален:', deletedStudent);
				
				// Отображение уведомления об успешном удалении
				alert(`Студент "${name}" успешно удален`);
				
				// Обновление таблицы
				refreshTable();
			})
			.catch(error => {
				// Обработка ошибки при удалении студента
				console.error('Ошибка при удалении студента:', error);
			});
	}
}

function calculateTotalGrade(student) {
	const totalGrade = student.grades.reduce((sum, grade) => sum + grade, 0);
	return Math.min(totalGrade, 100);
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
		
		// Создание кнопки "Добавить"
		const addButtonRow = document.createElement('tr');
		const addButtonCell = document.createElement('td');
		addButtonCell.setAttribute('colspan', '16');
		addButtonCell.classList.add('add-button-cell');
		const addButton = document.createElement('button');
		addButton.textContent = 'Добавить';
		addButton.classList.add('add-button');
		addButton.addEventListener('click', () => {
			showAddStudentModal();
		});
		addButtonCell.appendChild(addButton);
		addButtonRow.appendChild(addButtonCell);
		tbody.appendChild(addButtonRow);
	} catch (error) {
		console.error("Произошла ошибка при заполнении таблицы:", error);
	}
}

async function refreshTable() {
	try {
		const tbody = document.querySelector('.grades__tbody');
		tbody.innerHTML = ''; // Очистка таблицы
		
		const students = await fetchData();
		
		students.forEach(student => {
			student.totalGrade = calculateTotalGrade(student);
			const studentRow = createStudentRow(student);
			tbody.appendChild(studentRow);
		});
	} catch (error) {
		console.error('Произошла ошибка при обновлении таблицы:', error);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	fillTable().catch(error => console.error("Произошла ошибка:", error));
});