
let _extraLives = 3;
const _numRows = 5;
const _numCols = 6

const levels = [{
    name: 'Multiples of 2',
    test: (num) => num % 2 === 0
}];

class Board {
    constructor(level) {
        
        this.name = level.name;
        $('#level-name').text(this.name);

        this.test = level.test;
        this.max_number = 10;
        
        this._element = $('#board');
        this._rows = _numRows;
        this._cols = _numCols;

        for (let i = 0; i < this._rows; i++) {
            this._element.append(this.buildRow(i));
        }
        // displayExtraLives();
    }
    
    testCell(answer) {
        return this.test(answer) ? 1 : 0;
    }

    randomNumber() {
        return Math.floor(Math.random() * this.max_number + 1)
    }

    buildCell(rowIndex, colIndex) {
        const number = this.randomNumber();

        const cell = document.createElement('div')
        cell.id = `cell-${rowIndex}-${colIndex}`;
        cell.className = "cell";
        cell.setAttribute('value', this.testCell(number));
        cell.innerHTML = `<h3>${number}</h3>`
    
        return cell;
    }

    buildRow(rowIndex) {
        
        const row = document.createElement('div');
        row.className = "row";
        row.id = `row-${rowIndex}`;
    
        for (let i = 0; i < this._cols; i++)
            row.appendChild(this.buildCell(rowIndex, i));
        
        return row;
    }
    
    // displayExtraLives() {
    //     for (let i = 0; i < _extraLives; i++) $('.extra-lives').append(`
    //         <svg class="number-munch" viewBox="0 0 353.612 255.545" xml:space="preserve">
    //             <polygon fill="#DBDBDB" points="86.845,0 86.845,42.579 129.424,42.579 129.424,31.936 108.135,31.936 108.135,10.644 129.424,10.644 129.424,0  "/>
    //             <rect x="108.135" y="10.644" fill="#1D1D1B" width="21.289" height="21.292"/>
    //             <polygon fill="#DBDBDB" points="150.387,0 150.387,42.579 192.966,42.579 192.966,31.936 171.677,31.936 171.677,10.644 192.966,10.644 192.966,0"/>
    //             <rect x="171.677" y="10.644" fill="#1D1D1B" width="21.289" height="21.292"/>
    //             <polygon class="body" fill="#00FF00" points="246.224,129.199 246.224,85.89 213.755,85.89 213.755,106.201 32.81,106.201 32.81,74.068 64.85,74.068 64.85,96.052 180.95,96.052 180.95,42.579 1.354,42.579 1.354,129.199 85.908,129.199 85.908,245.737 0,245.737 0,255.545 96.393,255.545 96.393,129.199 149.831,129.199 149.831,255.545 246.224,255.545 246.224,245.737 160.315,245.737 160.315,129.199 "/>
    //         </svg>
    //     `)
    // }
}

class Muncher {

    constructor() {
        this._board = $('#board');

        this.element = this._board
            .append(this._element)
            .find('#muncher');
    }

    get width() {
        return this._board.find(`#cell-${this.row}-${this.column}`).outerWidth();
    }
    
    set width(width) {
        this.element.css('width', width);
        return width;
    }

    get height() {
        return this._board.find(`#cell-${this.row}-${this.column}`).outerHeight();
    }

    set height(height) {
        this.element.css('height', height);
        return height;
    }

    get column() {
        if (!this.element) return 0;

        let percentage = parseFloat(this.element[0].style.left.match(/[0-9.]*/)[0]);

        return Math.round(percentage * _numCols / 100 + 1);
    }

    set column(col) {
        let offset = (col - 1) * 100/_numCols;
        this.element.css('left', offset + '%');
    }

    get row() {
        if (!this.element) return 0;

        let percentage = parseFloat(this.element[0].style.top.match(/[0-9.]*/)[0]);

        return Math.round(percentage * _numRows / 100 + 1);
    }

    set row(row) {
        let offset = (row - 1) * 100/_numRows;
        this.element.css('top', offset + '%');
    }

    get _element() {
        return `<div id="muncher" style="
        width:${this.width}px;
        height:${this.height}px;
        top:${this.column}px;
        left:${this.row}"></div>`
    }

    resize() {
        this.width = this.width;
        this.height = this.height;
    }

    moveLeft() {
        let col = this.column;
        this.column = --col < 1 ? 1 : col;
    }
    
    moveRight() {
        let col = this.column;
        this.column = col < _numCols ? ++col : col;
    }

    moveDown() {
        let row = this.row;
        this.row = row < _numRows ? ++row : row;
    }
    
    moveUp() {
        let row = this.row;
        this.row = --row < 1 ? 1 : row;
    }
    
    munch() {

        let cell = `#cell-${this.row - 1}-${this.column - 1}`;
        let value = this._board.find(cell).attr('value');

        if (value === 'eaten') return;

        if (!!parseInt(value)) {
            let element = this._board.find(cell);
            element[0].setAttribute('value', 'eaten');
            // animate graphic
            element.html('');
            return;
        }

        console.log('that is wrong there, buddy!!!')

        // this.loseLife();
    }
}

new Board(levels[0]);

let muncher = new Muncher;

window.addEventListener('resize', () => muncher.resize());

document.addEventListener('keyup', (e) => {
    switch(e.key) {
        case ' ':
            muncher.munch();
            break;
        case 'ArrowUp':
            muncher.moveUp();
            break;
        case 'ArrowDown':
            muncher.moveDown();
            break;
        case 'ArrowLeft':
            muncher.moveLeft();
            break;
        case 'ArrowRight':
            muncher.moveRight();
            break;    
    }
});