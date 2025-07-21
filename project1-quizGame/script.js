// Dom Elements
const startScreen = document.getElementById("start-screen");
const quizScreen =document.getElementById("quiz-screen");
const resultScreen =document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const questionText= document.getElementById("question-text");
const answersContainer= document.getElementById("answers-container");
const currentQuestionSpan =document.getElementById("current-question");
const totalQuestionSpan =document.getElementById("total-questions");
const scoreSpan =document.getElementById("score");
const finalScoreSpan =document.getElementById("final-score");
const maxScoreSpan =document.getElementById("max-score");
const resultMessage =document.getElementById("result-msg");
const restartButton= document.getElementById("restart-btn");
const progressBar=document.getElementById("progress");

const quizQuestions =[
    {
        question:"What is the capital of France?",
        answers:[
            {text:"London",correct:false},
            {text:"Berlin",correct:false},
            {text:"Paris",correct:true},
            {text:"Madrid",correct:false}
        ]
    },
         {
    question: "Which planet is known as the Red Planet?",
    answers: [
        {text: "Venus", correct: false},
        {text: "Mars", correct: true},
        {text: "Jupiter", correct: false},
        {text: "Saturn", correct: false}
    ]
},
{
    question: "What is the largest mammal in the world?",
    answers: [
        {text: "African Elephant", correct: false},
        {text: "Blue Whale", correct: true},
        {text: "Giraffe", correct: false},
        {text: "Polar Bear", correct: false}
    ]
},
{
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
        {text: "William Shakespeare", correct: true},
        {text: "Charles Dickens", correct: false},
        {text: "Jane Austen", correct: false},
        {text: "Mark Twain", correct: false}
    ]
},
{
    question: "What is the smallest prime number?",
    answers: [
        {text: "0", correct: false},
        {text: "1", correct: false},
        {text: "2", correct: true},
        {text: "3", correct: false}
    ]
}
];

// Quiz State Variables
let currentQuestionIndex=0;
let score=0;
let answerDisabled=false;

totalQuestionSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

// Event Listners
startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click",restartQuiz);

function startQuiz(){
    //reset variables
    currentQuestionIndex=0;
    score=0;
    scoreSpan.textContent=score;
    
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}



function showQuestion(){
    // reset state
    answerDisabled=false;

    const currentQuestion =quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent=currentQuestionIndex+1;

    const progressPercent= (currentQuestionIndex/quizQuestions.length)*100;
    progressBar.style.width=progressPercent+"%";

    questionText.textContent=currentQuestion.question;

    //explain 

    answersContainer.innerHTML="";
    currentQuestion.answers.forEach(answer=>{
        const button =document.createElement("button");
        button.textContent=answer.text;
        button.classList.add("answer-btn");
        
        button.dataset.correct=answer.correct;

        button.addEventListener("click",SelectAnswer);

        answersContainer.appendChild(button);
    });
}

function SelectAnswer(event){
    //optimization check
    if(answerDisabled) return ;

    answerDisabled=true;

    const selectedButton = event.target;
    const isCorrect=selectedButton.dataset.correct==="true";

    Array.from(answersContainer.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        else if(button=== selectedButton){
           button.classList.add("incorrect");

        }
    })

    if (isCorrect){
        score++;
        scoreSpan.textContent=score;
    }

    setTimeout(()=>{
        currentQuestionIndex++;

        //check if there are more questions

        if(currentQuestionIndex<quizQuestions.length){
            showQuestion();

        }
        else{
            showResluts();
        }
    },1000);
}

function showResluts(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent=score;

    const percentage=(score/quizQuestions.length )*100;

    if (percentage === 100) {
    resultMessage.textContent = "Perfect! You are a genius";
} else if (percentage >= 80) {
    resultMessage.textContent = "Excellent work! You're very sharp.";
} else if (percentage >= 60) {
    resultMessage.textContent = "Good job! A little more effort and you'll be at the top.";
} else if (percentage >= 40) {
    resultMessage.textContent = "Not bad, but you need more practice.";
} else if (percentage >= 20) {
    resultMessage.textContent = "You’re getting there. Keep learning!";
} else {
    resultMessage.textContent = "Don’t give up! Review the material and try again.";
}
}

function restartQuiz(){

    resultScreen.classList.remove("active");
    startQuiz();
}