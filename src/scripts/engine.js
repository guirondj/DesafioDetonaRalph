const state= {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLefet: document.querySelectorAll("#time-left"),
        score: document.querySelectorAll("#score"),
        live: document.querySelectorAll("#live"),
    },

    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        curretTime: 60,
        result: 0,
        lives: 3
    },

    actions:{
        timerId: setInterval(randoSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown(){
    state.values.curretTime--;
    state.view.timeLefet[0].textContent = state.values.curretTime;

    if(state.values.curretTime < 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Seu tempo acabou, Seu Resultado foi: " + state.values.result)
    }
}

function playSound(){
    let audio = new Audio("./src/wav/hit.m4a");
    audio.volume = 0.1;
    audio.play();
}

function randoSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    })

    let randomNuber= Math.floor(Math.random()* 9);
    let randomSquare = state.view.squares[randomNuber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function removeLive(){
    state.values.lives--;
    state.view.live[0].textContent = state.values.lives;

    if(state.values.lives < 0){
        clearInterval(state.values.lives);
        alert("Gamer Over! Sua Vida é 0, sua pontuação foi de: " + state.values.result )
    }
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                const scoreElement = state.view.score[0];
                scoreElement.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }else{
                removeLive();
            }
        })
    })
}

function init(){
    addListenerHitBox();
}


init();
