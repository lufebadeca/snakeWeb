const playBoard = document.querySelector(".play-board");

let gameOver=false;
let foodX, foodY;
let snakeX = 10, snakeY = 10;
let snakeBody = []; // [ [Xhead,Yhead], [X1,Y1] ]
let velocityX = 0, velocityY = 0;
let setIntervalID;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30 ) + 1;
    foodY = Math.floor(Math.random() * 30 ) + 1;
}

const handleGameOver =() => {
    clearInterval(setIntervalID); //clears the main flow interval storered at setIntervalID
    alert("Game Over");
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
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`; 

    if(snakeX === foodX && snakeY=== foodY){    //if snake (head) touches food
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        console.log(snakeBody);
    }

    for(let i=snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1]
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX; 
    snakeY += velocityY;
    
    if(snakeX <= 0 || snakeX>30 || snakeY <=0 || snakeY>30 ) {
        gameOver=true;
    }

    for(let i=0; i<snakeBody.length; i++ ){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;
        // grid area (single square) for point0 Y coordinate / point0 X coordinate, then point 1, point 2...
    }
    playBoard.innerHTML = htmlMarkup;

}

changeFoodPosition();
setIntervalID = setInterval(initGame, 130);
document.addEventListener("keydown", changeDirection);



