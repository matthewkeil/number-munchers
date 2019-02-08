import $ from 'jquery';

export default class Character {
  constructor(board, name) {
    this.name = name;

    this._frozen = false;

    this.moveTime = 100;

    this.board = board;

    this._board = board._board;
    
    this._addToBoard();

    this._element = $('#' + this.name)
    
    this._sprite = $(`#${this.name} div`);
  }

  get width() {
    return this._board
      .find(`#cell-${this.row}-${this.column}`)
      .outerWidth();
  }

  set width(width) {
    this._element.css("width", width);
    return width;
  }

  get height() {
    return this._board
      .find(`#cell-${this.row}-${this.column}`)
      .outerHeight();
  }

  set height(height) {
    this._element.css("height", height);
    return height;
  }

  get column() {
    if (!this._element) return 0;

    let percentage = parseFloat(
      this._element[0].style.left.match(/[-0-9.]*/)[0]
    );

    return Math.round((percentage * this.board.cols) / 100 + 1);
  }

  set column(col) {
    let offset = ((col - 1) * 100) / this.board.cols;
    this._element.animate({ left: offset + "%" }, this.moveTime);
  }

  get row() {
    if (!this._element) return 0;

    let percentage = parseFloat(this._element[0].style.top.match(/[-0-9.]*/)[0]);

    return Math.round((percentage * this.board.rows) / 100 + 1);
  }

  set row(row) {
    let offset = ((row - 1) * 100) / this.board.rows;
    this._element.animate({ top: offset + "%" }, this.moveTime);
  }

  _addToBoard() {
    
    const element = document.createElement('div')
    element.style.width = this.width + 'px';
    element.style.height = this.height + 'px';
    element.style.top = this.column + '%';
    element.style.left = this.row + '%';

    if (this.name === "muncher") {
        element.id = this.name;
    } 
    else {
        element.className += `troggle`;
    }

    element.appendChild(document.createElement('div'))

    this._board[0].appendChild(element);
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
    if (!this.frozen) {
      this.column--;

      this._sprite.addClass("walk-left");
      setTimeout(() => {
        this._sprite.removeClass("walk-left");

        if (Number.isNaN(this.column)) {
          this._element.remove(0);
        }
      }, 100);
    }
  }

  moveRight() {
    if (!this._frozen) {
      this.column++;

      this._sprite.addClass("walk-right");
      setTimeout(() => {
        this._sprite.removeClass("walk-right");

        if (this.column > this.board.cols) {
          this._element.remove();
        }
      }, 100);
    }
  }

  moveDown() {
    if (!this._frozen) {
      this.row++;

      this._sprite.addClass("walk-down");
      setTimeout(() => {
        this._sprite.removeClass("walk-down");

        if (this.row > this.board.rows) {
          this._element.delete();
        }
      }, 200);
    }
  }

  moveUp() {
    if (!this._frozen) {
      this.row--;

      this._sprite.addClass("walk-up");
      setTimeout(() => {
        this._sprite.removeClass("walk-up");

        if (Number.isNaN(this.row)) {
          this._element.remove();
        }
      }, 200);
    }
  }
}
