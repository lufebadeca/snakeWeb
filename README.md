# snakeWeb
Classic snake Game playable on a web browser
<br>
<img src="https://github.com/user-attachments/assets/8caa5982-f0f3-4d50-be98-099515cdba45" alt="drawing" style="width:200px;"/>

## Instructions
Play with arrow keys. Capture as many food items as you can to earn points until you touch the snake's body. Try and beat your highest score. But whatch out for the poisoned food items, the may harm your score!

## Characteristics

- Playboard dimentions: 30x30
- Snake speed increases after each point earned
- Data persistance for highest score

## Instalation

1. Clone the project repository
   ```bash
   git clone https://github.com/your_user/snakeWeb.git
   ```
2. Move to the recently created repository folder and open index.html. You can use live-server or VSCode integrated server.
   ```bash
   cd snakeWeb
   open index.html
   ```

## Project structure

```
snakeWeb/
│
├── index.html            # HTML main layout for the game stats and playboard
├── script.js             # Javascript logic for the game
└── style                 # styles for the game graphics
```

### Requirements and considerations
- +5 years old
- PC or laptop
- Functional arrow buttons on your keyboard

## Technical details

- The application was developed with Vanilla Javascript, HTML and CSS3.
- The playboard is made using display grid.
- The snake body is made of an array of points displaying its X and Y positions while their location on the board is handled through grid-area parameters.
- The direction and motion of the snake is updated when any of the arrow keys are pressed, changing the values of velocityX and velocityY.
- The regular food items and poisoned food items appear randomly on the board using JS native Math.random() to generate the coordinates.

## Used technologies

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**

## License

This project is under MIT License. Consult the file `LICENSE` for more details.

## Inspiration and credits:
- https://www.youtube.com/@SINERGIA_AR
