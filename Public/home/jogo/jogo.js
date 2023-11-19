document.addEventListener("DOMContentLoaded", function () {
    const state = {
        view: {
            squares: document.querySelectorAll(".square"),
            timeLeft: document.querySelector("#time-left"),
            score: document.querySelector("#score"),
            lives: document.querySelector("#lives"),
        },
        values: {
            gameVelocity: 1000,
            hitPosition: 0,
            result: 0,
            currentTime: 5,
            totalLives: 3,
        },
        actions: {
            timerId: null,
            countDownTimerId: null,
        },
    };

    function countDown() {
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;

        if (state.values.currentTime <= 0) {
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);
            alert(`Game Over! O seu Resultado foi: ${state.values.result}`);
            state.view.score.textContent = 0
            countLives();
            if (state.values.totalLives > 0) {
                resetGame();
                runGame();
            }
        }
    }

    function resetGame() {
        state.values.currentTime = 5;
        state.values.result = 0;
        state.view.score.textContent = state.values.result
    }

    function runGame() {
        state.actions.timerId = setInterval(randomSquare, 1000);
        state.actions.countDownTimerId = setInterval(countDown, 1000);
    }

    function countLives() {
        state.values.totalLives--;
        state.view.lives.textContent = state.values.totalLives;
    }

    function randomSquare() {
        state.view.squares.forEach((square) => {
            square.classList.remove("enemy");
        });

        let randomNumber = Math.floor(Math.random() * 9);
        let randomSquare = state.view.squares[randomNumber];
        randomSquare.classList.add("enemy");
        state.values.hitPosition = randomSquare.id;
    }

    function addListenerHitBox() {
        state.view.squares.forEach((square) => {
            square.addEventListener("mousedown", () => {
                if (square.id === state.values.hitPosition) {
                    if(state.values.currentTime <= 0){
                        state.view.score.textContent = 0
                    }
                    else if (state.values.currentTime > 0){
                        state.values.result++;
                        state.view.score.textContent = state.values.result;
                        state.values.hitPosition = null;
                        // playSound();

                    }

                }
            });
        });
    }

    function startGame() {
        state.values.totalLives = 3;
        state.view.lives.textContent = state.values.totalLives;

        state.values.result = 0;
        state.view.score.textContent = state.values.result;

        state.values.currentTime = 5;
        state.view.timeLeft.textContent = state.values.currentTime;

        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);

        addListenerHitBox();
        runGame();
    }

    // Adicione um ouvinte de eventos ao botão de início
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startGame);
});

