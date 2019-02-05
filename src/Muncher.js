class Muncher extends Character {

    constructor(board) {
        super(board, 'muncher');
    }

    munchAnimation() {
        this.sprite.addClass('munch');
        setTimeout(() => this.sprite.removeClass('munch'), 80);
    }

    munch() {

        const id = `#cell-${this.row - 1}-${this.column - 1}`;

        const cell = this.board._board.find(id);

        const isCorrect = cell.attr('value');

        if (Number.isNaN(parseInt(isCorrect))) {
            
            if (isCorrect === 'true') {

                this.munchAnimation();

                this.board.incrementScore();
    
                cell[0].setAttribute('value', 0);
                
                cell.html('');

                this.board.remainingCorrect--;

                if (!this.board.remainingCorrect) {
                    this.board.gameOver(this.board.lives)
                }

                return;
            }

            this.board.loseLife($(`${id} h3`).text());
        }
    }

}

