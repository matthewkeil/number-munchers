class Muncher {

    constructor(board) {

        this.moveTime = 100;

        this.board = board;

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
        this.element.animate({left: offset + '%'}, this.moveTime);
    }

    get row() {
        if (!this.element) return 0;

        let percentage = parseFloat(this.element[0].style.top.match(/[0-9.]*/)[0]);

        return Math.round(percentage * _numRows / 100 + 1);
    }

    set row(row) {
        let offset = (row - 1) * 100/_numRows;
        this.element.animate({top: offset + '%'}, this.moveTime);
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

    munchAnimation() {
        console.log('munch animation');
    }
}