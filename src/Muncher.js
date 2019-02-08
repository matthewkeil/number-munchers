import $ from 'jquery';
import Character from './Character';

export default class Muncher extends Character {
  constructor(board) {
    super(board, "muncher");
  }

  munchAnimation() {
    this._sprite.addClass("munch");
    setTimeout(() => this._sprite.removeClass("munch"), 80);
  }

  munch() {
    const id = `#cell-${this.row - 1}-${this.column - 1}`;

    const cell = this.board._board.find(id);

    const isCorrect = cell.attr("value");

    if (Number.isNaN(parseInt(isCorrect))) {

      if (isCorrect === "true") {
        this.munchAnimation();

        this.board.incrementScore();

        cell[0].setAttribute("value", 0);

        cell.html('');

        this.board.remainingCorrect--;

        if (!this.board.remainingCorrect) {
          this.board.gameOver(this.board.lives);
        }

        return;
      }

      this.board.loseLife($(`${id} h3`).text());
    }
  }

  moveLeft() {
    if (this.column > 1)
        return super.moveLeft();
  }

  moveRight() {
      if (this.column < this.board.cols)
        return super.moveRight();
  }

  moveDown() {
      if (this.row < this.board.rows)
        return super.moveDown();
  }

  moveUp() {
      if (this.row > 1)
        return super.moveUp();
  }
}
