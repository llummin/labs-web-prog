const inputs = document.querySelectorAll(".grades__input");
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        const gradesRow = input.closest(".grades__tr");
        const totalGrade = gradesRow.querySelector(".grades__total-grade");
        let sum = 0;
        for (let i = 1; i < 14; i++) {
            const grade = parseInt(gradesRow.children[i].querySelector("input").value);
            if (!isNaN(grade)) {
                sum += grade;
            }
        }
        totalGrade.textContent = sum.toString();
    });
});