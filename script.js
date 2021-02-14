let qstnArray;
let QuestionIndex = 0;
let count = 0;
async function loadMainPage() {
  qstnArray = await fetchData();
  displayQuestions(qstnArray[QuestionIndex]);
}
const url = "https://opentdb.com/api.php?amount=10&type=multiple";
const jsonData = [];
async function fetchData() {
  try {
    let response = await fetch(url);
    let data = await response.json();
    let finalData = [];
    data.results.forEach((elem) => {
      let obj = {};
      obj.question = elem.question;
      obj.incorrect_answers = elem.incorrect_answers;
      obj.correct_answer = elem.correct_answer;
      let correctIndex = Math.floor(Math.random() * 4);
      obj.answers = [...obj.incorrect_answers];
      obj.answers.splice(correctIndex, 0, obj.correct_answer);
      finalData.push(obj);
    });

    return finalData;
  } catch (error) {
    console.log(error);
  }
}

function displayQuestions(questionsArray) {
  document.getElementById("question").innerHTML = questionsArray.question;
  document.getElementById("optA").innerHTML = questionsArray.answers[0];
  document.getElementById("optB").innerHTML = questionsArray.answers[1];
  document.getElementById("optC").innerHTML = questionsArray.answers[2];
  document.getElementById("optD").innerHTML = questionsArray.answers[3];
  document.getElementById("qNum").innerHTML = `${QuestionIndex + 1} / 10`;
  document.getElementById("score").innerHTML = count;
}
// displayQuestions();
function changeQnum(elem) {
  if (elem.innerHTML == qstnArray[QuestionIndex].correct_answer) {
    count += 10;
  }
  QuestionIndex += 1;
  document.getElementById("range").value = QuestionIndex;
  if (QuestionIndex >= 10) {
    localStorage.setItem("score", count);
    window.location.href = "end.html";
  }
  displayQuestions(qstnArray[QuestionIndex]);
}
