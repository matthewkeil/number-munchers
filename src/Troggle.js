class Troggle extends Character {

  constructor(board) {
    
    super(board, "troggle");

    const directions = ['Up', 'Down', 'Left', 'Right'];

    this.direction = directions[Math.floor(Math.random() * directions.length)];

    let maxIndex;

    switch (this.direction) {
        case 'Up':
            maxIndex = this.board.cols;

        case 'Down':
            maxIndex = this.board.cols;
        case 'Left':
            maxIndex = this.board.rows;
        case 'Right':
            maxIndex = this.board.rows;
    }
    // const maxIndex = (this.direction === 'Up' || this.direction === 'Down')
    //     ? this.board.cols
    //     : this.board.rows;

    // const track = Math.floor(Math.random() * maxIndex);


  }

  move() {
      return console.log(this['move' + this.direction]);
  }
}
