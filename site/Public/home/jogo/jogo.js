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
            totalScore: 0,
            roundScores: [],
        },
        actions: {
            timerId: null,
            countDownTimerId: null,
            startTime: 0,
        },
    };

    function enviarEstatisticas(pontuacaoTotal, pontuacaoMinima, pontuacaoMaxima, tempoJogado) {
        fetch('/estatisticas/inserir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fkUsuario: sessionStorage.ID_USUARIO, 
                pontuacaoTotal: pontuacaoTotal,
                pontuacaoMinima: pontuacaoMinima,
                pontuacaoMaxima: pontuacaoMaxima,
                tempoJogado: tempoJogado,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Estatísticas enviadas com sucesso:', data);
        })
        .catch((error) => {
            console.error('Erro ao enviar estatísticas:', error);
        });
    }


    function countDown() {
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;

        if (state.values.currentTime <= 0) {
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.timerId);

            state.values.roundScores.push(state.values.result);
            state.values.totalScore += state.values.result;
            state.view.score.textContent = 0;

            updateMaxMinRoundScore();
            countLives();

            alert(`Game Over! O seu Resultado foi: ${state.values.result}`);
            if (state.values.totalLives > 0) {
                resetGame();
                runGame();
            } else {
                var totalTimePlayed = 15;
                alert(`
                    Sua pontuação total: ${state.values.totalScore}
                    Maior pontuação por rodada: ${state.values.maxRoundScore}
                    Menor pontuação por rodada: ${state.values.minRoundScore}
                    Tempo Total Jogado: ${state.values.currentTime = 15} segundos
                `);
                enviarEstatisticas(state.values.totalScore, state.values.minRoundScore, state.values.maxRoundScore, totalTimePlayed);
            }
        }
    }

    function updateMaxMinRoundScore() {
        state.values.maxRoundScore = Math.max(...state.values.roundScores);
        state.values.minRoundScore = Math.min(...state.values.roundScores);
    }

    function resetGame() {
        state.values.currentTime = 5;
        state.values.result = 0;
        state.view.score.textContent = state.values.result;
        state.actions.startTime = Date.now(); 
    }

    function runGame() {
        state.actions.timerId = setInterval(randomSquare, 800);
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
                    if (state.values.currentTime <= 0) {
                        state.view.score.textContent = 0;
                    } else if (state.values.currentTime > 0) {
                        state.values.result++;
                        state.view.score.textContent = state.values.result;
                        state.values.hitPosition = null;
                    }
                }
            });
        });
    }

    function startGame() {
        state.values.totalLives = 3;
        state.view.lives.textContent = state.values.totalLives;

        state.values.totalScore = 0;

        state.values.result = 0;
        state.view.score.textContent = state.values.result;

        state.values.currentTime = 5;
        state.view.timeLeft.textContent = state.values.currentTime;

        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);

        addListenerHitBox();
        resetGame();
        runGame();
    }

    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startGame);
});
