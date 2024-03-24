// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('data-type') === 'submit'){
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            };
        });
    };
    runGame('addition');
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    document.getElementById('answer-box').value = '';
    let num1 = Math.floor(Math.random() * 25 + 1);
    let num2 = Math.floor(Math.random() * 25 + 1);

    if (gameType === 'addition') {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'subtract') {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === 'multiply') {
        displayMultiplyQuestion(num1, num2);
    // } else if (gameType === 'divide') {
    //     displayDivideQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Checks the user's answer against the first element in the array returned by calulateCorrectAnswer()
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    if (isCorrect) {
        alert('Hey! You got it right 😀');
        incrementScore();
    } else {
        alert(`Awwww... you answered ${userAnswer}, but the correct answer is ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }
    runGame(calculatedAnswer[1]);
    
}

/**
 * Gets the operands and the operator from the DOM and returns the correct answer
 * It gets them from the DOM, rather than directly from the script, to avoid creating global variables
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText); // parseInt explicitly casts string from DOM to int
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+') {
        return [operand1 + operand2, 'addition'];
    } else if (operator === 'x') {
        return [operand1 * operand2, 'multiply']
    }  else if (operator === '-') {
        return [operand1 - operand2, 'subtract']
    // } else if (operator === '/') {
    //     return [operand1 / operand2, 'divide']
    }  else {
        alert(`unimplemented operator ${operator}`);
        throw `unimplemented operator ${operator}. Aborting!`;
    }
}

/**
 * Adds one to the existing score
 */
function incrementScore() {
    let score = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = score + 1;
}

/**
 * Adds one to the existing incorrect tally
 */
function incrementWrongAnswer() {
    let incorrect = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = incorrect + 1;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';
}
function displayDivideQuestion(operand1, operand2) {

}
