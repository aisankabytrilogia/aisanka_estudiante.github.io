/* =========================================================
   AISANKA - AUTISMO
   LECCIÓN 1: HOLA EN CHINO

   Flujo:

   PASO 1 → Aprende
   PASO 2 → Escucha
   PASO 3 → Escritura
   PASO 4 → Instrucciones
   PASO 5 → Juego
========================================================= */



const HERO_STORAGE_KEY =
    "aisanka_heroes";


const HERO_GAME_ID =
    "juego_1_hola_chino";


const HERO_DATA = {

    id: HERO_GAME_ID,

    nombre: "Benjamín Zeledón",

    imagen: "images/benjamin.png",

    juego: 1

};



let currentStep = 1;

let attempts = 0;

let foundCards = 0;

let gameFinished = false;

let audioStarted = false;


const steps = [

    document.getElementById("step1"),

    document.getElementById("step2"),

    document.getElementById("step3"),

    document.getElementById("step4"),

    document.getElementById("step5")

];


const stepTitle =
    document.getElementById("stepTitle");


const stepCounter =
    document.getElementById("stepCounter");


const progressFill =
    document.getElementById("progressFill");


const progressDots =
    document.querySelectorAll(
        ".progress-dot"
    );


const dynamicBackground =
    document.getElementById(
        "dynamicBackground"
    );


const backButton =
    document.getElementById(
        "backButton"
    );


const nextStep1 =
    document.getElementById(
        "nextStep1"
    );


const nextStep2 =
    document.getElementById(
        "nextStep2"
    );


const nextStep3 =
    document.getElementById(
        "nextStep3"
    );


const startGameButton =
    document.getElementById(
        "startGameButton"
    );


const gameBackButton =
    document.getElementById(
        "gameBackButton"
    );


const attemptCounter =
    document.getElementById(
        "attemptCounter"
    );


const memoryBoard =
    document.getElementById(
        "memoryBoard"
    );


const gameMessage =
    document.getElementById(
        "gameMessage"
    );


const chineseAudio =
    document.getElementById(
        "chineseAudio"
    );


const playAudio =
    document.getElementById(
        "playAudio"
    );


const audioStatus =
    document.getElementById(
        "audioStatus"
    );


const starsModal =
    document.getElementById(
        "starsModal"
    );


const heroModal =
    document.getElementById(
        "heroModal"
    );


const collectionModal =
    document.getElementById(
        "collectionModal"
    );


const finalAttempts =
    document.getElementById(
        "finalAttempts"
    );


const starsResult =
    document.getElementById(
        "starsResult"
    );


const starsDescription =
    document.getElementById(
        "starsDescription"
    );


const continueHeroButton =
    document.getElementById(
        "continueHeroButton"
    );


const returnMapButton =
    document.getElementById(
        "returnMapButton"
    );


const collectionButton =
    document.getElementById(
        "collectionButton"
    );


const collectionBackButton =
    document.getElementById(
        "collectionBackButton"
    );


const heroesCollection =
    document.getElementById(
        "heroesCollection"
    );



const stepTitles = [

    "Aprende una palabra",

    "Escucha y repite",

    "Así se escribe",

    "Prepárate para jugar",

    "Reto final"

];



const backgroundClasses = [

    "background-orange",

    "background-pink",

    "background-green",

    "background-blue",

    "background-purple"

];



function changeBackground(stepNumber) {

    if (!dynamicBackground) {
        return;
    }


    dynamicBackground.classList.remove(
        ...backgroundClasses
    );


    const newBackground =
        backgroundClasses[
            stepNumber - 1
        ];


    dynamicBackground.classList.add(
        newBackground
    );

}


function updateProgressDots(stepNumber) {

    progressDots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === stepNumber - 1
            );

        }
    );

}



function showStep(stepNumber) {

    if (stepNumber < 1) {

        stepNumber = 1;

    }


    if (stepNumber > 5) {

        stepNumber = 5;

    }


    currentStep =
        stepNumber;


    steps.forEach(
        (step, index) => {

            step.classList.toggle(
                "active",
                index === stepNumber - 1
            );

        }
    );


    stepTitle.textContent =
        stepTitles[
            stepNumber - 1
        ];


    stepCounter.textContent =
        `${stepNumber} / 5`;


    progressFill.style.width =
        `${stepNumber * 20}%`;


    updateProgressDots(
        stepNumber
    );


    changeBackground(
        stepNumber
    );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    handleVideos(
        stepNumber
    );


    handleAudio(
        stepNumber
    );

}



function handleVideos(stepNumber) {

    const helloVideo =
        document.getElementById(
            "helloVideo"
        );


    const writingVideo =
        document.getElementById(
            "writingVideo"
        );


    if (helloVideo) {

        if (stepNumber === 1) {

            helloVideo.currentTime = 0;

            helloVideo
                .play()
                .catch(() => {});

        } else {

            helloVideo.pause();

        }

    }


    if (writingVideo) {

        if (stepNumber === 3) {

            writingVideo.currentTime = 0;

            writingVideo
                .play()
                .catch(() => {});

        } else {

            writingVideo.pause();

        }

    }

}



function handleAudio(stepNumber) {

    if (!chineseAudio) {
        return;
    }


    if (stepNumber === 2) {

        playChineseAudio();

    } else {

        chineseAudio.pause();

        chineseAudio.currentTime = 0;

        audioStatus.textContent =
            "Preparado para escuchar";

    }

}


function playChineseAudio() {

    if (!chineseAudio) {
        return;
    }


    chineseAudio.currentTime = 0;


    const playPromise =
        chineseAudio.play();


    if (
        playPromise !== undefined
    ) {

        playPromise

            .then(() => {

                audioStarted = true;

                audioStatus.textContent =
                    "Escuchando...";

            })

            .catch(() => {

                audioStatus.textContent =
                    "Pulsa el botón para escuchar";

            });

    }

}


if (chineseAudio) {

    chineseAudio.addEventListener(
        "ended",
        () => {

            audioStatus.textContent =
                "Ahora intenta repetirlo.";

        }
    );

}



if (playAudio) {

    playAudio.addEventListener(
        "click",
        () => {

            playChineseAudio();

        }
    );

}



function createMemoryGame() {

    memoryBoard.innerHTML = "";


    attempts = 0;

    foundCards = 0;

    gameFinished = false;


    updateAttemptCounter();


    const cards = [

        {
            chinese: "nǐ hǎo",
            latin: "nǐ hǎo",
            correct: true
        },

        {
            chinese: "nǐ hǎo",
            latin: "nǐ hǎo",
            correct: true
        },

        {
            chinese: "NAKSA",
            latin: "naksa",
            correct: false
        },

        {
            chinese: "NAKSA",
            latin: "naksa",
            correct: false
        },

        {
            chinese: "PARASTAH",
            latin: "parastah",
            correct: false
        },

        {
            chinese: "PARASTAH",
            latin: "parastah",
            correct: false
        }

    ];


    shuffle(cards);


    cards.forEach(
        (card, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "memory-card";


            button.type =
                "button";


            button.dataset.index =
                index;


            button.dataset.correct =
                card.correct;


            button.innerHTML = `

                <div class="memory-card-inner">

                    <div class="card-front">

                        <span>
                            TARJETA ${index + 1}
                        </span>

                    </div>


                    <div class="
                        card-back
                        ${card.correct
                            ? "correct"
                            : "wrong"}
                    ">

                        <div class="card-word">

                            <span class="
                                card-word-chinese
                            ">
                                ${card.chinese}
                            </span>

                            <span class="
                                card-word-latin
                            ">
                                ${card.latin}
                            </span>

                        </div>


                        <div class="card-hint">

                            ${card.correct
                                ? "Palabra objetivo"
                                : "Sigue buscando"}

                        </div>

                    </div>

                </div>

            `;


            button.addEventListener(
                "click",
                () => {

                    handleCardClick(
                        button
                    );

                }
            );


            memoryBoard.appendChild(
                button
            );

        }
    );


    gameMessage.textContent =
        "";

}



function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[randomIndex]
        ] = [

            array[randomIndex],
            array[i]

        ];

    }


    return array;

}


function handleCardClick(card) {

    if (gameFinished) {
        return;
    }


    if (
        card.classList.contains(
            "found"
        )
    ) {

        return;

    }


    if (
        card.classList.contains(
            "flipped"
        )
    ) {

        return;

    }


    attempts++;


    updateAttemptCounter();


    card.classList.add(
        "flipped"
    );


    const isCorrect =
        card.dataset.correct ===
        "true";


    if (isCorrect) {

        setTimeout(
            () => {

                card.classList.add(
                    "found"
                );


                foundCards++;


                gameMessage.textContent =
                    "Encontraste una. Busca la otra.";


                if (
                    foundCards === 2
                ) {

                    finishGame();

                }

            },
            500
        );

    } else {

        gameMessage.textContent =
            "Esa no es. Sigue buscando.";


        setTimeout(
            () => {

                card.classList.remove(
                    "flipped"
                );


                gameMessage.textContent =
                    "";

            },
            900
        );

    }

}



function updateAttemptCounter() {

    if (attemptCounter) {

        attemptCounter.textContent =
            attempts;

    }

}



function finishGame() {

    gameFinished = true;


    setTimeout(
        () => {

            const stars =
                calculateStars(
                    attempts
                );


            finalAttempts.textContent =
                attempts;


            starsResult.textContent =
                "★".repeat(stars) +
                "☆".repeat(
                    3 - stars
                );


            if (stars === 3) {

                starsDescription.textContent =
                    "Excelente trabajo. Encontraste las dos tarjetas rápidamente.";

            } else if (
                stars === 2
            ) {

                starsDescription.textContent =
                    "Muy bien. Completaste correctamente el reto.";

            } else {

                starsDescription.textContent =
                    "Lo lograste. Puedes volver a practicar para conseguir más estrellas.";

            }


            openModal(
                starsModal
            );

        },
        850
    );

}



function calculateStars(
    numberOfAttempts
) {

    if (
        numberOfAttempts <= 2
    ) {

        return 3;

    }


    if (
        numberOfAttempts <= 5
    ) {

        return 2;

    }


    return 1;

}



function getHeroes() {

    try {

        const saved =
            localStorage.getItem(
                HERO_STORAGE_KEY
            );


        if (!saved) {

            return [];

        }


        const heroes =
            JSON.parse(saved);


        return Array.isArray(heroes)
            ? heroes
            : [];

    } catch (error) {

        console.error(
            "No se pudieron leer los héroes:",
            error
        );


        return [];

    }

}



function saveHero() {

    const heroes =
        getHeroes();


    const alreadyUnlocked =
        heroes.some(
            hero =>
                hero.id ===
                HERO_DATA.id
        );


    if (!alreadyUnlocked) {

        heroes.push(
            HERO_DATA
        );


        localStorage.setItem(

            HERO_STORAGE_KEY,

            JSON.stringify(
                heroes
            )

        );

    }

}



function renderCollection() {

    heroesCollection.innerHTML =
        "";


    const heroes =
        getHeroes();


    if (
        heroes.length === 0
    ) {

        heroesCollection.innerHTML = `

            <div class="empty-collection">

                <p>
                    Todavía no has desbloqueado héroes.
                </p>

            </div>

        `;

        return;

    }


    heroes.forEach(
        hero => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "hero-collection-card";


            card.innerHTML = `

                <img
                    src="${hero.imagen}"
                    alt="${hero.nombre}"
                >

                <h3>
                    ${hero.nombre}
                </h3>

                <p>
                    Juego ${hero.juego}
                </p>

            `;


            heroesCollection.appendChild(
                card
            );

        }
    );

}



function closeAllModals() {

    starsModal.classList.remove(
        "show"
    );


    heroModal.classList.remove(
        "show"
    );


    collectionModal.classList.remove(
        "show"
    );


    starsModal.setAttribute(
        "aria-hidden",
        "true"
    );


    heroModal.setAttribute(
        "aria-hidden",
        "true"
    );


    collectionModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


function openModal(modal) {

    closeAllModals();


    modal.classList.add(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}



continueHeroButton.addEventListener(
    "click",
    () => {

        closeAllModals();


        saveHero();


        document.getElementById(
            "unlockedHeroImage"
        ).src =
            HERO_DATA.imagen;


        openModal(
            heroModal
        );

    }
);



returnMapButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "nivel.html";

    }
);



collectionButton.addEventListener(
    "click",
    () => {

        renderCollection();


        openModal(
            collectionModal
        );

    }
);



collectionBackButton.addEventListener(
    "click",
    () => {

        window.location.href =
            "nivel.html";

    }
);



nextStep1.addEventListener(
    "click",
    () => {

        showStep(2);

    }
);



nextStep2.addEventListener(
    "click",
    () => {

        showStep(3);

    }
);



nextStep3.addEventListener(
    "click",
    () => {

        showStep(4);

    }
);


startGameButton.addEventListener(
    "click",
    () => {

        createMemoryGame();

        showStep(5);

    }
);



backButton.addEventListener(
    "click",
    () => {

        if (
            currentStep > 1
        ) {

            showStep(
                currentStep - 1
            );

        } else {

            window.location.href =
                "nivel.html";

        }

    }
);



gameBackButton.addEventListener(
    "click",
    () => {

        showStep(4);

    }
);


starsModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            starsModal
        ) {

            return;

        }

    }
);


heroModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            heroModal
        ) {

            return;

        }

    }
);


collectionModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            collectionModal
        ) {

            return;

        }

    }
);



document.addEventListener(
    "DOMContentLoaded",
    () => {

        showStep(1);


        const helloVideo =
            document.getElementById(
                "helloVideo"
            );


        const writingVideo =
            document.getElementById(
                "writingVideo"
            );


        if (helloVideo) {

            helloVideo
                .play()
                .catch(() => {});

        }


        if (writingVideo) {

            writingVideo.pause();

        }

    }
);