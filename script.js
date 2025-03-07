const playBoard = document.querySelector(".play-board");
const scoreTab = document.querySelector(".score");
const highestScoreTab = document.querySelector(".high-score");
const mapWidth = 30;
const mapHeight = 30;
const soundIcon = document.querySelector(".soundIcon");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const gameOverSound = document.getElementById("gameOverSound");
const musicSound = document.getElementById("musicSound");

let gameOver=false;
let foodX, foodY, poisonX, poisonY;
let snakeX = 10, snakeY = 10;
let snakeBody = []; // [ [Xhead,Yhead], [X1,Y1] ]
let velocityX = 0, velocityY = 0;
let setIntervalID;
let score=0;
let gameSpeed = 130;

soundIcon.addEventListener("click", (e)=> {
    musicSound.volume==0? musicSound.volume=1:musicSound.volume=0;
    soundIcon.classList.toggle("muted");
    soundIcon.classList.contains("muted")? soundIcon.setAttribute("src", "./sound-off.png"):soundIcon.setAttribute("src", "./sound.webp");
})

let maximumScore = localStorage.getItem("high-score") || 0;
highestScoreTab.innerHTML = `Highest score: ${maximumScore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * mapWidth ) + 1;
    foodY = Math.floor(Math.random() * mapHeight ) + 1;
}

const changePoisonPosition = () => {
    poisonX = Math.floor(Math.random() * mapWidth ) + 1;
    poisonY = Math.floor(Math.random() * mapHeight ) + 1;
}

const handleGameOver =() => {
    musicSound.pause();
    gameOverSound.playbackRate = 1.5;
    gameOverSound.play();
    clearInterval(setIntervalID); //clears the main flow interval storered at setIntervalID
    alert("Game Over. Your score was " + score);
    location.reload();
}

const changeDirection = (e) => {
    //console.log(e);
    if(e.key == "ArrowUp" && velocityY!=1 ){
        velocityY = -1;
        velocityX = 0;
    }
    if(e.key == "ArrowDown" && velocityY!=-1 ){
        velocityY = 1;
        velocityX = 0;
    }
    if(e.key == "ArrowLeft" && velocityX!=1 ){
        velocityY = 0;
        velocityX = -1;
    }
    if(e.key == "ArrowRight" && velocityX!=-1 ){
        velocityY = 0;
        velocityX = 1;
    }
}

const initGame = () => {
    
    musicSound.play();
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`; 
    htmlMarkup += `<div class="poison" style="grid-area: ${poisonY} / ${poisonX};"></div>`; 

    if(snakeX <= 0 || snakeX>mapWidth || snakeY <=0 || snakeY>mapHeight ) {
        //gameOver=true;
        console.log(`before, snakeX: ${snakeX}, snakeY: ${snakeY}`);
        if (snakeY < 1) {
            snakeY = mapHeight;
        }  
        else if (snakeY > mapHeight) { //happens first
            snakeY = 1;
        }  
        else if (snakeX < 1) {
            snakeX = mapWidth;
        }  
        else if (snakeX > mapWidth) {
            snakeX = 1;
        }
        console.log(`after, snakeX: ${snakeX}, snakeY: ${snakeY} Food X,Y: ${foodX} ${foodY}`);
        //wathc out. It's reaching 30 for X and Y when passing by the lower right corner
    }

    if(snakeX === foodX && snakeY=== foodY){    //if snake (head) touches food
        console.log(`Snake X,Y: ${snakeX}, ${snakeY} Food X,Y: ${foodX}, ${foodY}`)
        correctSound.playbackRate = 2;
        correctSound.play();
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        maximumScore = score >= maximumScore ? score: maximumScore;
        localStorage.setItem("high-score", maximumScore);
        highestScoreTab.innerHTML = `Highest score: ${maximumScore}`;

        scoreTab.innerHTML = `Score: ${score}`
        //console.log(snakeBody);
        if(gameSpeed>80){
            gameSpeed -=2;
            musicSound.playbackRate+= 0.01;
        }
    }

    if(snakeX === poisonX && snakeY=== poisonY){    //if snake (head) touches poison
        wrongSound.playbackRate = 1.8;
        wrongSound.play();
        changePoisonPosition();
        //snakeBody.push([foodX, foodY]);
        score = score >= 5 ? score - 5 : 0;

        //maximumScore = score >= maximumScore ? score: maximumScore;
        //localStorage.setItem("high-score", maximumScore);
        //highestScoreTab.innerHTML = `Highest score: ${maximumScore}`;

        scoreTab.innerHTML = `Score: ${score}`
    }

    for(let i=snakeBody.length-1; i>0; i--){    //rearrange the rest of the body decreasingly from head snakeX Y
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX, snakeY];
    snakeX += velocityX; 
    snakeY += velocityY;
    //snakeBody[0] = [snakeX, snakeY];
    //snakeX += velocityX; 
    //snakeY += velocityY;

    for(let i=0; i<snakeBody.length; i++ ){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;
        // grid area (single square) for point0 Y coordinate / point0 X coordinate, then point 1, point 2...
        if(i!== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;

}

changeFoodPosition();
changePoisonPosition();
setIntervalID = setInterval(initGame, gameSpeed);
document.addEventListener("keydown", changeDirection);



