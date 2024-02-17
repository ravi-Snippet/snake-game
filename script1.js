 // Define HTML elements
 const board = document.getElementById('game-board');
 const instructionText = document.getElementById('instruction-text');
 const scoreText = document.getElementById('score');
 const highScoreText = document.getElementById('highScore');

 // Define game variables
 const gridSize = 20;
 let snake = [{ x: 10, y: 10 }];
 let food = generateFood();
 let highScore = 0;
 let direction = 'right';
 let gameInterval;
 let gameSpeedDelay = 200;
 let gameStarted = false;

 // Draw game map, snake, and food
 function draw() {
   board.innerHTML = '';
   drawSnake();
   drawFood();
   updateScore();
 }

 // Draw Snake
 function drawSnake() {
   snake.forEach((segment) => {
     const snakeElement = createGameElement('div', 'snake');
     setPosition(snakeElement, segment);
     board.appendChild(snakeElement);
   });
 }

 // Create a snake or food cube/div
 function createGameElement(tag, className) {
   const element = document.createElement(tag);
   element.className = className;
   return element;
 }

 // Set the position of snake or food
 function setPosition(element, position) {
   element.style.gridColumn = position.x;
   element.style.gridRow = position.y;
 }

 // Draw food function
 function drawFood() {
   if (gameStarted) {
     const foodElement = createGameElement('div', 'food');
     setPosition(foodElement, food);
     board.appendChild(foodElement);
   }
 }

 // Generate food
 function generateFood() {
   const x = Math.floor(Math.random() * gridSize) + 1;
   const y = Math.floor(Math.random() * gridSize) + 1;
   return { x, y };
 }

 // Moving the snake
 function move() {
   const head = { ...snake[0] };
   switch (direction) {
     case 'up':
       head.y--;
       break;
     case 'down':
       head.y++;
       break;
     case 'left':
       head.x--;
       break;
     case 'right':
       head.x++;
       break;
   }

   if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
     resetGame();
     return;
   }

   snake.unshift(head);

   if (head.x === food.x && head.y === food.y) {
     food = generateFood();
     increaseSpeed();
    
   } else {
     snake.pop();
   }
 }

 // Start game function
 function startGame() {
   gameStarted = true;
   instructionText.style.display = 'none';
   logo.style.display='none';
   gameInterval = setInterval(() => {
     move();
     checkCollision();
     draw();
   }, gameSpeedDelay);
 }

 // Keypress event listener
 function handleKeyPress(event) {
   if ((!gameStarted && event.code === 'Space') || (!gameStarted && event.key === ' ')) {
     startGame();
   } else {
     switch (event.key) {
       case 'ArrowUp':
         direction = 'up';
         break;
       case 'ArrowDown':
         direction = 'down';
         break;
       case 'ArrowLeft':
         direction = 'left';
         break;
       case 'ArrowRight':
         direction = 'right';
         break;
     }
   }
 }

 document.addEventListener('keydown', handleKeyPress);

 // Increase speed
 function increaseSpeed() {
   if (gameSpeedDelay > 25) {
     gameSpeedDelay -= 5;
   }
 }

 // Check collision
 function checkCollision() {
   const head = snake[0];
   for (let i = 1; i < snake.length; i++) {
     if (head.x === snake[i].x && head.y === snake[i].y) {
       resetGame();
       return;
     }
   }
 }

// Reset game
function resetGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    if (snake.length - 1 > highScore) {
        highScore = snake.length - 1;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore(); // Update the score after resetting the game
    draw(); // Redraw the game board
}


 // Update score
 //function updateScore() {
   //scoreText.textContent = (snake.length - 1).toString().padStart(3, '0');
 //}
 function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
}
