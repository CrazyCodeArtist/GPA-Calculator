const courses = [
    { name: "Applications of Information and Communication Technologies", credits: 2 },
    { name: "Islamic Studies", credits: 2 },
    { name: "Functional English", credits: 3 },
    { name: "Computer Programming", credits: 3 },
    { name: "Applications of Information and Communication Technologies Lab", credits: 1 },
    { name: "Calculus and Analytical Geometry", credits: 3 },
    { name: "Computer Programming Lab", credits: 1 }
];

const gradePoints = {
    'A': 4.00,
    'A-': 3.67,
    'B+': 3.33,
    'B': 3.00,
    'B-': 2.67,
    'C+': 2.33,
    'C': 2.00,
    'C-': 1.67,
    'F': 0.00
};

const gradePercentageRanges = [
    { grade: 'A', min: 86, max: 100 },
    { grade: 'A-', min: 82, max: 85 },
    { grade: 'B+', min: 78, max: 81 },
    { grade: 'B', min: 74, max: 77 },
    { grade: 'B-', min: 70, max: 73 },
    { grade: 'C+', min: 66, max: 69 },
    { grade: 'C', min: 62, max: 65 },
    { grade: 'C-', min: 58, max: 61 },
    { grade: 'F', min: 0, max: 50 }
];

const gradePercentageTable = `
    <div class="grade-table">
        <h3>Grade Percentage Table</h3>
        <table>
            <tr>
                <th>Grade</th>
                <th>Percentage</th>
            </tr>
            <tr><td>A</td><td>86% - 100%</td></tr>
            <tr><td>A-</td><td>82% - 85%</td></tr>
            <tr><td>B+</td><td>78% - 81%</td></tr>
            <tr><td>B</td><td>74% - 77%</td></tr>
            <tr><td>B-</td><td>70% - 73%</td></tr>
            <tr><td>C+</td><td>66% - 69%</td></tr>
            <tr><td>C</td><td>62% - 65%</td></tr>
            <tr><td>C-</td><td>58% - 61%</td></tr>
            <tr><td>F</td><td>Below 50%</td></tr>
        </table>
    </div>
`;

let currentCourseIndex = 0;
let totalGradePoints = 0;
let totalCredits = 0;
const results = [];

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function askForPercentage() {
    if (currentCourseIndex < courses.length) {
        const course = courses[currentCourseIndex];
        displayMessage(`What is your percentage in "${course.name}"? (Credit Hours: ${course.credits})`, 'bot');
    } else {
        calculateTotalGPA();
    }
}

function calculateTotalGPA() {
    const gpa = (totalGradePoints / totalCredits).toFixed(2);
    displayMessage(`Calculation complete!`, 'bot');
    displayMessage(`Total Grade Points: ${totalGradePoints.toFixed(2)}`, 'bot');
    displayMessage(`Total Credit Hours: ${totalCredits}`, 'bot');
    displayMessage(`Your Semester GPA is: ${gpa}`, 'bot');

    // Display summary
    displaySummary();
    document.getElementById('user-input').disabled = true;
}

function displaySummary() {
    const summary = `
        <div class="summary">
            <h3>Summary of Results</h3>
            <table>
                <tr>
                    <th>Course</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                    <th>Grade Points</th>
                    <th>Credit Hours</th>
                    <th>Calculated Grade Points</th>
                </tr>
                ${results.map(result => `
                    <tr>
                        <td>${result.course}</td>
                        <td>${result.percentage}%</td>
                        <td>${result.grade}</td>
                        <td>${result.gradePoints}</td>
                        <td>${result.credits}</td>
                        <td>${result.calculatedGradePoints.toFixed(2)}</td>
                    </tr>
                `).join('')}
            </table>
        </div>
    `;
    const chatBox = document.getElementById('chat-box');
    chatBox.insertAdjacentHTML('beforeend', summary);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function getGradeFromPercentage(percentage) {
    for (const range of gradePercentageRanges) {
        if (percentage >= range.min && percentage <= range.max) {
            return range.grade;
        }
    }
    return 'F'; 
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const percentage = parseFloat(input.value.trim());

    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        displayMessage(`Invalid percentage! Please enter a value between 0 and 100.`, 'error');
        input.value = '';
        return;
    }

    const course = courses[currentCourseIndex];
    const grade = getGradeFromPercentage(percentage);
    const points = gradePoints[grade];
    const calculatedGradePoints = points * course.credits;

    results.push({
        course: course.name,
        percentage: percentage,
        grade: grade,
        gradePoints: points,
        credits: course.credits,
        calculatedGradePoints: calculatedGradePoints
    });

    displayMessage(`${percentage}% `, 'user');

    totalGradePoints += calculatedGradePoints;
    totalCredits += course.credits;
    currentCourseIndex++;
    input.value = '';

    askForPercentage();
}

const chatBox = document.getElementById('chat-box');
// chatBox.insertAdjacentHTML('beforeend', gradePercentageTable);
displayMessage("Welcome to GPA Calculator! Made By M.Ahmed with love ❤️:", 'bot');
askForPercentage();