const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const nextButton = document.getElementById("next-button");
const chapterLabel = document.getElementById("chapter-label");
const sceneVisual = document.getElementById("scene-visual");
const sceneCaption = document.getElementById("scene-caption");
const characterPortrait = document.getElementById("character-portrait");
const characterRole = document.getElementById("character-role");
const characterName = document.getElementById("character-name");
const speakerLine = document.getElementById("speaker-line");
const dialogueText = document.getElementById("dialogue-text");
const choicesBox = document.getElementById("choices");

let state = {
  sceneId: "start",
  lineIndex: 0
};

function showStartScreen() {
  startScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  state = { sceneId: "start", lineIndex: 0 };
}

function startStory() {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  state = { sceneId: "start", lineIndex: 0 };
  renderScene();
}

function setScene(sceneId) {
  state.sceneId = sceneId;
  state.lineIndex = 0;
  renderScene();
}

function renderScene() {
  const scene = story[state.sceneId];
  const line = scene.lines[state.lineIndex];
  const speaker = characters[line.speaker];

  chapterLabel.textContent = scene.chapter;
  sceneCaption.textContent = scene.location;
  sceneVisual.style.background = `
    linear-gradient(135deg, rgba(3, 9, 18, 0.9), rgba(7, 18, 32, 0.64)),
    radial-gradient(circle at 20% 20%, rgba(109, 220, 255, 0.14), transparent 28%),
    linear-gradient(120deg, rgba(255, 255, 255, 0.05), transparent 35%),
    url("${scene.background}") center 20% / cover
  `;

  characterPortrait.src = speaker.portrait;
  characterPortrait.alt = speaker.name;
  characterRole.textContent = speaker.role;
  characterName.textContent = speaker.name;
  speakerLine.textContent = speaker.name;
  dialogueText.textContent = line.text;

  const lastLine = state.lineIndex === scene.lines.length - 1;
  const hasChoices = Array.isArray(scene.choices) && scene.choices.length > 0;

  choicesBox.innerHTML = "";
  choicesBox.classList.add("hidden");

  if (lastLine && hasChoices) {
    nextButton.classList.add("hidden");
    choicesBox.classList.remove("hidden");

    scene.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button";
      button.textContent = choice.label;
      button.addEventListener("click", () => setScene(choice.next));
      choicesBox.appendChild(button);
    });
  } else {
    nextButton.classList.remove("hidden");
  }
}

function nextLine() {
  const scene = story[state.sceneId];

  if (state.lineIndex < scene.lines.length - 1) {
    state.lineIndex += 1;
    renderScene();
  }
}

startButton.addEventListener("click", startStory);
restartButton.addEventListener("click", showStartScreen);
nextButton.addEventListener("click", nextLine);

showStartScreen();
