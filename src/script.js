


let _extraLives = 3;
const _numRows = 5;
const _numCols = 6

const levels = [{
    name: 'Multiple of 2',
    maxNumber: 10,
    test: (num) => num % 2 === 0
}];

function results(remainingLives) {
    !!remainingLives
        ? console.log(`you have ${remainingLives} lives remaining`)
        : console.log('you lost')

    cleanup();
}

let board = new Board(_extraLives, levels[0], results);


/**
 * 
 * 
 *  Add and Cleanup of listeners
 * 
 * 
 */

function keydownListener(e) {
    switch(e.key) {
        case ' ':
            e.preventDefault();
            board.munch();
            break;
        case 'ArrowUp':
            e.preventDefault();
            board.muncher.moveUp();
            break;
        case 'ArrowDown':
            e.preventDefault();
            board.muncher.moveDown();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            board.muncher.moveLeft();
            break;
        case 'ArrowRight':
            e.preventDefault();
            board.muncher.moveRight();
            break;    
    }
}

function cleanup() {
    window.removeEventListener('keydown', keydownListener);
}

window.addEventListener('keydown', keydownListener);

window.onunload = cleanup

window.close = cleanup;