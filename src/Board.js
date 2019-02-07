class Board {
  constructor(extraLives, level, gameOver) {
    this.extraLives = extraLives;
    this.level = level;
    this.gameOver = gameOver;

    this.rows = level._numRows || 5;
    this.cols = level._numCols || 6;
    this.remainingCorrect = 0;
    this.incrementScoreBy = 5;

    $("main").html(`
        <div class="board-container">
            <header>
                <h1 id="level-name">${level.name}</h1>
            </header>
            <div id="board"></div>
            <footer>
                <div class="score-container"><span>Score:</span><h3 id="score">0</h3></div>
                <div id="extra-lives"></div>
            </footer>
        </div>`);

    this.displayExtraLives();

    /**
     *
     *
     * Populate board with answers
     *
     *
     */
    this._board = $("#board");

    for (let i = 0; i < this.rows; i++) {
      this._board.append(this.buildRow(i));
    }

    /**
     *
     *
     * Characters on the board
     *
     *
     */
    this.characters = [];

    this.muncher = new Muncher(this);

    this.characters.push(this.muncher);
  }

  addTroggle() {
    this.characters.push(new Troggle(this));
  }

  resize() {
    this.characters.forEach(character => character.resize());
  }

  testCell(answer) {
    return this.level.test(answer);
  }

  randomNumber() {
    return Math.floor(Math.random() * this.level.maxNumber + 1);
  }

  buildCell(rowIndex, colIndex) {
    const number = this.randomNumber();
    const isCorrect = this.testCell(number);

    if (isCorrect) this.remainingCorrect++;

    const cell = document.createElement("div");
    cell.id = `cell-${rowIndex}-${colIndex}`;
    cell.className = "cell";
    cell.setAttribute("value", isCorrect);
    cell.innerHTML = `<p>${number}</p>`;

    return cell;
  }

  buildRow(rowIndex) {
    const row = document.createElement("div");
    row.className = "row";
    row.id = `row-${rowIndex}`;

    for (let i = 0; i < this.cols; i++)
      row.appendChild(this.buildCell(rowIndex, i));

    return row;
  }

  incrementScore() {
    const score = $("#score");

    score.text(parseInt(score.text()) + this.incrementScoreBy);

    $(".extra-life").addClass("smile");

    setTimeout(() => {
      $(".extra-life").removeClass("smile");
    }, 500);
  }

  loseLife(text) {
    $(".extra-life").addClass("frown");

    const row = $("#row-2");

    const html = row.html();

    this.muncher.freeze();

    this.muncher.element.hide();

    row.html("");

    row.append(`<div class="lose-life">
            <span>Look again!  ${text} is not a ${this.level.name.toLowerCase()}</span>
        </div>`);

    setTimeout(() => {
      row.html(html);

      this.muncher.element.show();

      this.muncher.unfreeze();

      if (this.extraLives <= 0) {
        return void this.gameOver(null);
      }

      this.extraLives--;

      this.displayExtraLives();
    }, 1500);
  }

  displayExtraLives() {
    const container = $("#extra-lives");

    container.html("");

    for (let i = 0; i < this.extraLives; i++)
      container.append($(document.createElement("div")).addClass("extra-life"));
  }
}
