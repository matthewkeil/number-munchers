class Character {
  constructor(board, name) {
    this.name = name;

    this._frozen = false;

    this.moveTime = 100;

    this.board = board;

    this.element = this.board._board
      .append(this._element)
      .find("#" + this.name);

    this.sprite = $(`#${this.name} div`);
  }

  get width() {
    return this.board._board
      .find(`#cell-${this.row}-${this.column}`)
      .outerWidth();
  }

  set width(width) {
    this.element.css("width", width);
    return width;
  }

  get height() {
    return this.board._board
      .find(`#cell-${this.row}-${this.column}`)
      .outerHeight();
  }

  set height(height) {
    this.element.css("height", height);
    return height;
  }

  get column() {
    if (!this.element) return 0;

    let percentage = parseFloat(
      this.element[0].style.left.match(/[-0-9.]*/)[0]
    );

    return Math.round((percentage * this.board.cols) / 100 + 1);
  }

  set column(col) {
    let offset = ((col - 1) * 100) / this.board.cols;
    this.element.animate({ left: offset + "%" }, this.moveTime);
  }

  get row() {
    if (!this.element) return 0;

    let percentage = parseFloat(this.element[0].style.top.match(/[-0-9.]*/)[0]);

    return Math.round((percentage * this.board.rows) / 100 + 1);
  }

  set row(row) {
    let offset = ((row - 1) * 100) / this.board.rows;
    this.element.animate({ top: offset + "%" }, this.moveTime);
  }

  get _element() {
    let el = "<div";

    if (this.name === "muncher") el += ` id="${this.name}"`;
    else el += ` class="troggle"`;

    el += ` style="
        width:${this.width}px;
        height:${this.height}px;
        top:${this.column}%;
        left:${this.row}%"
        >
            <div></div>
        </div>`;

    return el;
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

      this.sprite.addClass("walk-left");
      setTimeout(() => {
        this.sprite.removeClass("walk-left");

        if (Number.isNaN(this.column)) {
          this.element.remove(0);
        }
      }, 200);
    }
  }

  moveRight() {
    if (!this._frozen) {
      this.column++;

      this.sprite.addClass("walk-right");
      setTimeout(() => {
        this.sprite.removeClass("walk-right");

        if (this.column > this.board.cols) {
          this.element.remove();
        }
      }, 200);
    }
  }

  moveDown() {
    if (!this._frozen) {
      this.row++;

      this.sprite.addClass("walk-down");
      setTimeout(() => {
        this.sprite.removeClass("walk-down");

        if (this.row > this.board.rows) {
          this.element.delete();
        }
      }, 200);
    }
  }

  moveUp() {
    if (!this._frozen) {
      this.row--;

      this.sprite.addClass("walk-up");
      setTimeout(() => {
        this.sprite.removeClass("walk-up");

        if (Number.isNaN(this.row)) {
          this.element.remove();
        }
      }, 200);
    }
  }
}
