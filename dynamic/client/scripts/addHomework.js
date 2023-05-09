function addHomework() {
	const dateInput = document.querySelector('.homework__date-input').value;
	const themeInput = document.querySelector('.homework__theme-input').value;
	const homeworkInput = document.querySelector('.homework__homework-input').value;
	
	if (!dateInput) {
		alert('Пожалуйста, выберите дату!');
		return;
	}
	
	const newRow = document.createElement('tr');
	newRow.className = 'homework__table-row';
	
	const dateCell = document.createElement('th');
	dateCell.className = 'homework__table-date';
	dateCell.textContent = dateInput;
	
	const themeCell = document.createElement('td');
	themeCell.className = 'homework__table-theme';
	const themeText = document.createElement('textarea');
	themeText.className = 'homework__textarea';
	themeText.setAttribute('readonly', 'true');
	themeText.value = themeInput;
	themeCell.appendChild(themeText);
	
	const homeworkCell = document.createElement('td');
	homeworkCell.className = 'homework__table-homework';
	const homeworkText = document.createElement('textarea');
	homeworkText.className = 'homework__textarea';
	homeworkText.setAttribute('readonly', 'true');
	homeworkText.value = homeworkInput;
	homeworkCell.appendChild(homeworkText);
	
	newRow.appendChild(dateCell);
	newRow.appendChild(themeCell);
	newRow.appendChild(homeworkCell);
	
	const tableBody = document.getElementById('homeworkTableBody');
	tableBody.appendChild(newRow);
}