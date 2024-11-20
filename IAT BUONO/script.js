// Gruppi di categorie con le rispettive immagini
const groups = [
    {
        name: "Affidabile/Inaffidabile",
        positive: "Affidabile",
        negative: "Inaffidabile",
        stimuli: [
            "https://imgur.com/a/hnIP4PR",
            "https://imgur.com/a/nG2hG81",
            "https://imgur.com/a/vhxUBry",
            "https://imgur.com/a/dESWepj"
        ]
    },
    {
        name: "Sensibile/Insensibile",
        positive: "Sensibile",
        negative: "Insensibile",
        stimuli: [
            "https://imgur.com/a/O2JXpNf",
            "https://imgur.com/a/rESBusu",
            "https://imgur.com/a/KKuYeoo",
            "https://imgur.com/a/43HK5G2"
        ]
    },
    {
        name: "Pudica/Facile",
        positive: "Pudica",
        negative: "Facile",
        stimuli: [
            "https://imgur.com/a/jIhFwvI",
            "https://imgur.com/a/d7uYR15",
            "https://imgur.com/a/Etmb4pp",
            "https://imgur.com/a/rESBusu"
        ]
    }
];

// Variabili globali
let currentGroupIndex = 0;
let currentStimulusIndex = 0;
let startTime = null;
let results = [];

// Elementi DOM
const startButton = document.getElementById("start");
const stimulusImage = document.getElementById("stimulus-image");
const groupNameElement = document.getElementById("group-name");

// Inizio del test
startButton.addEventListener("click", startTest);

function startTest() {
    startButton.style.display = "none";
    currentGroupIndex = 0;
    currentStimulusIndex = 0;
    results = [];
    showNextStimulus();
}

function showNextStimulus() {
    const group = groups[currentGroupIndex];
    if (currentStimulusIndex < group.stimuli.length) {
        groupNameElement.textContent = group.name;
        stimulusImage.src = group.stimuli[currentStimulusIndex];
        stimulusImage.classList.remove("hidden");
        startTime = new Date().getTime();
    } else {
        // Passa al gruppo successivo
        currentGroupIndex++;
        currentStimulusIndex = 0;
        if (currentGroupIndex < groups.length) {
            showNextStimulus();
        } else {
            endTest();
        }
    }
}

// Gestione della risposta
document.addEventListener("keydown", (event) => {
    if (event.key === "E" || event.key === "I") {
        if (startTime) {
            const group = groups[currentGroupIndex];
            const reactionTime = new Date().getTime() - startTime;
            const isCorrect = checkResponse(event.key, group);
            results.push({
                group: group.name,
                stimulus: group.stimuli[currentStimulusIndex],
                response: event.key,
                correct: isCorrect,
                reactionTime: reactionTime
            });
            currentStimulusIndex++;
            showNextStimulus();
        }
    }
});

function checkResponse(key, group) {
    const positiveKeys = "E";
    const negativeKeys = "I";
    if (key === positiveKeys && currentStimulusIndex < 2) {
        return true; // Immagini positive
    } else if (key === negativeKeys && currentStimulusIndex >= 2) {
        return true; // Immagini negative
    }
    return false;
}

function endTest() {
    stimulusImage.classList.add("hidden");
    groupNameElement.textContent = "Test completato!";
    console.log("Risultati del test:");
    console.table(results);
}