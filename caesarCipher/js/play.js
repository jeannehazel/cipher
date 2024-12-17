const problems = {
  1: { text: "uhdolwb", shift: "+3", hint: "What we perceive as true." }, // reality
  2: { text: "vbvwhp", shift: "+3", hint: "A structured set of interconnected components." }, // system
  3: { text: "iohxu", shift: "+3", hint: "A French word for flower." }, // fleur
  4: { text: "prqhb", shift: "+3", hint: "Used for transactions." }, // money
  5: { text: "olih", shift: "+3", hint: "The essence of existence." }, // life
  6: { text: "ohgf", shift: "+7", hint: "Slightly blurry or foggy." }, // hazy
  7: { text: "edbtvgpcpit", shift: "+15", hint: "A fruit with juicy seeds." }, // pomegranate
  8: { text: "jpwoly", shift: "+7", hint: "A secretive code system." }, // cipher
  9: { text: "ofhjpuao", shift: "+7", hint: "A fragrant flower." }, // hyacinth
  10: { text: "vpxp", shift: "+15", hint: "A mythological Earth mother." }, // gaia
  11: { text: "otkbgqhstcd", shift: "+25", hint: "A word for great physical beauty." }, // pulchritude
  12: { text: "dktte", shift: "+19", hint: "A traditional African village." }, // kraal
  13: { text: "fecfeki", shift: "+16", hint: "Someone who acts self-important." }, // pompous
  14: { text: "vnvdhew", shift: "+19", hint: "A husband whose spouse is unfaithful." }, // cuckold
  15: { text: "zuffuws", shift: "+20", hint: "A mistaken belief or error in reasoning." } // fallacy
};

let currentLevel = 1;
let completedLevels = [];

// Start a level
function startLevel(level) {
  const problem = problems[level];
  if (!problem) {
    alert("This level is not available!");
    return;
  }

  currentLevel = level;
  document.getElementById("levelSolver").style.display = "flex";
  document.getElementById("problemText").innerHTML = `<strong>${problem.text}</strong>`;
  document.getElementById("problemShift").textContent = `Shift: ${problem.shift}`;
  document.getElementById("hintText").textContent = problem.hint;
  document.getElementById("userAnswer").value = ""; 
  updateLevelButtons();
}

function closeLevelSolver() {
  document.getElementById("levelSolver").style.display = "none";
  currentLevel = null;
}

function toggleHint() {
  const hintText = document.getElementById("hintText");
  const hintIcon = document.getElementById("hintIcon");
  if (hintText.style.visibility === "visible") {
    hintText.style.visibility = "hidden";
    hintIcon.textContent = "💡";
  } else {
    hintText.style.visibility = "visible";
    hintIcon.textContent = "❌";
  }
}

// Check user answer
function checkAnswer() {
  const userAnswer = document.getElementById("userAnswer").value.trim().toLowerCase();
  const correctAnswer = getAnswerForLevel(currentLevel);

  const answerChecker = document.querySelector('.answerChecker p');
  
  if (userAnswer === correctAnswer) {
    answerChecker.textContent = "Correct!";
    answerChecker.style.color = "green";
    
    markLevelAsCompleted(currentLevel);
    
    // Unlock the next level
    const nextLevel = currentLevel + 1;
    if (problems[nextLevel]) {
      unlockLevel(nextLevel);
      startLevel(nextLevel);
    } else {
      answerChecker.textContent = "Congratulations! You've completed all levels!";
      answerChecker.style.color = "white";
    }
  } else {
    answerChecker.textContent = "Incorrect. Try again!";
    answerChecker.style.color = "red";
  }
  document.getElementById("userAnswer").value = "";
}

// Decode answers (Caesar Cipher shift logic)
function getAnswerForLevel(level) {
  const answers = {
    1: "reality",
    2: "system",
    3: "fleur",
    4: "money",
    5: "life",
    6: "hazy",
    7: "pomegranate",
    8: "cipher",
    9: "hyacinth",
    10: "gaia",
    11: "pulchritude",
    12: "kraal",
    13: "pompous",
    14: "cuckold",
    15: "fallacy"
  };
  return answers[level];
}

function markLevelAsCompleted(level) {
  if (!completedLevels.includes(level)) {
    completedLevels.push(level);
  }
}

function unlockLevel(level) {
  const button = document.querySelector(`button[level="${level}"]`);
  if (button) {
    button.disabled = false;
    button.style.backgroundColor = "#a97103"; // Set unlocked color
  }
}

// Update level buttons based on completion status
function updateLevelButtons() {
  document.querySelectorAll('.level-btn').forEach(button => {
    const level = parseInt(button.textContent);

    if (completedLevels.includes(level)) {
      button.style.backgroundColor = "green"; // Completed levels
      button.disabled = true;
    } else if (level === 1 || completedLevels.includes(level - 1)) {
      button.disabled = false;
      button.style.backgroundColor = "#a97103"; // Unlocked levels
    } else {
      button.disabled = true;
      button.style.backgroundColor = "#555"; // Locked levels
    }
  });
}

// Initial setup
document.addEventListener("DOMContentLoaded", function() {
  const levelButtons = document.querySelectorAll(".level-btn");
  levelButtons.forEach(button => {
    const level = parseInt(button.textContent);
    button.setAttribute("level", level);
    button.addEventListener("click", () => startLevel(level));
  });

  // Lock all levels except Level 1
  completedLevels = [];
  unlockLevel(1);
  updateLevelButtons();
});
