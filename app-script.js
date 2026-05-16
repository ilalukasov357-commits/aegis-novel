const STORAGE_KEY = "aegis-protocol-unlocked";

const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const startButton = document.getElementById("start-button");
const menuCharactersButton = document.getElementById("menu-characters-button");
const exitButton = document.getElementById("exit-button");
const chapterLabel = document.getElementById("chapter-label");
const pauseButton = document.getElementById("pause-button");
const sceneVisual = document.getElementById("scene-visual");
const sceneCharacter = document.getElementById("scene-character");
const sceneCaption = document.getElementById("scene-caption");
const speakerName = document.getElementById("speaker-name");
const dialogueText = document.getElementById("dialogue-text");
const choiceFeedback = document.getElementById("choice-feedback");
const nextButton = document.getElementById("next-button");
const choicesBox = document.getElementById("choices");
const inGameCharactersButton = document.getElementById("in-game-characters-button");
const charactersOverlay = document.getElementById("characters-overlay");
const closeCharactersButton = document.getElementById("close-characters-button");
const characterGrid = document.getElementById("character-grid");
const pauseOverlay = document.getElementById("pause-overlay");
const resumeButton = document.getElementById("resume-button");
const pauseCharactersButton = document.getElementById("pause-characters-button");
const backToMenuButton = document.getElementById("back-to-menu-button");

let state = {
  sceneId: "start",
  lineIndex: 0,
  questionFeedback: null,
  unlocked: loadUnlockedCharacters()
};

function loadUnlockedCharacters() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : ["wolf"];
    return Array.isArray(parsed) ? parsed : ["wolf"];
  } catch {
    return ["wolf"];
  }
}

function saveUnlockedCharacters() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.unlocked));
}

function unlockCharacter(characterId) {
  if (!characterId || state.unlocked.includes(characterId)) {
    return;
  }

  state.unlocked.push(characterId);
  saveUnlockedCharacters();
  renderCharacterCodex();
}

function showMenu() {
  menuScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  pauseOverlay.classList.add("hidden");
}

function startStory() {
  menuScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  pauseOverlay.classList.add("hidden");
  state.sceneId = "start";
  state.lineIndex = 0;
  state.questionFeedback = null;
  renderScene();
}

function setScene(sceneId) {
  state.sceneId = sceneId;
  state.lineIndex = 0;
  state.questionFeedback = null;
  renderScene();
}

function renderScene() {
  const scene = story[state.sceneId];
  const line = scene.lines[state.lineIndex];
  const speaker = line.type === "question" ? characters.narrator : characters[line.speaker];
  const activeCharacterId = line.type === "question"
    ? scene.defaultCharacter
    : (line.sceneCharacter || scene.defaultCharacter || line.speaker);
  const activeCharacter = characters[activeCharacterId];

  if (line.unlock) {
    unlockCharacter(line.unlock);
  }

  chapterLabel.textContent = scene.chapter;
  sceneCaption.textContent = scene.location;
  speakerName.textContent = speaker.name;
  dialogueText.textContent = line.type === "question" ? line.prompt : line.text;
  sceneCharacter.src = activeCharacter.portrait;
  sceneCharacter.alt = activeCharacter.name;

  sceneVisual.style.background = `
    linear-gradient(135deg, rgba(4, 11, 20, 0.84), rgba(7, 18, 32, 0.55)),
    radial-gradient(circle at 20% 20%, rgba(121, 228, 255, 0.15), transparent 28%),
    linear-gradient(120deg, rgba(255, 255, 255, 0.04), transparent 36%),
    url("${scene.background}") center 18% / cover
  `;

  choicesBox.innerHTML = "";
  choicesBox.classList.add("hidden");
  choiceFeedback.textContent = "";
  choiceFeedback.classList.add("hidden");

  if (line.type === "question") {
    nextButton.classList.add("hidden");
    choicesBox.classList.remove("hidden");

    if (state.questionFeedback) {
      choiceFeedback.textContent = state.questionFeedback.join("\n");
      choiceFeedback.classList.remove("hidden");
    }

    line.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button";
      button.textContent = `${index + 1}. ${option}`;
      button.addEventListener("click", () => handleQuestionAnswer(index));
      choicesBox.appendChild(button);
    });

    return;
  }

  const isLastLine = state.lineIndex === scene.lines.length - 1;
  const hasChoices = Array.isArray(scene.choices) && scene.choices.length > 0;

  if (isLastLine && hasChoices) {
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

function handleQuestionAnswer(selectedIndex) {
  const scene = story[state.sceneId];
  const line = scene.lines[state.lineIndex];

  if (selectedIndex === line.correctAnswer) {
    state.questionFeedback = null;
    state.lineIndex += 1;
    renderScene();
    return;
  }

  state.questionFeedback = line.wrongFeedback;
  renderScene();
}

function nextLine() {
  const scene = story[state.sceneId];

  if (state.lineIndex < scene.lines.length - 1) {
    state.lineIndex += 1;
    state.questionFeedback = null;
    renderScene();
  }
}

function renderCharacterCodex() {
  characterGrid.innerHTML = "";

  codexOrder.forEach((characterId) => {
    const character = characters[characterId];
    const unlocked = state.unlocked.includes(characterId);
    const card = document.createElement("article");
    card.className = `character-entry${unlocked ? "" : " locked"}`;

    card.innerHTML = `
      <img src="${character.portrait}" alt="${unlocked ? character.name : "Засекреченный профиль"}">
      <div class="character-entry-body">
        <span class="panel-label">${unlocked ? "Профиль открыт" : "Доступ закрыт"}</span>
        <h3>${unlocked ? character.name : "Неизвестный персонаж"}</h3>
        <p>${unlocked ? character.role : "Персонаж появится в сюжете и после этого откроется в меню."}</p>
        ${unlocked ? `<p>${character.bio}</p>` : '<div class="locked-badge">Заблокировано</div>'}
      </div>
    `;

    characterGrid.appendChild(card);
  });
}

function openCharacters() {
  renderCharacterCodex();
  charactersOverlay.classList.remove("hidden");
}

function closeCharacters() {
  charactersOverlay.classList.add("hidden");
}

function openPause() {
  pauseOverlay.classList.remove("hidden");
}

function closePause() {
  pauseOverlay.classList.add("hidden");
}

function handleExit() {
  window.close();

  if (!window.closed) {
    window.location.href = "about:blank";
  }
}

startButton.addEventListener("click", startStory);
menuCharactersButton.addEventListener("click", openCharacters);
inGameCharactersButton.addEventListener("click", openCharacters);
pauseCharactersButton.addEventListener("click", () => {
  closePause();
  openCharacters();
});
closeCharactersButton.addEventListener("click", closeCharacters);
pauseButton.addEventListener("click", openPause);
resumeButton.addEventListener("click", closePause);
backToMenuButton.addEventListener("click", () => {
  closePause();
  showMenu();
});
exitButton.addEventListener("click", handleExit);
nextButton.addEventListener("click", nextLine);

charactersOverlay.addEventListener("click", (event) => {
  if (event.target === charactersOverlay) {
    closeCharacters();
  }
});

pauseOverlay.addEventListener("click", (event) => {
  if (event.target === pauseOverlay) {
    closePause();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!charactersOverlay.classList.contains("hidden")) {
      closeCharacters();
      return;
    }

    if (!gameScreen.classList.contains("hidden")) {
      if (pauseOverlay.classList.contains("hidden")) {
        openPause();
      } else {
        closePause();
      }
    }
  }
});

renderCharacterCodex();
showMenu();
