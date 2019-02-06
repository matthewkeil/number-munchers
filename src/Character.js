class Character {

    constructor(board, name) {

        this.name = name;

        this._frozen = false;

        this.moveTime = 100;

        this.board = board;

        this.element = this.board._board
            .append(this._element)
            .find('#' + this.name);

        this.sprite = $(`#${this.name} div`);
    }

    get width() {
        return this.board._board.find(`#cell-${this.row}-${this.column}`).outerWidth();
    }
    
    set width(width) {
        this.element.css('width', width);
        return width;
    }

    get height() {
        return this.board._board.find(`#cell-${this.row}-${this.column}`).outerHeight();
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
        return `<div id="${this.name}" style="
        width:${this.width}px;
        height:${this.height}px;
        top:${this.column}px;
        left:${this.row}">
            <div></div>
        </div>`
    }

    freeze() {
        this._frozen = true;
    }

    unfreeze() {
        this._frozen = false;
    }

    resize() {
        this.width = this.width;
        this.height = this.height;
    }

    moveLeft() {
        if (this._frozen) return;

        this.sprite.addClass('walk-left');
        
        let col = this.column;
        this.column = --col < 1 ? 1 : col;

        setTimeout(() => this.sprite.removeClass('walk-left'), 200);
    }
    
    moveRight() {
        if (this._frozen) return;

        this.sprite.addClass('walk-right');

        let col = this.column;
        this.column = col < _numCols ? ++col : col;

        setTimeout(() => this.sprite.removeClass('walk-right'), 200);
    
    }

    moveDown() {
        if (this._frozen) return;

        this.sprite.addClass('walk-down');

        let row = this.row;
        this.row = row < _numRows ? ++row : row;

        setTimeout(() => this.sprite.removeClass('walk-down'), 200);
    
    }
    
    moveUp() {
        if (this._frozen) return;

        this.sprite.addClass('walk-up');

        let row = this.row;
        this.row = --row < 1 ? 1 : row;

        setTimeout(() => this.sprite.removeClass('walk-up'), 200);
    }
}