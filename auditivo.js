

"use strict";


document.addEventListener("DOMContentLoaded", () => {


    const TOTAL_CARDS = 6;

    const HEROES = [

        {
            id: "benjamin",
            nombre: "Benjamín Zeledón",
            imagen: "images/benjamin.png"
        },

        {
            id: "ruben",
            nombre: "Rubén Darío",
            imagen: "images/ruben.png"
        }

    ];


    const STORAGE_KEY =
        "aisanka_heroes_desbloqueados";


    const GAME_ID =
        "juego_1";


    const cards =
        [
            ...document.querySelectorAll(
                ".learning-card"
            )
        ];


    const nextButtons =
        [
            ...document.querySelectorAll(
                "[data-next]"
            )
        ];


    const previousButtons =
        [
            ...document.querySelectorAll(
                "[data-previous]"
            )
        ];


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    const progressText =
        document.getElementById(
            "progressText"
        );


    const progressDots =
        [
            ...document.querySelectorAll(
                ".progress-dot"
            )
        ];



    const btnVolver =
        document.getElementById(
            "btnVolver"
        );



    const audioBuenosDias =
        document.getElementById(
            "audioBuenosDias"
        );


    const replayAudio =
        document.getElementById(
            "replayAudio"
        );


    const audioPlayButton =
        document.getElementById(
            "audioPlayButton"
        );


    const audioProgressBar =
        document.getElementById(
            "audioProgressBar"
        );


    const audioStatus =
        document.getElementById(
            "audioStatus"
        );


    const customAudioPlayer =
        document.querySelector(
            ".custom-audio-player"
        );

    const attemptCounter =
        document.getElementById(
            "attemptCounter"
        );


    const gameMessage =
        document.getElementById(
            "gameMessage"
        );


    const videoOptions =
        [
            ...document.querySelectorAll(
                ".video-option"
            )
        ];


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


    const earnedStars =
        document.getElementById(
            "earnedStars"
        );


    const starsResult =
        document.getElementById(
            "starsResult"
        );


    const continueToHero =
        document.getElementById(
            "continueToHero"
        );


    const unlockedHeroImage =
        document.getElementById(
            "unlockedHeroImage"
        );


    const unlockedHeroName =
        document.getElementById(
            "unlockedHeroName"
        );


    const goMapFromHero =
        document.getElementById(
            "goMapFromHero"
        );


    const openCollection =
        document.getElementById(
            "openCollection"
        );


    const heroesCollection =
        document.getElementById(
            "heroesCollection"
        );


    const goMapFromCollection =
        document.getElementById(
            "goMapFromCollection"
        );



    let currentCard = 1;

    let attempts = 0;

    let gameFinished = false;

    let unlockedHero = null;



    function stopAllMedia() {

        const videos =
            document.querySelectorAll(
                "video"
            );


        videos.forEach(video => {

            video.pause();

            try {

                video.currentTime = 0;

            } catch (error) {}

        });


        if (audioBuenosDias) {

            audioBuenosDias.pause();

            audioBuenosDias.currentTime = 0;

        }


        stopCustomAudioUI();

    }


    function stopCustomAudioUI() {

        if (customAudioPlayer) {

            customAudioPlayer.classList.remove(
                "playing"
            );

        }


        if (audioPlayButton) {

            audioPlayButton.innerHTML =
                '<i class="fa-solid fa-play"></i>';

            audioPlayButton.setAttribute(
                "aria-label",
                "Reproducir audio"
            );

        }


        if (audioStatus) {

            audioStatus.textContent =
                "LISTO";

        }

    }


    function playVisibleMedia() {

        const activeCard =
            document.querySelector(
                ".learning-card.active"
            );


        if (!activeCard) {
            return;
        }


        const videos =
            activeCard.querySelectorAll(
                "video"
            );


        videos.forEach(video => {

            video.muted = true;

            const promise =
                video.play();


            if (
                promise !== undefined
            ) {

                promise.catch(
                    () => {}
                );

            }

        });



    }


    function updateBackground() {

        document.body.className =
            `bg-card-${currentCard}`;

    }


    function updateProgress() {

        const percentage =
            (
                currentCard /
                TOTAL_CARDS
            ) * 100;


        progressBar.style.width =
            `${percentage}%`;


        progressText.textContent =
            `${currentCard} / ${TOTAL_CARDS}`;


        progressDots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index <
                    currentCard
                );

            }
        );

    }



    function showCard(cardNumber) {

        if (
            cardNumber < 1 ||
            cardNumber > TOTAL_CARDS
        ) {

            return;

        }


        stopAllMedia();


        cards.forEach(card => {

            card.classList.remove(
                "active"
            );

        });


        const selectedCard =
            cards.find(
                card =>
                    Number(
                        card.dataset.card
                    ) === cardNumber
            );


        if (!selectedCard) {
            return;
        }


        selectedCard.classList.add(
            "active"
        );


        currentCard =
            cardNumber;


        updateBackground();

        updateProgress();




        if (
            currentCard === 6 &&
            !gameFinished
        ) {

            resetGameVisualState();

        }


        setTimeout(
            playVisibleMedia,
            150
        );


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }



    nextButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        currentCard <
                        TOTAL_CARDS
                    ) {

                        showCard(
                            currentCard + 1
                        );

                    }

                }
            );

        }
    );



    previousButtons.forEach(
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



    if (btnVolver) {

        btnVolver.addEventListener(
            "click",
            () => {

                window.location.href =
                    "nivel.html";

            }
        );

    }


    function playAudio() {

        if (!audioBuenosDias) {
            return;
        }


        const promise =
            audioBuenosDias.play();


        if (
            promise !== undefined
        ) {

            promise
                .then(() => {

                    if (customAudioPlayer) {

                        customAudioPlayer.classList.add(
                            "playing"
                        );

                    }


                    if (audioStatus) {

                        audioStatus.textContent =
                            "ESCUCHANDO";

                    }


                    if (audioPlayButton) {

                        audioPlayButton.innerHTML =
                            '<i class="fa-solid fa-pause"></i>';

                        audioPlayButton.setAttribute(
                            "aria-label",
                            "Pausar audio"
                        );

                    }

                })
                .catch(
                    () => {

                        if (audioStatus) {

                            audioStatus.textContent =
                                "TOCA PARA ESCUCHAR";

                        }

                    }
                );

        }

    }


    function pauseAudio() {

        if (!audioBuenosDias) {
            return;
        }


        audioBuenosDias.pause();


        if (customAudioPlayer) {

            customAudioPlayer.classList.remove(
                "playing"
            );

        }


        if (audioPlayButton) {

            audioPlayButton.innerHTML =
                '<i class="fa-solid fa-play"></i>';

            audioPlayButton.setAttribute(
                "aria-label",
                "Reproducir audio"
            );

        }


        if (audioStatus) {

            audioStatus.textContent =
                "PAUSADO";

        }

    }


    function toggleAudio() {

        if (!audioBuenosDias) {
            return;
        }


        if (
            audioBuenosDias.paused
        ) {

            playAudio();

        } else {

            pauseAudio();

        }

    }


    if (audioPlayButton) {

        audioPlayButton.addEventListener(
            "click",
            toggleAudio
        );

    }


    if (replayAudio) {

        replayAudio.addEventListener(
            "click",
            () => {

                if (!audioBuenosDias) {
                    return;
                }


                audioBuenosDias.currentTime =
                    0;


                playAudio();

            }
        );

    }


    if (audioBuenosDias) {

        audioBuenosDias.addEventListener(
            "timeupdate",
            () => {

                if (
                    !audioBuenosDias.duration
                ) {

                    return;

                }


                const percentage =
                    (
                        audioBuenosDias.currentTime /
                        audioBuenosDias.duration
                    ) * 100;


                if (audioProgressBar) {

                    audioProgressBar.style.width =
                        `${percentage}%`;

                }

            }
        );


        audioBuenosDias.addEventListener(
            "ended",
            () => {

                stopCustomAudioUI();


                if (audioProgressBar) {

                    audioProgressBar.style.width =
                        "0%";

                }

            }
        );


        audioBuenosDias.addEventListener(
            "pause",
            () => {

                if (
                    audioBuenosDias.currentTime <
                    audioBuenosDias.duration
                ) {

                    if (customAudioPlayer) {

                        customAudioPlayer.classList.remove(
                            "playing"
                        );

                    }


                    if (audioPlayButton) {

                        audioPlayButton.innerHTML =
                            '<i class="fa-solid fa-play"></i>';

                    }

                }

            }
        );

    }



    videoOptions.forEach(
        option => {

            option.addEventListener(
                "click",
                () => {

                    if (gameFinished) {
                        return;
                    }


                    attempts++;


                    updateAttemptCounter();


                    const answer =
                        option.dataset.answer;


                    videoOptions.forEach(
                        item => {

                            item.classList.remove(
                                "selected",
                                "wrong",
                                "correct"
                            );

                        }
                    );


                    option.classList.add(
                        "selected"
                    );


                    if (
                        answer === "correct"
                    ) {

                        finishGame();

                    } else {

                        option.classList.add(
                            "wrong"
                        );


                        showGameMessage(
                            "Aún no. Observa nuevamente las señas e inténtalo otra vez.",
                            "error"
                        );


                        setTimeout(
                            () => {

                                option.classList.remove(
                                    "selected",
                                    "wrong"
                                );

                            },
                            700
                        );

                    }

                }
            );

        }
    );


    function updateAttemptCounter() {

        if (!attemptCounter) {
            return;
        }


        attemptCounter.textContent =
            `Intentos: ${attempts}`;

    }


    function showGameMessage(
        message,
        type
    ) {

        if (!gameMessage) {
            return;
        }


        gameMessage.textContent =
            message;


        gameMessage.className =
            `game-message ${type}`;

    }


    function resetGameVisualState() {

        videoOptions.forEach(
            item => {

                item.disabled = false;

                item.classList.remove(
                    "selected",
                    "wrong",
                    "correct"
                );

            }
        );


        if (gameMessage) {

            gameMessage.textContent =
                "";

            gameMessage.className =
                "game-message";

        }

    }


    function calculateStars() {

        if (
            attempts === 1
        ) {

            return 3;

        }


        if (
            attempts === 2
        ) {

            return 2;

        }


        return 1;

    }


    function finishGame() {

        gameFinished = true;


        videoOptions.forEach(
            item => {

                item.disabled = true;

            }
        );


        const correctOption =
            document.querySelector(
                '[data-answer="correct"]'
            );


        if (correctOption) {

            correctOption.classList.add(
                "correct"
            );

        }


        showGameMessage(
            "¡Correcto! Has encontrado la seña de “Buenos días”.",
            "success"
        );


        const stars =
            calculateStars();


        setTimeout(
            () => {

                showStarsModal(
                    stars
                );

            },
            850
        );

    }



    function showStarsModal(stars) {

        closeAllModals();


        earnedStars
            .querySelectorAll("i")
            .forEach(
                (star, index) => {

                    star.classList.toggle(
                        "active",
                        index < stars
                    );

                }
            );


        starsResult.textContent =
            stars === 1
                ? "1 estrella"
                : `${stars} estrellas`;


        starsModal.classList.add(
            "open"
        );


        starsModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    if (continueToHero) {

        continueToHero.addEventListener(
            "click",
            () => {

                closeAllModals();

                unlockHero();

            }
        );

    }


    function getStoredHeroes() {

        try {

            const data =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (!data) {
                return [];
            }


            const parsed =
                JSON.parse(data);


            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "No se pudo leer la colección:",
                error
            );


            return [];

        }

    }


    function saveHeroes(
        heroes
    ) {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    heroes
                )
            );

        } catch (error) {

            console.error(
                "No se pudo guardar la colección:",
                error
            );

        }

    }



    function unlockHero() {

        const heroes =
            getStoredHeroes();


        const existingHero =
            heroes.find(
                hero =>
                    hero.gameId ===
                    GAME_ID
            );


        if (existingHero) {

            unlockedHero =
                existingHero;

        } else {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    HEROES.length
                );


            const hero =
                HEROES[randomIndex];


            unlockedHero = {

                id:
                    hero.id,

                nombre:
                    hero.nombre,

                imagen:
                    hero.imagen,

                gameId:
                    GAME_ID,

                unlockedAt:
                    new Date().toISOString()

            };


            heroes.push(
                unlockedHero
            );


            saveHeroes(
                heroes
            );

        }


        showHeroModal();

    }


    function showHeroModal() {

        closeAllModals();


        if (!unlockedHero) {
            return;
        }


        unlockedHeroImage.src =
            unlockedHero.imagen;


        unlockedHeroName.textContent =
            unlockedHero.nombre;


        heroModal.classList.add(
            "open"
        );


        heroModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }



    if (openCollection) {

        openCollection.addEventListener(
            "click",
            () => {

                closeAllModals();

                renderCollection();


                collectionModal.classList.add(
                    "open"
                );


                collectionModal.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }
        );

    }


    function renderCollection() {

        heroesCollection.innerHTML =
            "";


        const heroes =
            getStoredHeroes();


        const uniqueByGame =
            [];


        heroes.forEach(
            hero => {

                const alreadyExists =
                    uniqueByGame.some(
                        item =>
                            item.gameId ===
                            hero.gameId
                    );


                if (!alreadyExists) {

                    uniqueByGame.push(
                        hero
                    );

                }

            }
        );


        if (
            uniqueByGame.length === 0
        ) {

            heroesCollection.innerHTML = `

                <div class="empty-collection">

                    <i class="fa-solid fa-shield-halved"></i>

                    <p>
                        Aún no has desbloqueado héroes.
                    </p>

                </div>

            `;

            return;

        }


        uniqueByGame.forEach(
            (hero, index) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "hero-collection-item";


                item.style.animationDelay =
                    `${index * 80}ms`;


                item.innerHTML = `

                    <div class="hero-collection-image">

                        <img
                            src="${hero.imagen}"
                            alt="${hero.nombre}"
                        >

                    </div>

                    <strong>
                        ${hero.nombre}
                    </strong>

                `;


                heroesCollection.appendChild(
                    item
                );

            }
        );

    }



    if (goMapFromHero) {

        goMapFromHero.addEventListener(
            "click",
            goToMap
        );

    }


    if (goMapFromCollection) {

        goMapFromCollection.addEventListener(
            "click",
            goToMap
        );

    }


    function goToMap() {

        closeAllModals();


        window.location.href =
            "nivel.html";

    }



    document
        .querySelectorAll(
            "[data-close-modal]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    closeAllModals
                );

            }
        );


    function closeAllModals() {

        [
            starsModal,
            heroModal,
            collectionModal

        ].forEach(
            modal => {

                if (!modal) {
                    return;
                }


                modal.classList.remove(
                    "open"
                );


                modal.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }
        );

    }



    [
        starsModal,
        heroModal,
        collectionModal

    ].forEach(
        modal => {

            if (!modal) {
                return;
            }


            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        modal
                    ) {

                        closeAllModals();

                    }

                }
            );

        }
    );



    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeAllModals();

            }

        }
    );



    showCard(1);

});