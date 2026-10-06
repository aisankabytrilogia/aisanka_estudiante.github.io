/* AISANKA NORMAL: controla la navegación de tarjetas, reproducción automática de medios, juego de ahorcado, estrellas, desbloqueo de héroe y colección guardada en localStorage. */

document.addEventListener("DOMContentLoaded", () => {


    const WORD = "PARASTAH";

    const cards = document.querySelectorAll(".lesson-card:not(#gameScreen)");

    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const progressLabel = document.getElementById("progressLabel");

    const helloVideo = document.getElementById("helloVideo");
    const writingVideo = document.getElementById("writingVideo");

    const pronunciationAudio = document.getElementById("pronunciationAudio");
    const playAudioButton = document.getElementById("playAudioButton");
    const soundWave = document.getElementById("soundWave");

    const startGameButton = document.getElementById("startGameButton");

    const gameScreen = document.getElementById("gameScreen");
    const wordDisplay = document.getElementById("wordDisplay");
    const lettersContainer = document.getElementById("lettersContainer");
    const gameMessage = document.getElementById("gameMessage");
    const attemptText = document.getElementById("attemptText");

    const starsModal = document.getElementById("starsModal");
    const heroModal = document.getElementById("heroModal");
    const collectionModal = document.getElementById("collectionModal");

    const starsContainer = document.getElementById("starsContainer");
    const starsMessage = document.getElementById("starsMessage");

    const continueHeroButton = document.getElementById("continueHeroButton");
    const collectionButton = document.getElementById("collectionButton");
    const mapButton = document.getElementById("mapButton");
    const collectionMapButton = document.getElementById("collectionMapButton");

    const heroImage = document.getElementById("heroImage");
    const heroTitle = document.getElementById("heroTitle");

    const heroesCollection = document.getElementById("heroesCollection");


    let currentCard = 1;

    let currentAttempt = 1;

    let errors = 0;

    let guessedLetters = [];

    let gameFinished = false;

    const GAME_ID = "juego1";

    const HEROES = [
        {
            id: "ruben",
            nombre: "Rubén Darío",
            imagen: "images/ruben.png",
            descripcion: "Has desbloqueado a Rubén Darío para tu colección."
        },
        {
            id: "benjamin",
            nombre: "Benjamín Zeledón",
            imagen: "images/benjamin.png",
            descripcion: "Has desbloqueado a Benjamín Zeledón para tu colección."
        }
    ];


    function showCard(number) {

        cards.forEach(card => {
            card.classList.remove("active");
        });

        gameScreen.classList.remove("active");

        const selectedCard = document.querySelector(
            `.lesson-card[data-card="${number}"]`
        );

        if (!selectedCard) {
            return;
        }

        selectedCard.classList.add("active");

        currentCard = number;

        updateProgress(number);

        handleMedia(number);
    }

    function updateProgress(number) {

        const labels = {
            1: "Aprendamos una palabra",
            2: "Escucha con atención",
            3: "Aprende a escribir",
            4: "Prepárate para jugar"
        };

        progressText.textContent = `${number} de 4`;

        progressLabel.textContent = labels[number];

        progressFill.style.width = `${number * 25}%`;
    }

    function handleMedia(number) {


        helloVideo.pause();
        writingVideo.pause();

        if (number !== 2) {
            pronunciationAudio.pause();
            pronunciationAudio.currentTime = 0;
            stopSoundAnimation();
        }


        if (number === 1) {

            helloVideo.currentTime = 0;

            helloVideo.play().catch(() => {
             
            });
        }


        if (number === 3) {

            writingVideo.currentTime = 0;

            writingVideo.play().catch(() => {});
        }
    }


    document.querySelectorAll(".next-button").forEach(button => {

        button.addEventListener("click", () => {

            const next = Number(button.dataset.next);

            showCard(next);

        });

    });


    document.querySelectorAll(".back-button").forEach(button => {

        button.addEventListener("click", () => {

            const back = Number(button.dataset.back);

            showCard(back);

        });

    });


    function startSoundAnimation() {

        soundWave.classList.add("active");

        playAudioButton.classList.add("playing");

        playAudioButton.innerHTML = `
            <i class="fa-solid fa-volume-high"></i>
            Escuchando...
        `;
    }

    function stopSoundAnimation() {

        soundWave.classList.remove("active");

        playAudioButton.classList.remove("playing");

        playAudioButton.innerHTML = `
            <i class="fa-solid fa-volume-high"></i>
            Escuchar
        `;
    }

    playAudioButton.addEventListener("click", () => {

        if (pronunciationAudio.paused) {

            pronunciationAudio.play()
                .then(() => {
                    startSoundAnimation();
                })
                .catch(() => {});

        } else {

            pronunciationAudio.pause();

            stopSoundAnimation();
        }

    });

    pronunciationAudio.addEventListener("play", startSoundAnimation);

    pronunciationAudio.addEventListener("ended", stopSoundAnimation);


    startGameButton.addEventListener("click", () => {

        currentAttempt = 1;

        resetGame();

        cards.forEach(card => {
            card.classList.remove("active");
        });

        gameScreen.classList.add("active");

        updateGameProgress();

    });

    function updateGameProgress() {

        progressText.textContent = "Reto";

        progressLabel.textContent = "Descubre PARASTAH";

        progressFill.style.width = "100%";
    }


    function resetGame() {

        errors = 0;

        guessedLetters = [];

        gameFinished = false;

        resetHangman();

        createWordSlots();

        createLetters();

        gameMessage.textContent = "Elige una letra para comenzar.";

        gameMessage.className = "game-message";

        attemptText.textContent = `Intento ${currentAttempt}`;
    }

    function createWordSlots() {

        wordDisplay.innerHTML = "";

        WORD.split("").forEach(letter => {

            const slot = document.createElement("span");

            slot.className = "letter-slot";

            slot.dataset.letter = letter;

            slot.textContent = "";

            wordDisplay.appendChild(slot);

        });

    }

    function createLetters() {

        lettersContainer.innerHTML = "";

        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        alphabet.forEach(letter => {

            const button = document.createElement("button");

            button.className = "letter-button";

            button.textContent = letter;

            button.dataset.letter = letter;

            button.addEventListener("click", () => {
                selectLetter(letter, button);
            });

            lettersContainer.appendChild(button);

        });

    }


    function selectLetter(letter, button) {

        if (gameFinished) {
            return;
        }

        if (guessedLetters.includes(letter)) {
            return;
        }

        guessedLetters.push(letter);

        button.disabled = true;

        if (WORD.includes(letter)) {

            revealLetter(letter);

            gameMessage.textContent = "¡Muy bien! Esa letra pertenece a la palabra.";

            gameMessage.className = "game-message correct";

            checkWin();

        } else {

            errors++;

            showNextHangmanPart();

            gameMessage.textContent = "Esa letra no está. Inténtalo de nuevo.";

            gameMessage.className = "game-message error";

            checkLose();

        }

    }

    function revealLetter(letter) {

        document.querySelectorAll(".letter-slot").forEach(slot => {

            if (slot.dataset.letter === letter) {

                slot.textContent = letter;

                slot.animate(
                    [
                        {
                            transform: "scale(0.5)",
                            opacity: 0
                        },
                        {
                            transform: "scale(1.15)",
                            opacity: 1
                        },
                        {
                            transform: "scale(1)",
                            opacity: 1
                        }
                    ],
                    {
                        duration: 450,
                        easing: "ease-out"
                    }
                );

            }

        });

    }


    function showNextHangmanPart() {

        const part = document.querySelector(
            `.body-part[data-part="${errors}"]`
        );

        if (!part) {
            return;
        }

        part.classList.add("visible");

        part.animate(
            [
                {
                    opacity: 0,
                    transform: "scale(0.5)"
                },
                {
                    opacity: 1,
                    transform: "scale(1.08)"
                },
                {
                    opacity: 1,
                    transform: "scale(1)"
                }
            ],
            {
                duration: 350
            }
        );

    }

    function resetHangman() {

        document.querySelectorAll(".body-part").forEach(part => {
            part.classList.remove("visible");
        });

    }


    function checkWin() {

        const completed = WORD
            .split("")
            .every(letter => guessedLetters.includes(letter));

        if (!completed) {
            return;
        }

        gameFinished = true;

        disableLetters();

        gameMessage.textContent = "¡Excelente! Descubriste PARASTAH.";

        gameMessage.className = "game-message correct";

        setTimeout(() => {

            const stars = calculateStars();

            showStarsModal(stars);

        }, 900);

    }


    function checkLose() {

        if (errors < 6) {
            return;
        }

        gameFinished = true;

        disableLetters();

        gameMessage.textContent =
            "El muñeco se completó. Este intento terminó.";

        setTimeout(() => {

            currentAttempt++;


            resetGame();

        }, 1300);

    }

    function disableLetters() {

        document.querySelectorAll(".letter-button").forEach(button => {
            button.disabled = true;
        });

    }


    function calculateStars() {

       

        if (currentAttempt === 1) {
            return 3;
        }

        if (currentAttempt === 2) {
            return 2;
        }

        return 1;
    }

    function showStarsModal(stars) {

     
        closeAllModals();

        starsContainer.innerHTML = "";

        for (let i = 1; i <= 3; i++) {

            const star = document.createElement("i");

            star.className = "fa-solid fa-star star";

            if (i <= stars) {
                star.classList.add("active");
            }

            starsContainer.appendChild(star);
        }

        if (stars === 3) {

            starsMessage.textContent =
                "¡Increíble! Conseguir las 3 estrellas demuestra que aprendiste muy bien.";

        } else if (stars === 2) {

            starsMessage.textContent =
                "¡Muy bien! Has conseguido 2 estrellas.";

        } else {

            starsMessage.textContent =
                "¡Lo lograste! Has conseguido 1 estrella.";

        }

        starsModal.classList.add("show");

    }


    function getHeroes() {

        try {

            const saved = localStorage.getItem("heroesAISANKA");

            if (!saved) {
                return [];
            }

            const heroes = JSON.parse(saved);

            return Array.isArray(heroes) ? heroes : [];

        } catch (error) {

            return [];

        }

    }

    function saveHero(hero) {

        const heroes = getHeroes();


        const exists = heroes.some(item => item.id === hero.id);

        if (!exists) {

            heroes.push({
                ...hero,
                juego: GAME_ID,
                fecha: new Date().toISOString()
            });

            localStorage.setItem(
                "heroesAISANKA",
                JSON.stringify(heroes)
            );

        }

    }

    function getHeroForGame() {

        const savedGameHeroKey = `heroeDesbloqueado_${GAME_ID}`;

        const existingHero = localStorage.getItem(savedGameHeroKey);

        if (existingHero) {

            return HEROES.find(
                hero => hero.id === existingHero
            ) || HEROES[0];

        }


        const randomIndex =
            Math.floor(Math.random() * HEROES.length);

        const selectedHero = HEROES[randomIndex];

        localStorage.setItem(
            savedGameHeroKey,
            selectedHero.id
        );

        return selectedHero;

    }

    function unlockHero() {

        const hero = getHeroForGame();

        saveHero(hero);

        heroTitle.textContent = hero.nombre;

        heroImage.src = hero.imagen;

        heroImage.alt = hero.nombre;

        document.getElementById("heroDescription").textContent =
            hero.descripcion;

        closeAllModals();

        heroModal.classList.add("show");

    }

    continueHeroButton.addEventListener("click", () => {

        closeAllModals();

        unlockHero();

    });


    function showCollection() {

        closeAllModals();

        renderCollection();

        collectionModal.classList.add("show");

    }

    function renderCollection() {

        heroesCollection.innerHTML = "";

        const heroes = getHeroes();

        if (heroes.length === 0) {

            heroesCollection.innerHTML = `
                <div class="empty-collection">
                    <i class="fa-solid fa-shield-halved"></i>
                    <p>Aún no tienes héroes desbloqueados.</p>
                </div>
            `;

            return;
        }

        heroes.forEach(hero => {

            const card = document.createElement("div");

            card.className = "hero-collection-card";

            card.innerHTML = `
                <img
                    src="${hero.imagen}"
                    alt="${hero.nombre}"
                >

                <strong>${hero.nombre}</strong>
            `;

            heroesCollection.appendChild(card);

        });

    }

    collectionButton.addEventListener("click", showCollection);


    function returnToMap() {


        window.location.href = "nivel.html";

    }

    mapButton.addEventListener("click", returnToMap);

    collectionMapButton.addEventListener(
        "click",
        returnToMap
    );


    function closeAllModals() {

        document.querySelectorAll(".modal-overlay").forEach(modal => {

            modal.classList.remove("show");

        });

    }

    document.querySelectorAll("[data-close]").forEach(button => {

        button.addEventListener("click", () => {

            const modalId = button.dataset.close;

            const modal = document.getElementById(modalId);

            if (modal) {
                modal.classList.remove("show");
            }

        });

    });

    

    document.querySelectorAll(".modal-overlay").forEach(overlay => {

        overlay.addEventListener("click", event => {

            if (event.target === overlay) {
                overlay.classList.remove("show");
            }

        });

    });

    showCard(1);

});