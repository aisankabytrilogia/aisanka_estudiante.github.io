

"use strict";



const CONFIG = {

    totalCards: 4,

    correctWord: [
        "H",
        "O",
        "L",
        "A"
    ],

    hero: {

        id: "ruben",

        name: "Rubén Darío",

        type: "Héroe de Nicaragua",

        image: "images/ruben.png"

    },

    storageKey:
        "aisanka_heroes",

    mapPage:
        "nivel.html"

};



let currentCard = 1;

let currentAudio = null;

let attempts = 0;

let gameFinished = false;



let selectedLetters = [
    null,
    null,
    null,
    null
];


const lessonContainer =
    document.getElementById(
        "lesson-container"
    );

const lessonCards =
    document.querySelectorAll(
        ".lesson-card"
    );

const gameScreen =
    document.getElementById(
        "game-screen"
    );

const backButton =
    document.getElementById(
        "backButton"
    );

const nextButton =
    document.getElementById(
        "nextButton"
    );

const startGameButton =
    document.getElementById(
        "startGameButton"
    );

const restartGameButton =
    document.getElementById(
        "restartGameButton"
    );

const progressBar =
    document.getElementById(
        "progress-bar"
    );

const progressText =
    document.getElementById(
        "progress-text"
    );

const letterPool =
    document.getElementById(
        "letter-pool"
    );

const wordSlots =
    document.querySelectorAll(
        ".letter-slot"
    );

const attemptNumber =
    document.getElementById(
        "attempt-number"
    );

const starsModal =
    document.getElementById(
        "stars-modal"
    );

const heroModal =
    document.getElementById(
        "hero-modal"
    );

const collectionModal =
    document.getElementById(
        "collection-modal"
    );

const starsContainer =
    document.getElementById(
        "stars-container"
    );

const resultMessage =
    document.getElementById(
        "result-message"
    );

const continueHeroButton =
    document.getElementById(
        "continueHeroButton"
    );

const mapButton =
    document.getElementById(
        "mapButton"
    );

const collectionButton =
    document.getElementById(
        "collectionButton"
    );

const collectionMapButton =
    document.getElementById(
        "collectionMapButton"
    );

const heroesList =
    document.getElementById(
        "heroes-list"
    );

const heroCount =
    document.getElementById(
        "hero-count"
    );

const stageDots =
    document.querySelectorAll(
        ".stage-dot"
    );


const gradients = {

    1: {

        className:
            "card-one",

        gradient:
            "linear-gradient(135deg,#ff9f43,#ffd166)"

    },

    2: {

        className:
            "card-two",

        gradient:
            "linear-gradient(135deg,#ff8fab,#9b5de5)"

    },

    3: {

        className:
            "card-three",

        gradient:
            "linear-gradient(135deg,#4facfe,#00d4a8)"

    },

    4: {

        className:
            "card-four",

        gradient:
            "linear-gradient(135deg,#7f7fd5,#e684ae)"

    }

};



document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeLesson();

        initializeNavigation();

        initializeGame();

        initializeModals();

        initializeMapButtons();

        initializeVideos();

        initializeKeyboard();

    }
);



function initializeLesson() {

    showCard(1);

}



function showCard(cardNumber) {

    if (
        cardNumber < 1 ||
        cardNumber > CONFIG.totalCards
    ) {

        return;

    }


    currentCard =
        cardNumber;


    lessonCards.forEach(
        card => {

            card.classList.remove(
                "active"
            );

        }
    );


    const selectedCard =
        document.querySelector(
            `.lesson-card[data-card="${cardNumber}"]`
        );


    if (selectedCard) {

        selectedCard.classList.add(
            "active"
        );

    }


    updateBackground(
        cardNumber
    );

    updateProgress(
        cardNumber
    );

    updateStageDots(
        cardNumber
    );

    updateNavigation();


    stopAllMedia();


    setTimeout(
        () => {

            playCardMedia(
                cardNumber
            );

        },
        180
    );

}


function updateBackground(
    cardNumber
) {

    document.body.classList.remove(
        "card-one",
        "card-two",
        "card-three",
        "card-four",
        "game-background"
    );


    document.body.classList.add(
        gradients[cardNumber].className
    );


    document.documentElement.style
        .setProperty(
            "--current-gradient",
            gradients[cardNumber].gradient
        );

}



function updateProgress(
    cardNumber
) {

    const percentage =
        (
            cardNumber /
            CONFIG.totalCards
        ) * 100;


    progressBar.style.width =
        `${percentage}%`;


    progressText.textContent =
        `${cardNumber} de ${CONFIG.totalCards}`;



    document
        .querySelectorAll(
            ".progress-bar[data-progress]"
        )
        .forEach(
            bar => {

                bar.style.width =
                    `${bar.dataset.progress}%`;

            }
        );

}



function updateStageDots(
    cardNumber
) {

    stageDots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === cardNumber - 1
            );

        }
    );

}



function initializeNavigation() {

    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                if (currentCard > 1) {

                    showCard(
                        currentCard - 1
                    );

                }

            }
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                if (
                    currentCard <
                    CONFIG.totalCards
                ) {

                    showCard(
                        currentCard + 1
                    );

                }

            }
        );

    }



    document
        .querySelectorAll(
            ".back-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        if (
                            currentCard > 1
                        ) {

                            showCard(
                                currentCard - 1
                            );

                        }

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".next-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        if (
                            currentCard <
                            CONFIG.totalCards
                        ) {

                            showCard(
                                currentCard + 1
                            );

                        }

                    }
                );

            }
        );


    if (startGameButton) {

        startGameButton.addEventListener(
            "click",
            startGame
        );

    }

}



function updateNavigation() {

    if (!nextButton) {
        return;
    }


    if (
        currentCard ===
        CONFIG.totalCards
    ) {

        nextButton.innerHTML = `
            <span>Jugar</span>
            <span class="button-icon">→</span>
        `;

        nextButton.onclick =
            startGame;

    } else {

        nextButton.innerHTML = `
            <span>Continuar</span>
            <span class="button-icon">›</span>
        `;

        nextButton.onclick =
            () => {

                showCard(
                    currentCard + 1
                );

            };

    }


    if (backButton) {

        backButton.disabled =
            currentCard === 1;

    }

}



function playCardMedia(
    cardNumber
) {

    stopAllMedia();


    const audio =
        document.getElementById(
            `audio-${cardNumber}`
        );


    if (audio) {

        currentAudio =
            audio;

        audio.currentTime = 0;

        playMedia(audio);

    }


    const video =
        document.getElementById(
            `video-${cardNumber}`
        );


    if (video) {

        video.currentTime = 0;

        video.muted = true;

        playMedia(video);

    }

}



function playMedia(
    media
) {

    if (!media) {
        return;
    }


    const promise =
        media.play();


    if (
        promise &&
        typeof promise.catch ===
        "function"
    ) {

        promise.catch(
            () => {

                

            }
        );

    }

}



function stopAllMedia() {

    document
        .querySelectorAll(
            "audio, video"
        )
        .forEach(
            media => {

                media.pause();

                try {

                    media.currentTime = 0;

                } catch (error) {}

            }
        );


    currentAudio = null;

}



function initializeVideos() {

    document
        .querySelectorAll(
            "video"
        )
        .forEach(
            video => {

                video.muted = true;

                video.setAttribute(
                    "playsinline",
                    ""
                );


                video.addEventListener(
                    "ended",
                    () => {

                        video.currentTime = 0;

                        playMedia(
                            video
                        );

                    }
                );

            }
        );

}



document.addEventListener(
    "pointerdown",
    () => {

        if (currentAudio) {

            playMedia(
                currentAudio
            );

        }

    },
    {
        passive: true
    }
);


function initializeGame() {

    createLetters();


    if (restartGameButton) {

        restartGameButton.addEventListener(
            "click",
            resetGame
        );

    }

}



function createLetters() {

    letterPool.innerHTML = "";


    const letters =
        shuffle(
            CONFIG.correctWord
        );


    letters.forEach(
        letter => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "letter-button";


            button.textContent =
                letter;


            button.dataset.letter =
                letter;


            button.setAttribute(
                "aria-label",
                `Letra ${letter}`
            );


            button.addEventListener(
                "mouseenter",
                () => {

                    playLetterSound(
                        letter
                    );

                }
            );


            button.addEventListener(
                "focus",
                () => {

                    playLetterSound(
                        letter
                    );

                }
            );


            button.addEventListener(
                "click",
                () => {

                    selectLetter(
                        letter,
                        button
                    );

                }
            );


            letterPool.appendChild(
                button
            );

        }
    );

}



function shuffle(
    array
) {

    const result =
        [...array];


    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            result[i],
            result[j]
        ] =
        [
            result[j],
            result[i]
        ];

    }


    return result;

}



function playLetterSound(
    letter
) {

    const audio =
        document.getElementById(
            `audio-${letter}`
        );


    if (!audio) {
        return;
    }


    audio.currentTime = 0;

    playMedia(
        audio
    );

}


function selectLetter(
    letter,
    button
) {

    if (gameFinished) {
        return;
    }



    const position =
        selectedLetters.findIndex(
            value =>
                value === null
        );


    if (position === -1) {
        return;
    }


    selectedLetters[position] =
        letter;


    button.classList.add(
        "used"
    );


    const slot =
        wordSlots[position];


    slot.textContent =
        letter;


    slot.classList.add(
        "filled"
    );


    slot.setAttribute(
        "aria-label",
        `Posición ${position + 1}: ${letter}`
    );



    if (
        selectedLetters.every(
            value =>
                value !== null
        )
    ) {

        setTimeout(
            evaluateAttempt,
            450
        );

    }

}


function evaluateAttempt() {

    if (gameFinished) {
        return;
    }


    attempts++;


    attemptNumber.textContent =
        attempts;


    const correct =
        selectedLetters.every(
            (letter, index) =>
                letter ===
                CONFIG.correctWord[index]
        );


    if (correct) {

        markCorrectWord();

        setTimeout(
            () => {

                finishGame();

            },
            500
        );

        return;

    }



    selectedLetters.forEach(
        (letter, index) => {

            if (
                letter ===
                CONFIG.correctWord[index]
            ) {

                wordSlots[index]
                    .classList.add(
                        "correct-position"
                    );

            }

        }
    );


    setTimeout(
        resetIncorrectPositions,
        850
    );

}



function markCorrectWord() {

    wordSlots.forEach(
        (slot, index) => {

            slot.classList.add(
                "correct-position"
            );

            slot.setAttribute(
                "aria-label",
                `Letra correcta: ${CONFIG.correctWord[index]}`
            );

        }
    );

}



function resetIncorrectPositions() {

    selectedLetters.forEach(
        (letter, index) => {

            if (
                letter !==
                CONFIG.correctWord[index]
            ) {

                selectedLetters[index] =
                    null;


                wordSlots[index].textContent =
                    "";


                wordSlots[index]
                    .classList.remove(
                        "filled",
                        "correct-position"
                    );

            }

        }
    );



    updateLetterButtons();

}



function updateLetterButtons() {

    const correctLetters =
        selectedLetters.filter(
            (letter, index) =>
                letter !== null &&
                letter ===
                CONFIG.correctWord[index]
        );


    document
        .querySelectorAll(
            ".letter-button"
        )
        .forEach(
            button => {

                const letter =
                    button.dataset.letter;



                const isReserved =
                    correctLetters.includes(
                        letter
                    );


                if (isReserved) {

                    button.classList.add(
                        "used"
                    );

                } else {

                    button.classList.remove(
                        "used"
                    );

                }

            }
        );

}



function finishGame() {

    gameFinished = true;


    const stars =
        calculateStars(
            attempts
        );


    saveHero();

    playStarAudio(
        stars
    );

    showStarsModal(
        stars
    );

}



function calculateStars(
    attemptCount
) {

    if (attemptCount <= 1) {

        return 3;

    }


    if (attemptCount === 2) {

        return 2;

    }


    return 1;

}


function showStarsModal(
    stars
) {

    closeAllModals();


    starsModal.classList.remove(
        "hidden"
    );


    starsContainer.innerHTML =
        "";


    for (
        let i = 1;
        i <= 3;
        i++
    ) {

        const star =
            document.createElement(
                "span"
            );


        star.className =
            "result-star";


        if (i <= stars) {

            star.classList.add(
                "active"
            );

        }


        star.textContent =
            "★";


        starsContainer.appendChild(
            star
        );

    }


    if (stars === 3) {

        resultMessage.textContent =
            "Tawan raya! Wal lalah.";

    } else if (stars === 2) {

        resultMessage.textContent =
            "Raitka! Tawan wina.";

    } else {

        resultMessage.textContent =
            "Tawan! Kli raya wina.";

    }

}



function playStarAudio(
    stars
) {

    stopAllMedia();


    const audio =
        document.getElementById(
            `audio-stars-${stars}`
        );


    if (audio) {

        audio.currentTime = 0;

        playMedia(
            audio
        );

    }

}



function initializeModals() {

    continueHeroButton.addEventListener(
        "click",
        showHeroModal
    );


    collectionButton.addEventListener(
        "click",
        showCollectionModal
    );

}



function closeAllModals() {

    starsModal.classList.add(
        "hidden"
    );

    heroModal.classList.add(
        "hidden"
    );

    collectionModal.classList.add(
        "hidden"
    );

}



function showHeroModal() {

    closeAllModals();


    heroModal.classList.remove(
        "hidden"
    );


    stopAllMedia();


    const audio =
        document.getElementById(
            "hero-audio"
        );


    if (audio) {

        audio.currentTime = 0;

        playMedia(
            audio
        );

    }

}



function saveHero() {

    let heroes = [];


    try {

        heroes =
            JSON.parse(
                localStorage.getItem(
                    CONFIG.storageKey
                )
            ) || [];

    } catch (error) {

        heroes = [];

    }


    const alreadyUnlocked =
        heroes.some(
            hero =>
                hero.id ===
                CONFIG.hero.id
        );


    if (!alreadyUnlocked) {

        heroes.push({

            ...CONFIG.hero,

            unlockedAt:
                new Date()
                    .toISOString()

        });


        localStorage.setItem(
            CONFIG.storageKey,
            JSON.stringify(
                heroes
            )
        );

    }

}



function showCollectionModal() {

    closeAllModals();


    collectionModal.classList.remove(
        "hidden"
    );


    renderCollection();

}



function renderCollection() {

    heroesList.innerHTML =
        "";


    let heroes = [];


    try {

        heroes =
            JSON.parse(
                localStorage.getItem(
                    CONFIG.storageKey
                )
            ) || [];

    } catch (error) {

        heroes = [];

    }


    heroCount.textContent =
        heroes.length;


    if (
        heroes.length === 0
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "hero-collection-item";


        empty.textContent =
            "Aún no has desbloqueado héroes.";


        heroesList.appendChild(
            empty
        );


        return;

    }


    heroes.forEach(
        hero => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "hero-collection-item";


            item.innerHTML = `

                <img
                    class="hero-collection-image"
                    src="${escapeHTML(hero.image)}"
                    alt="${escapeHTML(hero.name)}"
                >

                <div
                    class="hero-collection-name"
                >
                    ${escapeHTML(hero.name)}
                </div>

                <div
                    class="hero-collection-type"
                >
                    ${escapeHTML(hero.type)}
                </div>

            `;


            heroesList.appendChild(
                item
            );

        }
    );

}



function escapeHTML(
    value
) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}



function initializeMapButtons() {

    mapButton.addEventListener(
        "click",
        goToMap
    );


    collectionMapButton.addEventListener(
        "click",
        goToMap
    );

}


function goToMap() {

    window.location.href =
        CONFIG.mapPage;

}



function initializeGame() {

    createLetters();

}


function startGame() {

    stopAllMedia();


    lessonContainer.classList.add(
        "hidden"
    );


    const header =
        document.querySelector(
            ".learning-header"
        );


    if (header) {

        header.classList.add(
            "hidden"
        );

    }


    gameScreen.classList.remove(
        "hidden"
    );


    document.body.classList.remove(
        "card-one",
        "card-two",
        "card-three",
        "card-four"
    );


    document.body.classList.add(
        "game-background"
    );


    resetGame();

}


function resetGame() {

    attempts = 0;

    gameFinished = false;


    selectedLetters = [
        null,
        null,
        null,
        null
    ];


    attemptNumber.textContent =
        "0";


    wordSlots.forEach(
        slot => {

            slot.textContent =
                "";

            slot.classList.remove(
                "filled",
                "correct-position"
            );

        }
    );


    createLetters();

}



function initializeKeyboard() {

    document.addEventListener(
        "keydown",
        event => {


            if (
                event.key === "ArrowRight" &&
                !gameScreen.classList.contains(
                    "hidden"
                ) === false
            ) {

                if (
                    currentCard <
                    CONFIG.totalCards
                ) {

                    showCard(
                        currentCard + 1
                    );

                }

            }


            if (
                event.key === "ArrowLeft" &&
                gameScreen.classList.contains(
                    "hidden"
                )
            ) {

                if (
                    currentCard > 1
                ) {

                    showCard(
                        currentCard - 1
                    );

                }

            }

        }
    );

}



window.addEventListener(
    "beforeunload",
    () => {

        stopAllMedia();

    }
);