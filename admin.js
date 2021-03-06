// Globals
let customTimerIsValid = false;
let questions = [];

// Check if there is a customer timer in localStorage and populate value if so
const customTimerEl = document.getElementById("customTimer");
if (localStorage.customTimer) {
  customTimerEl.value = localStorage.customTimer;
}

// Save timer
document.getElementById("timerSave").addEventListener("click", (event) => {
  localStorage.setItem("customTimer", customTimerEl.value);
});

// Remove timer
document.getElementById("removeTimer").addEventListener("click", (event) => {
  localStorage.removeItem("customTimer");
  location.reload();
});

// Check for a numeric pattern in custom timer
const validateCustomTimer = (input) => {
  const pattern = /^\d+$/;
  return pattern.test(input);
};

// Update save button if timer value is valid or not
const updateCustomTimerSave = () => {
  const timerSaveEl = document.getElementById("timerSave");
  timerSaveEl.disabled = !customTimerIsValid;
};

// Validate custom timer during keying
customTimerEl.addEventListener("keyup", (event) => {
  customTimerIsValid = validateCustomTimer(event.target.value);
  updateCustomTimerSave();
});

// Add custom event handler
const addCustomQuestionHandler = () => {
  const questionEl = document.getElementById("question");
  const choiceOneEl = document.getElementById("choice-1");
  const choiceTwoEl = document.getElementById("choice-2");
  const choiceThreeEl = document.getElementById("choice-3");
  const choiceFourEl = document.getElementById("choice-4");
  const answerEl = document.getElementById("answer");

  let answer;

  switch (answerEl.value) {
    case "1":
      answer = choiceOneEl.value;
      break;
    case "2":
      answer = choiceTwoEl.value;
      break;
    case "3":
      answer = choiceThreeEl.value;
      break;
    case "4":
      answer = choiceFourEl.value;
      break;
    default:
      answer = null;
      break;
  }

  const question = {
    question: questionEl.value,
    choices: [
      choiceOneEl.value,
      choiceTwoEl.value,
      choiceThreeEl.value,
      choiceFourEl.value,
    ],
    answer: answer,
  };

  if (localStorage.customQuestions) {
    questions = JSON.parse(localStorage.getItem("customQuestions"));
    questions.push(question);
    localStorage.setItem("customQuestions", JSON.stringify(questions));
    location.reload();
  } else {
    const questions = [question];
    localStorage.setItem("customQuestions", JSON.stringify(questions));
    location.reload();
  }
};

// Add custom event listener
document.getElementById("addCustomQuestion").addEventListener("click", () => {
  addCustomQuestionHandler();
});

// Fetch custom questions
const fetchCustomQuestions = () => {
  if (localStorage.customQuestions) {
    questions = JSON.parse(localStorage.getItem("customQuestions"));
  }
};

// Output questions
const createQuestionRow = (question, index) => {
  const questionListingEl = document.getElementById("question-listing");
  const questionRow = document.createElement("tr");
  const questionName = document.createElement("td");
  questionName.setAttribute("scope", "row");
  questionName.textContent = question.question;
  const questionConfig = document.createElement("td");
  questionConfig.setAttribute("scope", "row");

  const questionDelete = document.createElement("button");
  questionDelete.setAttribute("class", "btn btn-sm btn-danger action");
  questionDelete.setAttribute("id", "questionDelete");
  questionDelete.setAttribute("value", index);
  questionDelete.textContent = "Delete";

  questionConfig.appendChild(questionDelete);
  questionRow.appendChild(questionName);
  questionRow.appendChild(questionConfig);
  questionListingEl.appendChild(questionRow);
};

// Render questions
const renderCustomQuestions = () => {
  questions.forEach((question, index) => {
    createQuestionRow(question, index);
  });
};

// Delete question
const deleteCustomQuestion = (index) => {
  questions.splice(index, 1);
  localStorage.setItem("customQuestions", JSON.stringify(questions));
  location.reload();
};

// Custom questions list event listener
document
  .getElementById("customQuestions")
  .addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
      deleteCustomQuestion(event.target.value);
    }
  });

// Clear localStorage
document.getElementById("clearLocalStorage").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

// Main program
fetchCustomQuestions();
renderCustomQuestions();