/* Este archivo controla toda la lógica de AISANKA: navegación entre las cuatro tarjetas, reproducción de videos y audio, interacción del juego, intentos y estrellas, selección y almacenamiento del héroe desbloqueado mediante localStorage, colección y regreso a nivel.html. */

"use strict";


const screens = document.querySelectorAll(".lesson-screen");

const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");

const backButton = document.getElementById("backButton");

const greetingVideo = document.getElementById("greetingVideo");
const greetingSoundButton = document.getElementById("greetingSoundButton");

const writingVideo = document.getElementById("writingVideo");
const writingSoundButton = document.getElementById("writingSoundButton");

const naksaAudio = document.getElementById("naksaAudio");
const playAudioButton = document.getElementById("playAudioButton");
const audioPanel = document.querySelector(".audio-panel");

const startGameButton = document.getElementById("startGameButton");

const videoChoices = document.querySelectorAll(".video-choice");
const attemptCountElement = document.getElementById("attemptCount");
const gameFeedback = document.getElementById("gameFeedback");

const starsModal = document.getElementById("starsModal");
const heroModal = document.getElementById("heroModal");
const collectionModal = document.getElementById("collectionModal");

const starsCloseButton = document.getElementById("starsCloseButton");
const continueHeroButton = document.getElementById("continueHeroButton");

const collectionButton = document.getElementById("collectionButton");
const collectionCloseButton = document.getElementById("collectionCloseButton");

const mapButton = document.getElementById("mapButton");
const collectionMapButton = document.getElementById("collectionMapButton");

const unlockedHeroImage = document.getElementById("unlockedHeroImage");
const unlockedHeroName = document.getElementById("unlockedHeroName");

const heroCollection = document.getElementById("heroCollection");

const attemptResultText = document.getElementById("attemptResultText");
const starsContainer = document.getElementById("starsContainer");
const starsMessage = document.getElementById("starsMessage");


let currentScreen = 1;

let attempts = 0;

let gameFinished = false;

let selectedHero = null;

let currentVideoWithSound = null;


const heroData = {

    ruben: {
        id: "ruben",
        name: "Rubén Darío",
        image: "images/ruben.png"
    },

    benjamin: {
        id: "benjamin",
        name: "Benjamín Zeledón",
        image: "images/benjamin.png"
    }

};


function showScreen(screenNumber) {

    screens.forEach((screen) => {

        screen.classList.remove("active");

    });


    const targetScreen = document.querySelector(
        `.lesson-screen[data-screen="${screenNumber}"]`
    );


    if (!targetScreen) {
        return;
    }


    targetScreen.classList.add("active");


    currentScreen = screenNumber;


    updateProgress();


    stopAllMedia();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (screenNumber === 1) {

        playVideoMuted(greetingVideo);

    }


    if (screenNumber === 3) {

        playVideoMuted(writingVideo);

    }

}


function updateProgress() {

    if (currentScreen === "game") {

        progressLabel.textContent = "Reto final";

        progressFill.style.width = "100%";

        return;

    }


    const numericScreen = Number(currentScreen);

    progressLabel.textContent = `${numericScreen} de 4`;

    progressFill.style.width = `${numericScreen * 25}%`;

}


function stopAllMedia() {

    const videos = document.querySelectorAll("video");

    videos.forEach((video) => {

        video.pause();

        video.currentTime = 0;

        video.muted = true;

    });


    if (naksaAudio) {

        naksaAudio.pause();

        naksaAudio.currentTime = 0;

    }


    if (audioPanel) {

        audioPanel.classList.remove("playing");

    }


    if (playAudioButton) {

        playAudioButton.innerHTML =
            '<span class="audio-button-icon">▶</span><span>Escuchar</span>';

    }


    currentVideoWithSound = null;


    if (greetingSoundButton) {

        greetingSoundButton.textContent = "Activar sonido";

    }


    if (writingSoundButton) {

        writingSoundButton.textContent = "Activar sonido";

    }

}


function playVideoMuted(video) {

    if (!video) {
        return;
    }


    video.muted = true;

    video.currentTime = 0;


    const playPromise = video.play();


    if (playPromise !== undefined) {

        playPromise.catch(() => {

          

        });

    }

}


function activateVideoSound(video, button) {

    if (!video) {
        return;
    }


    if (currentVideoWithSound && currentVideoWithSound !== video) {

        currentVideoWithSound.pause();

        currentVideoWithSound.muted = true;

    }


    currentVideoWithSound = video;

    video.muted = false;

    video.volume = 1;


    const playPromise = video.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                if (button) {

                    button.textContent = "Silenciar";

                }

            })
            .catch(() => {

                video.muted = true;

                if (button) {

                    button.textContent = "Activar sonido";

                }

            });

    }

}


function toggleLessonVideo(video, button) {

    if (!video) {
        return;
    }


    if (video.muted) {

        activateVideoSound(video, button);

        return;

    }


    video.muted = true;

    video.pause();


    if (button) {

        button.textContent = "Activar sonido";

    }


    currentVideoWithSound = null;

}


function openModal(modal) {

    closeAllModals();


    if (!modal) {
        return;
    }


    modal.classList.add("show");

    modal.setAttribute("aria-hidden", "false");

}


function closeModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.remove("show");

    modal.setAttribute("aria-hidden", "true");

}


function closeAllModals() {

    closeModal(starsModal);

    closeModal(heroModal);

    closeModal(collectionModal);

}


function calculateStars(numberOfAttempts) {

    if (numberOfAttempts === 1) {

        return 3;

    }


    if (numberOfAttempts === 2) {

        return 2;

    }


    return 1;

}


function showStars(numberOfStars) {

    const stars = starsContainer.querySelectorAll(".star");


    stars.forEach((star, index) => {

        star.classList.remove("active");

        star.style.animationDelay = "0s";


        if (index < numberOfStars) {

            setTimeout(() => {

                star.classList.add("active");

            }, index * 180);

        }

    });


    if (numberOfStars === 3) {

        starsMessage.textContent =
            "¡Excelente! Lo reconociste al primer intento.";

    } else if (numberOfStars === 2) {

        starsMessage.textContent =
            "¡Muy bien! Sigue practicando y podrás conseguir 3 estrellas.";

    } else {

        starsMessage.textContent =
            "¡Lo conseguiste! Cada intento te ayuda a aprender.";

    }

}


function finishGame() {

    if (gameFinished) {
        return;
    }


    gameFinished = true;


    const stars = calculateStars(attempts);


    attemptResultText.textContent =
        `Terminaste el reto en ${attempts} intento${attempts === 1 ? "" : "s"}.`;


    showStars(stars);


    setTimeout(() => {

        openModal(starsModal);

    }, 500);

}


function getStoredHeroes() {

    try {

        const stored = localStorage.getItem("aisanka_heroes");

        if (!stored) {
            return [];
        }


        const parsed = JSON.parse(stored);


        if (!Array.isArray(parsed)) {
            return [];
        }


        return parsed;

    } catch (error) {

        return [];

    }

}


function saveHero(hero) {

    const heroes = getStoredHeroes();


    const alreadyUnlocked = heroes.some(
        (savedHero) => savedHero.id === hero.id
    );


    if (!alreadyUnlocked) {

        heroes.push(hero);

    }


    localStorage.setItem(
        "aisanka_heroes",
        JSON.stringify(heroes)
    );


    return heroes;

}


function selectHeroForGame() {

    const heroes = getStoredHeroes();


    const availableHeroes = Object.values(heroData).filter(
        (hero) =>
            !heroes.some(
                (savedHero) => savedHero.id === hero.id
            )
    );


    let hero;


    if (availableHeroes.length > 0) {

        const randomIndex = Math.floor(
            Math.random() * availableHeroes.length
        );

        hero = availableHeroes[randomIndex];

    } else {

        const randomIndex = Math.floor(
            Math.random() * Object.values(heroData).length
        );

        hero = Object.values(heroData)[randomIndex];

    }


    selectedHero = hero;


    return hero;

}


function showHeroUnlock() {

    const hero = selectHeroForGame();


    saveHero(hero);


    unlockedHeroImage.src = hero.image;

    unlockedHeroName.textContent = hero.name;


    openModal(heroModal);

}


function renderCollection() {

    const heroes = getStoredHeroes();


    heroCollection.innerHTML = "";


    if (heroes.length === 0) {

        heroCollection.innerHTML = `
            <div class="collection-empty">
                Todavía no tienes héroes desbloqueados.
            </div>
        `;

        return;

    }


    heroes.forEach((hero) => {

        const heroCard = document.createElement("div");

        heroCard.className = "collection-hero";


        heroCard.innerHTML = `
            <img
                src="${hero.image}"
                alt="${hero.name}"
            >
            <div class="collection-hero-name">
                ${hero.name}
            </div>
        `;


        heroCollection.appendChild(heroCard);

    });

}


function resetGame() {

    attempts = 0;

    gameFinished = false;

    selectedHero = null;


    attemptCountElement.textContent = "0";

    gameFeedback.textContent = "";


    videoChoices.forEach((choice) => {

        choice.classList.remove(
            "correct-choice",
            "wrong-choice",
            "active-hover",
            "playing"
        );

    });


    const choiceVideos = document.querySelectorAll(".choice-video");


    choiceVideos.forEach((video) => {

        video.pause();

        video.currentTime = 0;

        video.muted = true;

    });

}


function startGame() {

    resetGame();

    showScreen("game");

}


function returnToMap() {

    window.location.href = "nivel.html";

}


function handleVideoChoice(choice) {

    if (gameFinished) {
        return;
    }


    attempts++;

    attemptCountElement.textContent = attempts;


    const answer = choice.dataset.answer;


    if (answer === "correct") {

        choice.classList.add("correct-choice");


        gameFeedback.textContent =
            "¡Correcto! Ese personaje está diciendo NAKSA.";


        const selectedVideo =
            choice.querySelector(".choice-video");


        if (selectedVideo) {

            selectedVideo.muted = false;

            selectedVideo.volume = 1;

            selectedVideo.currentTime = 0;

            selectedVideo.play().catch(() => {});

        }


        setTimeout(() => {

            finishGame();

        }, 900);


    } else {

        choice.classList.add("wrong-choice");


        gameFeedback.textContent =
            "Escucha nuevamente y prueba otra vez.";


        setTimeout(() => {

            choice.classList.remove("wrong-choice");

        }, 600);

    }

}


document.querySelectorAll(".next-button").forEach((button) => {

    button.addEventListener("click", () => {

        const nextScreen = button.dataset.next;

        showScreen(Number(nextScreen));

    });

});


document.querySelectorAll(".previous-button").forEach((button) => {

    button.addEventListener("click", () => {

        const previousScreen = button.dataset.prev;

        showScreen(Number(previousScreen));

    });

});


backButton.addEventListener("click", () => {

    returnToMap();

});


if (greetingSoundButton) {

    greetingSoundButton.addEventListener("click", () => {

        toggleLessonVideo(
            greetingVideo,
            greetingSoundButton
        );

    });

}


if (writingSoundButton) {

    writingSoundButton.addEventListener("click", () => {

        toggleLessonVideo(
            writingVideo,
            writingSoundButton
        );

    });

}


if (playAudioButton) {

    playAudioButton.addEventListener("click", () => {

        if (naksaAudio.paused) {

            naksaAudio.currentTime = 0;

            naksaAudio.volume = 1;


            const playPromise = naksaAudio.play();


            if (playPromise !== undefined) {

                playPromise.then(() => {

                    audioPanel.classList.add("playing");

                    playAudioButton.innerHTML =
                        '<span class="audio-button-icon">Ⅱ</span><span>Pausar</span>';

                }).catch(() => {});

            }

        } else {

            naksaAudio.pause();

            audioPanel.classList.remove("playing");

            playAudioButton.innerHTML =
                '<span class="audio-button-icon">▶</span><span>Escuchar</span>';

        }

    });

}


if (naksaAudio) {

    naksaAudio.addEventListener("ended", () => {

        audioPanel.classList.remove("playing");

        playAudioButton.innerHTML =
            '<span class="audio-button-icon">▶</span><span>Escuchar</span>';

    });

}


if (startGameButton) {

    startGameButton.addEventListener("click", () => {

        startGame();

    });

}


videoChoices.forEach((choice) => {

    const video = choice.querySelector(".choice-video");


    choice.addEventListener("mouseenter", () => {

        if (gameFinished) {
            return;
        }


        video.muted = false;

        video.volume = 1;

        video.currentTime = 0;


        const playPromise = video.play();


        if (playPromise !== undefined) {

            playPromise.catch(() => {

                video.muted = true;

                video.play().catch(() => {});

            });

        }


        choice.classList.add("playing");

    });


    choice.addEventListener("mouseleave", () => {

        video.pause();

        video.currentTime = 0;

        video.muted = true;


        choice.classList.remove("playing");

    });


    choice.addEventListener("focus", () => {

        video.muted = false;

        video.volume = 1;


        video.play().catch(() => {});

        choice.classList.add("playing");

    });


    choice.addEventListener("blur", () => {

        video.pause();

        video.currentTime = 0;

        video.muted = true;

        choice.classList.remove("playing");

    });


    choice.addEventListener("click", () => {

        handleVideoChoice(choice);

    });

});


continueHeroButton.addEventListener("click", () => {

    closeModal(starsModal);

    showHeroUnlock();

});


collectionButton.addEventListener("click", () => {

    renderCollection();

    openModal(collectionModal);

});


collectionCloseButton.addEventListener("click", () => {

    closeModal(collectionModal);

    openModal(heroModal);

});


starsCloseButton.addEventListener("click", () => {

    closeModal(starsModal);

});


mapButton.addEventListener("click", () => {

    returnToMap();

});


collectionMapButton.addEventListener("click", () => {

    returnToMap();

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeAllModals();

    }

});


[greetingVideo, writingVideo].forEach((video) => {

    if (!video) {
        return;
    }


    video.addEventListener("ended", () => {

        video.currentTime = 0;

        video.play().catch(() => {});

    });

});


document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        document.querySelectorAll("video").forEach((video) => {

            video.pause();

        });


        if (naksaAudio) {

            naksaAudio.pause();

        }

    }

});


showScreen(1);