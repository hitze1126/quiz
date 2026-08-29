const questions = [
    { question: "Seit wann gibt es die Freaks?", options: ["2016", "2017", "2018", "2019"], answer: 2 },
    { question: "Wo war die 1. Halle der Freaks?", options: ["Bergen", "Nardt", "Hoyerswerda", "Bernsdorf"], answer: 0 },    
];

let currentQuestion = 0;
let score = 0;
let instaName = "";

function startQuiz() {
    const input = document.getElementById("insta-input").value.trim();
    if (!input) {
        alert("Bitte gib deinen Instagram-Namen ein!");
        return;
    }
    instaName = input;
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question-number").innerText = `Frage ${currentQuestion + 1} von ${questions.length}`;
    document.getElementById("question-text").innerText = q.question;
    
    const container = document.getElementById("options-container");
    container.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.innerText = option;
        btn.onclick = () => selectOption(index);
        container.appendChild(btn);
    });
}

function selectOption(index) {
    if (index === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("score-text").innerText = `${instaName}, du hast ${score} von ${questions.length} Punkten erreicht!`;

    // Formular ausfüllen und automatisch an Formspree senden
    document.getElementById("form-insta").value = instaName;
    document.getElementById("form-score").value = `${score} / ${questions.length}`;
    
    setTimeout(() => {
        document.getElementById("quiz-form").submit();
    }, 1500);
}