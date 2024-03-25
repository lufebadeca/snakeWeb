const playBoard = document.querySelector(".play-board");

let foodX, foodY;
let snakeX = 10, snakeY = 10;
let snakeBody = []; // [ [Xhead,Yhead], [X1,Y1] ]
let velocityX = 0, velocityY = 0;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30 ) + 1;
    foodY = Math.floor(Math.random() * 30 ) + 1;
}

const changeDirection = (e) => {
    //console.log(e);
    if(e.key == "ArrowUp"){
        velocityY = -1;
        velocityX = 0;
    }
    if(e.key == "ArrowDown"){
        velocityY = 1;
        velocityX = 0;
    }
    if(e.key == "ArrowLeft"){
        velocityY = 0;
        velocityX = -1;
    }
    if(e.key == "ArrowRight"){
        velocityY = 0;
        velocityX = 1;
    }
}

const initGame = () => {
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`; 

    if(snakeX === foodX && snakeY=== foodY){    //if snake (head) touches food
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        console.log(snakeBody);
    }

    snakeX += velocityX; 
    snakeY += velocityY;

    snakeBody[0] = [snakeX, snakeY];

    for(let i=snakeBody.length; i>0; i--){
        snakeBody[i] = snakeBody[i-1]
    }

    for(let i=0; i<snakeBody.length; i++ ){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;
        // grid area (single square) for point0 Y coordinate / point0 X coordinate, then point 1, point 2...
    }
    playBoard.innerHTML = htmlMarkup;

}

changeFoodPosition();
setInterval(initGame, 700);
document.addEventListener("keydown", changeDirection);



