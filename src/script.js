


let _extraLives = 3;
const _numRows = 5;
const _numCols = 6

const levels = [{
    name: 'Multiple of 2',
    test: (num) => num % 2 === 0
}];

function win() {
    console.log('you won')
}

function lose() {
    console.log('you lost')
}

let board = new Board(levels[0], win, lose);

let muncher = new Muncher(board);


/**
 * 
 * 
 *  Add and Cleanup of listeners
 * 
 * 
 */
function resizeListener() {
    return muncher.resize();
}

function keyupListener(e) {
    switch(e.key) {
        case ' ':
            e.preventDefault();
            muncher.munch();
            break;
        case 'ArrowUp':
            e.stopImmediatePropagation();
            e.preventDefault();
            muncher.moveUp();
            break;
        case 'ArrowDown':
            e.stopImmediatePropagation();
            e.preventDefault();
            muncher.moveDown();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            muncher.moveLeft();
            break;
        case 'ArrowRight':
            e.preventDefault();
            muncher.moveRight();
            break;    
    }
}

function cleanup() {
    window.removeEventListener('resize', muncher.resize);
    window.removeEventListener('keyup', keyupListener);
}

window.addEventListener('resize', resizeListener);

window.addEventListener('keyup', keyupListener, true);

window.onbeforeunload = cleanup

window.close = cleanup;