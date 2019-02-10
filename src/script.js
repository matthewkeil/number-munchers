import Board from './Board';

let _extraLives = 3;

let board;

const levels = [
  {
    name: "Multiple of 2",
    maxNumber: 10,
    // rows: 3,
    // cols: 4,
    test: num => num % 2 === 0
  }
  // ,{
  //     name: 'Multiple of 3',
  //     maxNumber: 20,
  //     test: (num) => num % 3 === 0
  // },{
  //     name: 'Multiple of 4',
  //     maxNumber: 30,
  //     test: (num) => num % 4 === 0
  // },{
  //     name: 'Multiple of 5',
  //     maxNumber: 30,
  //     test: (num) => num % 5 === 0
  // }
];

const randomLevel = () => levels[Math.floor(Math.random() * levels.length)];

function startGame(lives, gameOver) {
  if (arguments.length === 0) {
    lives = _extraLives;
    gameOver = showStartScreen;
  }

  /**
   *
   *
   *  Event handlers and cleanup of listeners
   *
   *
   */
  function resize() {
    return board.resize.call(board);
  }

  function keydownListener(e) {
    switch (e.key) {
      case " ":
        e.preventDefault();
        board.muncher.munch();
        break;
      case "ArrowUp":
        e.preventDefault();
        board.muncher.moveUp();
        break;
      case "ArrowDown":
        e.preventDefault();
        board.muncher.moveDown();
        break;
      case "ArrowLeft":
        e.preventDefault();
        board.muncher.moveLeft();
        break;
      case "ArrowRight":
        e.preventDefault();
        board.muncher.moveRight();
        break;
    }
  }

  function cleanup() {
    window.removeEventListener("resize", resize);
    window.removeEventListener("keydown", keydownListener);
    gameOver();
  }

  function levelOver(livesLeft) {
    !!livesLeft
      ? (board = new Board(livesLeft, randomLevel(), levelOver))
      : cleanup();
  }

  /**
   *
   *
   * Setup board
   *
   *
   */
    board = new Board(lives, randomLevel(), levelOver);

  window.addEventListener("resize", resize);
  window.addEventListener("keydown", keydownListener);

  window.onunload = cleanup;
  window.close = cleanup;
}

function showStartScreen() {
  
  const main = document.getElementsByTagName('main')[0];
  main.innerHTML = '';
  
  const startButton = document.createElement('h1');
  startButton.innerText = 'Start';
  startButton.onclick = startGame;
  
  main.appendChild(startButton);
}

startGame(_extraLives, showStartScreen);

// showStartScreen()
 