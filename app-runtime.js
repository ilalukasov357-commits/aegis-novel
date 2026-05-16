const STORAGE_KEY = "aegis-protocol-unlocked";
const PROGRESS_KEY = "aegis-protocol-progress";
const DISCLAIMER_KEY = "aegis-protocol-disclaimer-seen";
const INITIAL_SCENE_ID = "robert-brief";
const INTRO_REVEAL_DURATION = 2600;
const SCREEN_LEAVE_DURATION = 260;
const SCREEN_ENTER_DURATION = 520;
const OVERLAY_TRANSITION_DURATION = 320;
const CHAPTER_SPLASH_TRANSITION_DURATION = 520;

const menuScreen = document.getElementById("menu-screen");
const gameScreen = document.getElementById("game-screen");
const startButton = document.getElementById("start-button");
const menuChaptersButton = document.getElementById("menu-chapters-button");
const menuCharactersButton = document.getElementById("menu-characters-button");
const resetProgressButton = document.getElementById("reset-progress-button");
const exitButton = document.getElementById("exit-button");
const chapterLabel = document.getElementById("chapter-label");
const pauseButton = document.getElementById("pause-button");
const menuBackdrop = document.getElementById("menu-backdrop");
const menuHero = document.getElementById("menu-hero");
const sceneVisual = document.getElementById("scene-visual");
const sceneBackdrop = document.getElementById("scene-backdrop");
const sceneBackdropPrev = document.getElementById("scene-backdrop-prev");
const sceneCharacterWrap = document.getElementById("scene-character-wrap");
const sceneCharacter = document.getElementById("scene-character");
const sceneCaption = document.getElementById("scene-caption");
const testPanel = document.getElementById("test-panel");
const storyPopup = document.getElementById("story-popup");
const speakerName = document.getElementById("speaker-name");
const dialogueText = document.getElementById("dialogue-text");
const dialogueBox = document.querySelector(".dialogue-box");
const choiceFeedback = document.getElementById("choice-feedback");
const nextButton = document.getElementById("next-button");
const choicesBox = document.getElementById("choices");
const inGameCharactersButton = document.getElementById("in-game-characters-button");
const characterIntro = document.getElementById("character-intro");
const characterIntroName = document.getElementById("character-intro-name");
const characterIntroRole = document.getElementById("character-intro-role");
const characterIntroImage = document.getElementById("character-intro-image");
const chaptersOverlay = document.getElementById("chapters-overlay");
const closeChaptersButton = document.getElementById("close-chapters-button");
const chaptersGrid = document.getElementById("chapters-grid");
const disclaimerOverlay = document.getElementById("disclaimer-overlay");
const disclaimerNextButton = document.getElementById("disclaimer-next-button");
const charactersOverlay = document.getElementById("characters-overlay");
const closeCharactersButton = document.getElementById("close-characters-button");
const characterGrid = document.getElementById("character-grid");
const characterDetailOverlay = document.getElementById("character-detail-overlay");
const closeCharacterDetailButton = document.getElementById("close-character-detail-button");
const characterDetailBackdrop = document.getElementById("character-detail-backdrop");
const characterDetailImage = document.getElementById("character-detail-image");
const characterDetailStatus = document.getElementById("character-detail-status");
const characterDetailName = document.getElementById("character-detail-name");
const characterDetailRole = document.getElementById("character-detail-role");
const characterDetailBio = document.getElementById("character-detail-bio");
const pauseOverlay = document.getElementById("pause-overlay");
const resumeButton = document.getElementById("resume-button");
const pauseCharactersButton = document.getElementById("pause-characters-button");
const pauseResetButton = document.getElementById("pause-reset-button");
const backToMenuButton = document.getElementById("back-to-menu-button");
const chapterSplash = document.getElementById("chapter-splash");
const chapterSplashNumber = document.getElementById("chapter-splash-number");
const chapterSplashTitle = document.getElementById("chapter-splash-title");
const chapterSplashSubtitle = document.getElementById("chapter-splash-subtitle");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(pointer: fine)");
const chapterMenuEntries = [
  {
    sceneId: "robert-brief",
    description: "Ночной дождь, странное письмо и первое решение, с которого начинается путь в Aegis."
  },
  {
    sceneId: "chapter-2-social",
    description: "Первое входное тестирование: шесть вопросов, которые показывают реальный уровень подготовки."
  },
  {
    sceneId: "start",
    description: "Оперативный зал, появление Мавро и локализация вторжения в реальном времени."
  }
];
let pendingStoryStart = null;
let activeSceneBackground = "";
let backgroundSwapTimeoutId = null;

let state = {
  sceneId: INITIAL_SCENE_ID,
  lineIndex: 0,
  questionFeedback: null,
  questionFeedbackType: null,
  selectedAnswerIndex: null,
  lockedQuestion: false,
  testAnswers: [],
  testCompleted: false,
  testExpandedIndex: null,
  incidentGameStep: 0,
  incidentGameThreat: 100,
  incidentGameCorrect: 0,
  incidentGameSelected: null,
  incidentGameFeedback: null,
  incidentGameFeedbackType: null,
  incidentGameLocked: false,
  incidentGameCompleted: false,
  unlocked: loadUnlockedCharacters(),
  introTimeoutId: null,
  questionAdvanceTimeoutId: null
};

function loadUnlockedCharacters() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUnlockedCharacters() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.unlocked));
}

function loadStoryProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;

    if (!parsed || typeof parsed !== "object" || !story[parsed.sceneId]) {
      return { sceneId: INITIAL_SCENE_ID, lineIndex: 0 };
    }

    return {
      sceneId: parsed.sceneId,
      lineIndex: Number.isInteger(parsed.lineIndex) && parsed.lineIndex >= 0 ? parsed.lineIndex : 0
    };
  } catch {
    return { sceneId: INITIAL_SCENE_ID, lineIndex: 0 };
  }
}

function saveStoryProgress() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({
    sceneId: state.sceneId,
    lineIndex: state.lineIndex
  }));
}

function clearQuestionAdvanceTimeout() {
  if (!state.questionAdvanceTimeoutId) {
    return;
  }

  window.clearTimeout(state.questionAdvanceTimeoutId);
  state.questionAdvanceTimeoutId = null;
}

function updateStartButtonLabel() {
  const progress = loadStoryProgress();
  const isFreshStart = progress.sceneId === INITIAL_SCENE_ID && progress.lineIndex === 0;
  startButton.textContent = isFreshStart ? "ИГРАТЬ" : "ПРОДОЛЖИТЬ";
}

function showChapterSplash(scene, subtitleOverride = null) {
  const chapterNumber = scene.chapterNumber ? `Глава ${scene.chapterNumber}` : "Глава";
  const progress = loadStoryProgress();
  const isFreshStart = progress.sceneId === INITIAL_SCENE_ID && progress.lineIndex === 0;

  chapterSplashNumber.textContent = chapterNumber;
  chapterSplashTitle.textContent = scene.chapter;
  chapterSplashSubtitle.textContent = subtitleOverride || (isFreshStart
    ? "Начало истории"
    : "Продолжаем с момента, на котором вы остановились");

  chapterSplash.classList.remove("hidden");
  requestAnimationFrame(() => {
    chapterSplash.classList.add("is-visible");
  });
}

function hideChapterSplash() {
  chapterSplash.classList.remove("is-visible");

  window.setTimeout(() => {
    chapterSplash.classList.add("hidden");
  }, CHAPTER_SPLASH_TRANSITION_DURATION);
}

function unlockCharacter(characterId) {
  if (!characterId || state.unlocked.includes(characterId)) {
    return false;
  }

  state.unlocked.push(characterId);
  saveUnlockedCharacters();
  renderCharacterCodex();
  return true;
}

function playScreenTransition(fromScreen, toScreen) {
  if (fromScreen && !fromScreen.classList.contains("hidden")) {
    fromScreen.classList.add("is-leaving");

    window.setTimeout(() => {
      fromScreen.classList.remove("is-leaving");
      fromScreen.classList.add("hidden");
    }, SCREEN_LEAVE_DURATION);
  }

  toScreen.classList.remove("hidden");
  toScreen.classList.add("is-entering");

  window.setTimeout(() => {
    toScreen.classList.remove("is-entering");
  }, SCREEN_ENTER_DURATION);
}

function openOverlay(overlay) {
  overlay.classList.remove("hidden");
  requestAnimationFrame(() => {
    overlay.classList.add("is-visible");
  });
}

function closeOverlay(overlay) {
  if (overlay.classList.contains("hidden")) {
    return;
  }

  overlay.classList.remove("is-visible");

  window.setTimeout(() => {
    overlay.classList.add("hidden");
  }, OVERLAY_TRANSITION_DURATION);
}

function hideCharacterReveal(immediate = false) {
  if (state.introTimeoutId) {
    window.clearTimeout(state.introTimeoutId);
    state.introTimeoutId = null;
  }

  characterIntro.classList.remove("is-visible");

  if (immediate) {
    characterIntro.classList.add("hidden");
    return;
  }

  window.setTimeout(() => {
    characterIntro.classList.add("hidden");
  }, 520);
}

function showCharacterReveal(characterId) {
  const character = characters[characterId];

  if (!character) {
    return;
  }

  hideCharacterReveal(true);
  characterIntroName.textContent = character.name;
  characterIntroRole.textContent = character.role;
  characterIntroImage.src = character.portrait;
  characterIntroImage.alt = character.name;
  characterIntro.classList.remove("hidden");

  requestAnimationFrame(() => {
    characterIntro.classList.add("is-visible");
  });

  state.introTimeoutId = window.setTimeout(() => {
    hideCharacterReveal();
  }, INTRO_REVEAL_DURATION);
}

function animateSceneRefresh() {
  sceneVisual.classList.remove("is-refreshing");
  dialogueBox.classList.remove("is-refreshing");
  void sceneVisual.offsetWidth;
  sceneVisual.classList.add("is-refreshing");
  dialogueBox.classList.add("is-refreshing");
}

function initializeParallax(container, layers) {
  if (!container || prefersReducedMotion.matches || !finePointer.matches) {
    return;
  }

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let frameId = null;

  const render = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    layers.forEach(({ element, depthX, depthY }) => {
      if (!element) {
        return;
      }

      element.style.setProperty("--parallax-x", `${(currentX * depthX).toFixed(2)}px`);
      element.style.setProperty("--parallax-y", `${(currentY * depthY).toFixed(2)}px`);
    });

    const isSettled =
      Math.abs(targetX - currentX) < 0.08 &&
      Math.abs(targetY - currentY) < 0.08 &&
      Math.abs(currentX) < 0.08 &&
      Math.abs(currentY) < 0.08;

    if (isSettled) {
      frameId = null;
      return;
    }

    frameId = window.requestAnimationFrame(render);
  };

  const queueRender = () => {
    if (!frameId) {
      frameId = window.requestAnimationFrame(render);
    }
  };

  container.addEventListener("pointermove", (event) => {
    const bounds = container.getBoundingClientRect();
    const normalizedX = ((event.clientX - bounds.left) / bounds.width) - 0.5;
    const normalizedY = ((event.clientY - bounds.top) / bounds.height) - 0.5;

    targetX = normalizedX * 20;
    targetY = normalizedY * 20;
    queueRender();
  });

  container.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    queueRender();
  });
}

function resetStateToStart() {
  state.sceneId = INITIAL_SCENE_ID;
  state.lineIndex = 0;
  state.questionFeedback = null;
  state.questionFeedbackType = null;
  state.selectedAnswerIndex = null;
  state.lockedQuestion = false;
  state.testAnswers = [];
  state.testCompleted = false;
  state.testExpandedIndex = null;
  state.incidentGameStep = 0;
  state.incidentGameThreat = 100;
  state.incidentGameCorrect = 0;
  state.incidentGameSelected = null;
  state.incidentGameFeedback = null;
  state.incidentGameFeedbackType = null;
  state.incidentGameLocked = false;
  state.incidentGameCompleted = false;
  clearQuestionAdvanceTimeout();
}

function showMenu() {
  playScreenTransition(gameScreen, menuScreen);
  closeOverlay(pauseOverlay);
  closeOverlay(chaptersOverlay);
  closeOverlay(charactersOverlay);
  closeOverlay(characterDetailOverlay);
  hideCharacterReveal(true);
  hideChapterSplash();
  clearQuestionAdvanceTimeout();
  updateStartButtonLabel();
}

function beginStory(sceneId, lineIndex = 0, subtitle) {
  state.sceneId = sceneId;
  state.lineIndex = lineIndex;
  state.questionFeedback = null;
  state.questionFeedbackType = null;
  state.selectedAnswerIndex = null;
  state.lockedQuestion = false;
  state.testAnswers = [];
  state.testCompleted = false;
  state.testExpandedIndex = null;
  state.incidentGameStep = 0;
  state.incidentGameThreat = 100;
  state.incidentGameCorrect = 0;
  state.incidentGameSelected = null;
  state.incidentGameFeedback = null;
  state.incidentGameFeedbackType = null;
  state.incidentGameLocked = false;
  state.incidentGameCompleted = false;
  clearQuestionAdvanceTimeout();
  saveStoryProgress();

  showChapterSplash(story[state.sceneId] || story[INITIAL_SCENE_ID], subtitle);

  window.setTimeout(() => {
    playScreenTransition(menuScreen, gameScreen);
    closeOverlay(chaptersOverlay);
    closeOverlay(pauseOverlay);
    renderScene();
  }, 620);

  window.setTimeout(() => {
    hideChapterSplash();
  }, 1580);
}

function startStory() {
  const progress = loadStoryProgress();
  const isFreshStart = progress.sceneId === INITIAL_SCENE_ID && progress.lineIndex === 0;
  const subtitle = isFreshStart
    ? "Начало истории"
    : "Продолжаем с момента, на котором вы остановились";

  if (isFreshStart && !localStorage.getItem(DISCLAIMER_KEY)) {
    pendingStoryStart = { sceneId: progress.sceneId, lineIndex: progress.lineIndex, subtitle };
    openOverlay(disclaimerOverlay);
    return;
  }

  beginStory(progress.sceneId, progress.lineIndex, subtitle);
}

function continueAfterDisclaimer() {
  localStorage.setItem(DISCLAIMER_KEY, "true");
  closeOverlay(disclaimerOverlay);

  const nextStart = pendingStoryStart || {
    sceneId: INITIAL_SCENE_ID,
    lineIndex: 0,
    subtitle: "Начало истории"
  };

  pendingStoryStart = null;

  window.setTimeout(() => {
    beginStory(nextStart.sceneId, nextStart.lineIndex, nextStart.subtitle);
  }, OVERLAY_TRANSITION_DURATION);
}

function startChapter(sceneId) {
  const scene = story[sceneId];

  if (!scene) {
    return;
  }

  beginStory(sceneId, 0, `Переход к главе ${scene.chapterNumber}`);
}

function setScene(sceneId) {
  state.sceneId = sceneId;
  state.lineIndex = 0;
  state.questionFeedback = null;
  state.questionFeedbackType = null;
  state.selectedAnswerIndex = null;
  state.lockedQuestion = false;
  state.testAnswers = [];
  state.testCompleted = false;
  state.testExpandedIndex = null;
  state.incidentGameStep = 0;
  state.incidentGameThreat = 100;
  state.incidentGameCorrect = 0;
  state.incidentGameSelected = null;
  state.incidentGameFeedback = null;
  state.incidentGameFeedbackType = null;
  state.incidentGameLocked = false;
  state.incidentGameCompleted = false;
  clearQuestionAdvanceTimeout();
  renderScene();
}

function getActiveSceneVisual(scene, lineIndex) {
  const visual = {
    background: scene.background,
    backgroundPosition: scene.backgroundPosition || "center center",
    backgroundSize: scene.backgroundSize || "cover",
    location: scene.location
  };

  for (let index = 0; index <= lineIndex; index += 1) {
    const line = scene.lines[index];

    if (!line) {
      continue;
    }

    if (line.background) {
      visual.background = line.background;
    }

    if (line.backgroundPosition) {
      visual.backgroundPosition = line.backgroundPosition;
    }

    if (line.backgroundSize) {
      visual.backgroundSize = line.backgroundSize;
    }

    if (line.location) {
      visual.location = line.location;
    }
  }

  return visual;
}

function renderScene() {
  const scene = story[state.sceneId] || story[INITIAL_SCENE_ID];
  const line = scene.lines[state.lineIndex] || scene.lines[0];
  const isTest = line.type === "test";
  const isPopup = line.type === "popup";
  const isIncidentGame = line.type === "incidentGame";
  const speaker = line.type === "question" || isTest || isPopup || isIncidentGame
    ? characters.narrator
    : characters[line.speaker];
  const isNarration = Boolean(line.narration);
  const isNewUnlock = line.unlock ? unlockCharacter(line.unlock) : false;
  const sceneVisualState = getActiveSceneVisual(scene, state.lineIndex);

  if (isNewUnlock) {
    showCharacterReveal(line.unlock);
  }

  chapterLabel.textContent = scene.chapter;
  sceneCaption.textContent = sceneVisualState.location;
  speakerName.textContent = isNarration ? "Сцена" : speaker.name;
  dialogueText.textContent = line.type === "question" ? line.prompt : (line.text || "");
  dialogueBox.classList.toggle("is-narration", isNarration);
  dialogueBox.classList.toggle("hidden", isTest || isPopup || isIncidentGame);

  const sceneBackground = sceneVisualState.background;

  if (activeSceneBackground !== sceneBackground) {
    if (activeSceneBackground) {
      sceneBackdropPrev.style.backgroundImage = sceneBackdrop.style.backgroundImage || `url("${activeSceneBackground}")`;
      sceneBackdropPrev.style.backgroundPosition = sceneBackdrop.style.backgroundPosition || sceneVisualState.backgroundPosition;
      sceneBackdropPrev.style.backgroundSize = sceneBackdrop.style.backgroundSize || sceneVisualState.backgroundSize;
      sceneBackdropPrev.style.backgroundRepeat = "no-repeat";
      sceneBackdropPrev.style.setProperty("--parallax-x", sceneBackdrop.style.getPropertyValue("--parallax-x") || "0px");
      sceneBackdropPrev.style.setProperty("--parallax-y", sceneBackdrop.style.getPropertyValue("--parallax-y") || "0px");
      sceneBackdropPrev.classList.add("is-visible");

      sceneVisual.classList.remove("is-bg-crossfade");
      void sceneVisual.offsetWidth;
      sceneVisual.classList.add("is-bg-crossfade");

      if (backgroundSwapTimeoutId) {
        window.clearTimeout(backgroundSwapTimeoutId);
      }

      backgroundSwapTimeoutId = window.setTimeout(() => {
        sceneBackdropPrev.classList.remove("is-visible");
        sceneVisual.classList.remove("is-bg-crossfade");
        backgroundSwapTimeoutId = null;
      }, 740);
    }

    activeSceneBackground = sceneBackground;
  }

  sceneBackdrop.style.backgroundImage = `url("${sceneBackground}")`;
  sceneBackdrop.style.backgroundPosition = sceneVisualState.backgroundPosition;
  sceneBackdrop.style.backgroundSize = sceneVisualState.backgroundSize;
  sceneBackdrop.style.backgroundRepeat = "no-repeat";

  sceneCharacterWrap.classList.add("hidden");
  sceneCharacter.removeAttribute("src");
  sceneCharacter.alt = "";

  choicesBox.innerHTML = "";
  choicesBox.classList.add("hidden");
  choiceFeedback.textContent = "";
  choiceFeedback.classList.remove("is-error", "is-success");
  choiceFeedback.classList.add("hidden");
  testPanel.classList.toggle("hidden", !(isTest || isIncidentGame));
  testPanel.innerHTML = "";
  storyPopup.classList.toggle("hidden", !isPopup);
  storyPopup.innerHTML = "";

  if (isPopup) {
    nextButton.classList.add("hidden");
    renderStoryPopup(line);
  } else if (isIncidentGame) {
    nextButton.classList.add("hidden");
    renderIncidentGamePanel(line);
  } else if (isTest) {
    nextButton.classList.add("hidden");
    renderTestPanel(line);
  } else if (line.type === "question") {
    if (state.questionFeedbackType === "success") {
      nextButton.classList.remove("hidden");
    } else {
      nextButton.classList.add("hidden");
    }
    choicesBox.classList.remove("hidden");

    if (state.questionFeedback) {
      choiceFeedback.textContent = state.questionFeedback.join("\n");
      choiceFeedback.classList.add(state.questionFeedbackType === "success" ? "is-success" : "is-error");
      choiceFeedback.classList.remove("hidden");
    }

    line.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button";
      button.textContent = `${index + 1}. ${option}`;

      if (state.selectedAnswerIndex === index && state.questionFeedbackType === "error") {
        button.classList.add("is-wrong");
      }

      if (state.selectedAnswerIndex === index && state.questionFeedbackType === "success") {
        button.classList.add("is-correct");
      }

      if (state.lockedQuestion) {
        button.disabled = true;
      } else {
        button.addEventListener("click", () => handleQuestionAnswer(index));
      }

      choicesBox.appendChild(button);
    });
  } else {
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
        button.addEventListener("click", () => {
          if (choice.action === "menu") {
            showMenu();
            return;
          }

          setScene(choice.next);
        });
        choicesBox.appendChild(button);
      });
    } else {
      nextButton.classList.remove("hidden");
    }
  }

  saveStoryProgress();
  updateStartButtonLabel();
}

function renderStoryPopup(line) {
  storyPopup.innerHTML = `
    <div class="story-popup-card">
      <div class="story-popup-header">
        <div>
          <p class="panel-label">${line.kicker || "Системное окно"}</p>
          <h3>${line.title || "Просмотр"}</h3>
        </div>
      </div>
      <div class="story-popup-visual">
        <img src="${line.image}" alt="${line.alt || line.title || "Всплывающее окно"}">
      </div>
      <div class="story-popup-actions">
        <button type="button" class="primary-button" id="story-popup-next">Далее</button>
      </div>
    </div>
  `;

  storyPopup.querySelector("#story-popup-next").addEventListener("click", nextLine);
}

function renderIncidentGamePanel(line) {
  const totalSteps = line.questions.length;
  const configuredThreatStart = Number.isFinite(line.threatStart)
    ? Math.max(0, Math.min(100, Number(line.threatStart)))
    : 60;

  if (
    state.incidentGameStep === 0 &&
    !state.incidentGameLocked &&
    !state.incidentGameCompleted &&
    state.incidentGameSelected === null &&
    !state.incidentGameFeedback
  ) {
    state.incidentGameThreat = configuredThreatStart;
  }

  if (state.incidentGameStep >= totalSteps && !state.incidentGameCompleted) {
    state.incidentGameCompleted = true;
  }

  if (state.incidentGameCompleted) {
    const resolved = state.incidentGameCorrect;
    const threatClass = state.incidentGameThreat <= 35 ? "is-safe" : (state.incidentGameThreat <= 65 ? "is-warning" : "is-critical");

    testPanel.innerHTML = `
      <div class="test-card incident-card">
        <div class="test-header">
          <div>
            <p class="panel-label">Локализация завершена</p>
            <h3>${line.title}</h3>
            <p>Угроза локализована. Разбор зафиксирован в журнале оперативного зала.</p>
          </div>
          <div class="test-progress">${resolved}/${totalSteps}</div>
        </div>
        <div class="incident-threat-wrap">
          <div class="incident-threat-label">
            <span>Шкала угрозы</span>
            <span>${state.incidentGameThreat}%</span>
          </div>
          <div class="incident-threat-track ${threatClass}">
            <div class="incident-threat-value" style="width: ${Math.max(0, Math.min(100, state.incidentGameThreat))}%"></div>
          </div>
        </div>
        <div class="test-actions">
          <button type="button" class="primary-button" id="incident-game-next-story">Продолжить сюжет</button>
        </div>
      </div>
    `;

    testPanel.querySelector("#incident-game-next-story").addEventListener("click", advanceAfterIncidentGame);
    return;
  }

  const question = line.questions[state.incidentGameStep];
  const progressText = `${state.incidentGameStep + 1}/${totalSteps}`;
  const threatClass = state.incidentGameThreat <= 35 ? "is-safe" : (state.incidentGameThreat <= 65 ? "is-warning" : "is-critical");
  const feedbackClass = state.incidentGameFeedbackType === "success" ? "is-success" : "is-error";
  const feedbackHtml = state.incidentGameFeedback
    ? `<p class="choice-feedback ${feedbackClass}">${state.incidentGameFeedback.join("<br>")}</p>`
    : "";

  testPanel.innerHTML = `
    <div class="test-card incident-card">
      <div class="test-header">
        <div>
          <p class="panel-label">${line.title}</p>
          <h3>${line.progressLabel || "Шаг"} ${state.incidentGameStep + 1}</h3>
          <p>${line.subtitle || ""}</p>
        </div>
        <div class="test-progress">${progressText}</div>
      </div>
      <div class="incident-threat-wrap">
        <div class="incident-threat-label">
          <span>Шкала угрозы</span>
          <span>${state.incidentGameThreat}%</span>
        </div>
        <div class="incident-threat-track ${threatClass}">
          <div class="incident-threat-value" style="width: ${Math.max(0, Math.min(100, state.incidentGameThreat))}%"></div>
        </div>
      </div>
      <article class="test-question incident-question">
        <div class="test-question-topline">
          <span>Вопрос ${state.incidentGameStep + 1}</span>
          <span>${state.incidentGameLocked ? "Ответ зафиксирован" : "Ожидается выбор"}</span>
        </div>
        <h4>${question.prompt}</h4>
        <p class="incident-hint">${question.hint || "Сверяй действие с логами и уровнем риска."}</p>
        <div class="test-options"></div>
        ${feedbackHtml}
      </article>
      <div class="test-actions">
        ${state.incidentGameLocked
          ? `<button type="button" class="primary-button" id="incident-game-next-step">${state.incidentGameStep === totalSteps - 1 ? "Завершить локализацию" : "Следующий шаг"}</button>`
          : ""}
      </div>
    </div>
  `;

  const optionsRoot = testPanel.querySelector(".test-options");

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `test-option${state.incidentGameSelected === optionIndex ? " is-selected" : ""}`;
    button.textContent = `${optionIndex + 1}. ${option}`;
    button.disabled = state.incidentGameLocked;

    if (!state.incidentGameLocked) {
      button.addEventListener("click", () => handleIncidentGameAnswer(line, optionIndex));
    }

    optionsRoot.appendChild(button);
  });

  if (state.incidentGameLocked) {
    testPanel.querySelector("#incident-game-next-step").addEventListener("click", continueIncidentGame);
  }
}

function handleIncidentGameAnswer(line, optionIndex) {
  if (state.incidentGameLocked || state.incidentGameCompleted) {
    return;
  }

  const question = line.questions[state.incidentGameStep];
  const isCorrect = optionIndex === question.correctAnswer;
  const correctThreatDelta = Number.isFinite(question.correctThreatDelta) ? Number(question.correctThreatDelta) : -14;
  const wrongThreatDelta = Number.isFinite(question.wrongThreatDelta) ? Number(question.wrongThreatDelta) : 12;

  state.incidentGameSelected = optionIndex;
  state.incidentGameLocked = true;
  state.incidentGameFeedbackType = isCorrect ? "success" : "error";
  state.incidentGameFeedback = isCorrect ? (question.correctFeedback || ["Верно."]) : (question.wrongFeedback || ["Неверно."]);
  state.incidentGameThreat = Math.max(
    0,
    Math.min(100, state.incidentGameThreat + (isCorrect ? correctThreatDelta : wrongThreatDelta))
  );

  if (isCorrect) {
    state.incidentGameCorrect += 1;
  }

  renderIncidentGamePanel(line);
}

function continueIncidentGame() {
  const scene = story[state.sceneId];
  const line = scene.lines[state.lineIndex];
  const totalSteps = line.questions.length;

  if (state.incidentGameStep >= totalSteps - 1) {
    state.incidentGameCompleted = true;
    state.incidentGameLocked = false;
    state.incidentGameSelected = null;
    state.incidentGameFeedback = null;
    state.incidentGameFeedbackType = null;
    renderIncidentGamePanel(line);
    return;
  }

  state.incidentGameStep += 1;
  state.incidentGameLocked = false;
  state.incidentGameSelected = null;
  state.incidentGameFeedback = null;
  state.incidentGameFeedbackType = null;
  renderIncidentGamePanel(line);
}

function advanceAfterIncidentGame() {
  const scene = story[state.sceneId];

  if (state.lineIndex >= scene.lines.length - 1) {
    return;
  }

  state.lineIndex += 1;
  state.incidentGameStep = 0;
  state.incidentGameThreat = 100;
  state.incidentGameCorrect = 0;
  state.incidentGameSelected = null;
  state.incidentGameFeedback = null;
  state.incidentGameFeedbackType = null;
  state.incidentGameLocked = false;
  state.incidentGameCompleted = false;
  renderScene();
}

function renderTestPanel(line) {
  if (state.testAnswers.length !== line.questions.length) {
    state.testAnswers = Array(line.questions.length).fill(null);
    state.testCompleted = false;
    state.testExpandedIndex = null;
  }

  const answeredCount = state.testAnswers.filter((answer) => answer !== null).length;

  if (!state.testCompleted) {
    testPanel.innerHTML = `
      <div class="test-card test-card-active">
        <div class="test-header">
          <div>
            <p class="panel-label">${line.kicker || "Входное тестирование"}</p>
            <h3>${line.title}</h3>
            <p>${line.subtitle || ""}</p>
          </div>
          <div class="test-progress">${answeredCount}/${line.questions.length}</div>
        </div>
        <div class="test-questions"></div>
        <div class="test-actions">
          <button type="button" class="primary-button" id="test-finish-button"${answeredCount === line.questions.length ? "" : " disabled"}>Завершить тест</button>
        </div>
      </div>
    `;

    const questionsRoot = testPanel.querySelector(".test-questions");

    line.questions.forEach((question, questionIndex) => {
      const questionCard = document.createElement("article");
      questionCard.className = "test-question";
      questionCard.dataset.questionIndex = String(questionIndex);
      questionCard.innerHTML = `
        <div class="test-question-topline">
          <span>Вопрос ${questionIndex + 1}</span>
          <span class="test-question-status">${state.testAnswers[questionIndex] === null ? "Не отвечено" : "Ответ выбран"}</span>
        </div>
        <h4>${question.prompt}</h4>
        <div class="test-options"></div>
      `;

      const optionsRoot = questionCard.querySelector(".test-options");
      question.options.forEach((option, optionIndex) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `test-option${state.testAnswers[questionIndex] === optionIndex ? " is-selected" : ""}`;
        button.textContent = `${optionIndex + 1}. ${option}`;
        button.dataset.optionIndex = String(optionIndex);
        button.addEventListener("click", () => updateTestAnswer(line, questionIndex, optionIndex));
        optionsRoot.appendChild(button);
      });

      questionsRoot.appendChild(questionCard);
    });

    testPanel.querySelector("#test-finish-button").addEventListener("click", () => {
      state.testCompleted = true;
      state.testExpandedIndex = 0;
      renderScene();
    });
    return;
  }

  const correctCount = state.testAnswers.reduce((total, answer, index) => {
    return total + (answer === line.questions[index].correctAnswer ? 1 : 0);
  }, 0);

  testPanel.innerHTML = `
    <div class="test-card test-card-results">
      <div class="test-header">
        <div>
          <p class="panel-label">Результаты тестирования</p>
          <h3>Тест завершён</h3>
          <p>Открой объяснение к любому вопросу, чтобы разобрать ответ.</p>
        </div>
        <div class="test-progress">${correctCount}/${line.questions.length}</div>
      </div>
      <div class="test-results"></div>
      <div class="test-actions">
        <button type="button" class="primary-button" id="test-continue-button">Продолжить</button>
      </div>
    </div>
  `;

  const resultsRoot = testPanel.querySelector(".test-results");

  line.questions.forEach((question, questionIndex) => {
    const selectedAnswer = state.testAnswers[questionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    const isExpanded = state.testExpandedIndex === questionIndex;
    const resultCard = document.createElement("article");
    resultCard.className = `test-result ${isCorrect ? "is-correct" : "is-wrong"}${isExpanded ? " is-expanded" : ""}`;
    resultCard.innerHTML = `
      <button type="button" class="test-result-summary">
        <span class="test-result-index">Вопрос ${questionIndex + 1}</span>
        <span class="test-result-title">${question.prompt}</span>
        <span class="test-result-status">${isCorrect ? "Верно" : "Неверно"}</span>
        <span class="test-result-action">${isExpanded ? "Скрыть" : "Объяснение"}</span>
      </button>
      <div class="test-result-detail">
        <p><strong>Ваш ответ:</strong> ${question.options[selectedAnswer] || "Не выбран"}</p>
        <p><strong>Правильный ответ:</strong> ${question.options[question.correctAnswer]}</p>
        <p>${question.explanation}</p>
      </div>
    `;

    resultCard.querySelector(".test-result-summary").addEventListener("click", () => {
      state.testExpandedIndex = state.testExpandedIndex === questionIndex ? null : questionIndex;
      updateResultExpansion();
    });

    resultsRoot.appendChild(resultCard);
  });

  testPanel.querySelector("#test-continue-button").addEventListener("click", advanceAfterTest);
}

function updateTestAnswer(line, questionIndex, optionIndex) {
  if (state.testCompleted) {
    return;
  }

  state.testAnswers[questionIndex] = optionIndex;

  const questionCard = testPanel.querySelector(`.test-question[data-question-index="${questionIndex}"]`);

  if (questionCard) {
    questionCard.querySelectorAll(".test-option").forEach((optionButton, currentIndex) => {
      optionButton.classList.toggle("is-selected", currentIndex === optionIndex);
    });

    const status = questionCard.querySelector(".test-question-status");

    if (status) {
      status.textContent = "Ответ выбран";
    }
  }

  const answeredCount = state.testAnswers.filter((answer) => answer !== null).length;
  const progress = testPanel.querySelector(".test-progress");

  if (progress) {
    progress.textContent = `${answeredCount}/${line.questions.length}`;
  }

  const finishButton = testPanel.querySelector("#test-finish-button");

  if (finishButton) {
    finishButton.disabled = answeredCount !== line.questions.length;
  }
}

function updateResultExpansion() {
  testPanel.querySelectorAll(".test-result").forEach((card, index) => {
    const expanded = state.testExpandedIndex === index;
    card.classList.toggle("is-expanded", expanded);

    const action = card.querySelector(".test-result-action");

    if (action) {
      action.textContent = expanded ? "Скрыть" : "Объяснение";
    }
  });
}

function advanceAfterTest() {
  const scene = story[state.sceneId];

  if (state.lineIndex >= scene.lines.length - 1) {
    return;
  }

  state.lineIndex += 1;
  state.testAnswers = [];
  state.testCompleted = false;
  state.testExpandedIndex = null;
  renderScene();
}

function handleQuestionAnswer(selectedIndex) {
  const scene = story[state.sceneId];
  const line = scene.lines[state.lineIndex];

  if (state.lockedQuestion) {
    return;
  }

  state.selectedAnswerIndex = selectedIndex;

  if (selectedIndex === line.correctAnswer) {
    state.questionFeedback = line.correctFeedback || ["Верно."];
    state.questionFeedbackType = "success";
    state.lockedQuestion = true;
    renderScene();
    return;
  }

  state.questionFeedback = line.wrongFeedback;
  state.questionFeedbackType = "error";
  state.lockedQuestion = false;
  renderScene();
}

function nextLine() {
  const scene = story[state.sceneId];
  const line = scene.lines[state.lineIndex];

  if (line?.type === "question" && state.questionFeedbackType === "success") {
    state.lineIndex += 1;
    state.questionFeedback = null;
    state.questionFeedbackType = null;
    state.selectedAnswerIndex = null;
    state.lockedQuestion = false;
    state.testAnswers = [];
    state.testCompleted = false;
    state.testExpandedIndex = null;
    state.incidentGameStep = 0;
    state.incidentGameThreat = 100;
    state.incidentGameCorrect = 0;
    state.incidentGameSelected = null;
    state.incidentGameFeedback = null;
    state.incidentGameFeedbackType = null;
    state.incidentGameLocked = false;
    state.incidentGameCompleted = false;
    clearQuestionAdvanceTimeout();
    renderScene();
    return;
  }

  if (state.lineIndex < scene.lines.length - 1) {
    state.lineIndex += 1;
    state.questionFeedback = null;
    state.questionFeedbackType = null;
    state.selectedAnswerIndex = null;
    state.lockedQuestion = false;
    state.testAnswers = [];
    state.testCompleted = false;
    state.testExpandedIndex = null;
    state.incidentGameStep = 0;
    state.incidentGameThreat = 100;
    state.incidentGameCorrect = 0;
    state.incidentGameSelected = null;
    state.incidentGameFeedback = null;
    state.incidentGameFeedbackType = null;
    state.incidentGameLocked = false;
    state.incidentGameCompleted = false;
    clearQuestionAdvanceTimeout();
    renderScene();
  }
}

function renderCharacterCodex() {
  characterGrid.innerHTML = "";

  codexOrder.forEach((characterId) => {
    const character = characters[characterId];
    const unlocked = state.unlocked.includes(characterId);
    const card = document.createElement("article");
    const isSecretLocked = character.secret && !unlocked;
    card.className = `character-entry${unlocked ? " is-clickable" : " locked"}${isSecretLocked ? " is-secret" : ""}`;

    card.innerHTML = `
      ${isSecretLocked ? '<div class="mystery-portrait" aria-hidden="true">?</div>' : `<img src="${character.portrait}" alt="${unlocked ? character.name : "Засекреченный профиль"}">`}
      <div class="character-entry-body">
        <span class="panel-label">${unlocked ? "Профиль открыт" : "Доступ закрыт"}</span>
        <h3>${unlocked ? character.name : (isSecretLocked ? "???" : "Неизвестный персонаж")}</h3>
        <p>${unlocked ? character.role : (isSecretLocked ? "Профиль скрыт до появления персонажа в сюжете." : "Персонаж появится в сюжете и после этого откроется в меню.")}</p>
        ${unlocked ? `<p>${character.bio}</p>` : '<div class="locked-badge">Заблокировано</div>'}
      </div>
    `;

    if (unlocked) {
      card.tabIndex = 0;
      card.addEventListener("click", () => openCharacterDetail(characterId));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openCharacterDetail(characterId);
        }
      });
    }

    characterGrid.appendChild(card);
  });
}

function renderChapterMenu() {
  const progress = loadStoryProgress();
  const currentChapterNumber = story[progress.sceneId]?.chapterNumber ?? 1;

  chaptersGrid.innerHTML = "";

  chapterMenuEntries.forEach((entry) => {
    const scene = story[entry.sceneId];

    if (!scene) {
      return;
    }

    const card = document.createElement("article");
    const isCurrent = currentChapterNumber === scene.chapterNumber;
    const isAvailable = true;
    card.className = `chapter-card${isCurrent ? " is-current" : ""}${isAvailable ? " is-available" : " is-locked"}`;
    card.innerHTML = `
      <div class="chapter-card-visual" style="background-image: url('${scene.background}'); background-position: ${scene.backgroundPosition || "center center"};"></div>
      <div class="chapter-card-overlay"></div>
      <div class="chapter-card-body">
        <div class="chapter-card-topline">
          <span class="chapter-status-badge${isAvailable ? " is-available" : ""}">${isAvailable ? "Доступно" : "Заблокировано"}</span>
          ${isAvailable ? (isCurrent ? '<span class="chapter-badge">Текущая</span>' : "") : '<span class="chapter-lock-badge" aria-label="Заблокировано"></span>'}
        </div>
        <p class="chapter-card-number">Глава ${scene.chapterNumber}</p>
        <h3>${scene.chapter}</h3>
        <p>${entry.description}</p>
        <button type="button" class="secondary-button chapter-open-button"${isAvailable ? "" : " disabled"}>${isAvailable ? "Открыть главу" : "Недоступно"}</button>
      </div>
    `;

    if (isAvailable) {
      card.querySelector(".chapter-open-button").addEventListener("click", () => startChapter(entry.sceneId));
    }

    chaptersGrid.appendChild(card);
  });
}

function openChapters() {
  renderChapterMenu();
  openOverlay(chaptersOverlay);
}

function closeChapters() {
  closeOverlay(chaptersOverlay);
}

function openCharacters() {
  renderCharacterCodex();
  openOverlay(charactersOverlay);
}

function closeCharacters() {
  closeOverlay(charactersOverlay);
}

function openCharacterDetail(characterId) {
  const character = characters[characterId];

  if (!character || !state.unlocked.includes(characterId)) {
    return;
  }

  characterDetailBackdrop.style.backgroundImage = `url("${character.portrait}")`;
  characterDetailImage.src = character.portrait;
  characterDetailImage.alt = character.name;
  characterDetailStatus.textContent = "Профиль открыт";
  characterDetailName.textContent = character.name;
  characterDetailRole.textContent = character.role;
  characterDetailBio.textContent = character.bio;

  openOverlay(characterDetailOverlay);
}

function closeCharacterDetail() {
  closeOverlay(characterDetailOverlay);
}

function openPause() {
  openOverlay(pauseOverlay);
}

function closePause() {
  closeOverlay(pauseOverlay);
}

function resetProgress() {
  const accepted = window.confirm("Сбросить весь прогресс и знакомства с персонажами?");

  if (!accepted) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(DISCLAIMER_KEY);

  state.unlocked = [];
  resetStateToStart();
  renderCharacterCodex();
  updateStartButtonLabel();
  hideCharacterReveal(true);
  hideChapterSplash();
  closeOverlay(charactersOverlay);
  closeOverlay(characterDetailOverlay);
  closeOverlay(pauseOverlay);
  showMenu();
}

function handleExit() {
  window.close();

  if (!window.closed) {
    window.location.href = "about:blank";
  }
}

startButton.addEventListener("click", startStory);
menuChaptersButton.addEventListener("click", openChapters);
menuCharactersButton.addEventListener("click", openCharacters);
inGameCharactersButton.addEventListener("click", openCharacters);
resetProgressButton.addEventListener("click", resetProgress);
pauseResetButton.addEventListener("click", resetProgress);
pauseCharactersButton.addEventListener("click", () => {
  closePause();
  openCharacters();
});
closeChaptersButton.addEventListener("click", closeChapters);
disclaimerNextButton.addEventListener("click", continueAfterDisclaimer);
closeCharactersButton.addEventListener("click", closeCharacters);
closeCharacterDetailButton.addEventListener("click", closeCharacterDetail);
pauseButton.addEventListener("click", openPause);
resumeButton.addEventListener("click", closePause);
backToMenuButton.addEventListener("click", () => {
  closePause();
  showMenu();
});
exitButton.addEventListener("click", handleExit);
nextButton.addEventListener("click", nextLine);

chaptersOverlay.addEventListener("click", (event) => {
  if (event.target === chaptersOverlay) {
    closeChapters();
  }
});

charactersOverlay.addEventListener("click", (event) => {
  if (event.target === charactersOverlay) {
    closeCharacters();
  }
});

characterDetailOverlay.addEventListener("click", (event) => {
  if (event.target === characterDetailOverlay) {
    closeCharacterDetail();
  }
});

pauseOverlay.addEventListener("click", (event) => {
  if (event.target === pauseOverlay) {
    closePause();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (!characterDetailOverlay.classList.contains("hidden")) {
    closeCharacterDetail();
    return;
  }

  if (!chaptersOverlay.classList.contains("hidden")) {
    closeChapters();
    return;
  }

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
});

renderCharacterCodex();
renderChapterMenu();
updateStartButtonLabel();
initializeParallax(menuScreen, [
  { element: menuBackdrop, depthX: -0.85, depthY: -0.85 },
  { element: menuHero, depthX: 0.42, depthY: 0.3 }
]);
initializeParallax(sceneVisual, [
  { element: sceneBackdrop, depthX: -0.58, depthY: -0.5 }
]);
menuScreen.classList.add("is-entering");
window.setTimeout(() => {
  menuScreen.classList.remove("is-entering");
}, SCREEN_ENTER_DURATION);
