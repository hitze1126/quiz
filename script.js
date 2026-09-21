const questions = [
    { question: "Seit wann gibt es die Freaks?", options: ["2016", "2017", "2018", "2019"], answer: 2 },
    { question: "Wo war die 1. Halle der Freaks?", options: ["Bergen", "Nardt", "Hoyerswerda", "Bernsdorf"], answer: 0 },
    { question: "Welches Treffen war das erste mit Masken?", options: ["Bautzen", "Cottbus", "Dresden", "Deutschbaselitz"], answer: 1 },
    { question: "Wieviele Gründungsmitglieder haben die Freaks?", options: ["1", "2", "3", "4"], answer: 2 },
    { question: "Welches Auto war das 1. Projekt?", options: ["Derby", "Polo", "Golf 3", "Passat 32b"], answer: 3 },
    { question: "Wie heißt das sagenumwobene Getränk?", options: ["Freakin Martini", "Altblech Gin", "Freaks'o Caner", "Darkderby"], answer: 2 },
    { question: "Welche Hauptfarben haben die Freaks?", options: ["rot/schwarz", "schwarz/weiß", "weiß/schwarz", "rot/blau"], answer: 0 },
    { question: "Wieviel aktive Mitglieder haben die Freaks?", options: ["10", "11", "12", "13"], answer: 3 },
    { question: "Welches Motto hatte das letzte BBQ?", options: ["Jack-o'-lantern", "Trick or Treat", "Apple Bobbing", "Nightmare before Freaks"], answer: 1 },
    { question: "Wann war das letzte BBQ?", options: ["4.10.2025", "11.10.2025", "18.10.2025", "25.10.2025"], answer: 1 },    
];

let currentQuestion = 0;
let score = 0;
let instaName = "";
let wrongAnswers = [];

function getLeaderboard() {
    const stored = localStorage.getItem("freaksQuizLeaderboard");
    try {
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        return [];
    }
}

function saveLeaderboard(entries) {
    localStorage.setItem("freaksQuizLeaderboard", JSON.stringify(entries));
}

function buildLeaderboardText() {
    const entries = getLeaderboard();

    if (!entries.length) {
        return "Noch keine Einträge vorhanden";
    }

    const sorted = [...entries].sort((a, b) => b.score - a.score);
    return sorted
        .slice(0, 10)
        .map((entry, index) => `${index + 1}. ${entry.name}: ${entry.score} Punkte`)
        .join("\n");
}

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
        btn.innerHTML = `<img class="option-img-left" src="Assets/bg.png" alt=""><span>${option}</span><img class="option-img-right" src="Assets/bg.png" alt="">`;
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

    const leaderboard = getLeaderboard();
    leaderboard.push({
        name: instaName,
        score: score,
        date: new Date().toISOString()
    });
    saveLeaderboard(leaderboard);

    const topEntry = [...leaderboard].sort((a, b) => b.score - a.score)[0];
    const topText = topEntry
        ? `Top Scorer: ${topEntry.name} mit ${topEntry.score} Punkten`
        : "Top Scorer: Noch keiner";
    const leaderboardText = buildLeaderboardText();

    document.getElementById("leaderboard-display").innerText = leaderboardText;

    document.getElementById("form-insta").value = instaName;
    document.getElementById("form-score").value = `${score} / ${questions.length}`;
    document.getElementById("form-wrong").value = wrongText;
    document.getElementById("form-top").value = topText;
    document.getElementById("form-leaderboard").value = leaderboardText;
    
    setTimeout(() => {
        document.getElementById("quiz-form").submit();
    }, 1500);
}