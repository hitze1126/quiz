const questions = [
    { question: "Seit wann gibt es die Freaks?", options: ["2016", "2017", "2018", "2019"], answer: 2 },
    { question: "Wo war die 1. Halle der Freaks?", options: ["Bergen", "Nardt", "Hoyerswerda", "Bernsdorf"], answer: 0 },
    { question: "Welches Treffen war das erste mit Masken", options: ["Bautzen", "Cottbus", "Dresden", "Deutschbaselitz"], answer: 1 },
    { question: "Wieviele Gründungsmitglieder haben die Freaks?", options: ["1", "2", "3", "4"], answer: 2 },
    { question: "Welches Auto war das 1. Projekt?", options: ["Derby", "Polo", "Golf 3", "Passat 32b"], answer: 3 },
    { question: "Wie heißt das sagenumwobene Getränk?", options: ["Freakin-Martini", "Altblechgin", "Freaks'o Caner", "Darkderby"], answer: 2 },
    { question: "Wann fand das letzte BBQ statt?", options: ["25.10.26", "18.10.26", "01.11.26", "11.10.26"], answer: 0 },    
];

let currentQuestion = 0;
let score = 0;
let instaName = "";
let wrongAnswers = [];

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
    const q = questions[currentQuestion];

    if (index === q.answer) {
        score++;
    } else {
        wrongAnswers.push({
            question: q.question,
            selected: q.options[index],
            correct: q.options[q.answer],
            clicked: q.options[index]
        });
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

    const wrongText = wrongAnswers.length
        ? wrongAnswers.map((item, index) => `Frage ${index + 1}: ${item.question} | angeklickt: ${item.clicked} | richtig: ${item.correct}`).join("\n")
        : "Keine falschen Antworten";

    
    document.getElementById("form-insta").value = instaName;
    document.getElementById("form-score").value = `${score} / ${questions.length}`;
    document.getElementById("form-wrong").value = wrongText;
    
    setTimeout(() => {
        document.getElementById("quiz-form").submit();
    }, 1500);
}