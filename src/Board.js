class Board {

    constructor(lives, level, results) {
        
        $('#level-name').text(level.name);

        this.lives = lives;
        this.level = level;
        this.results = results;

        this._element = $('#board');
        this._rows = level._numRows || 5;
        this._cols = level._numCols || 6;
        this.remainingCorrect = 0;
        this.incrementBy = 5;

        for (let i = 0; i < this._rows; i++) {
            this._element.append(this.buildRow(i));
        }

        this.muncher = new Muncher(this);
        
        // this.displayExtraLives();

        this._element.on('resize', (e) => this.muncher.resize);
   }
    
    testCell(answer) {
        return this.level.test(answer);
    }

    randomNumber() {
        return Math.floor(Math.random() * this.level.maxNumber + 1)
    }

    buildCell(rowIndex, colIndex) {
        const number = this.randomNumber();
        const isCorrect = this.testCell(number);

        if (isCorrect) this.remainingCorrect++;

        const cell = document.createElement('div')
        cell.id = `cell-${rowIndex}-${colIndex}`;
        cell.className = "cell";
        cell.setAttribute('value', isCorrect);
        cell.innerHTML = `<h3>${number}</h3>`;
    
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

    munch() {

        const { row, column } = this.muncher;

        const id = `#cell-${row - 1}-${column - 1}`;

        const cell = this._element.find(id);

        const isCorrect = cell.attr('value');

        if (Number.isNaN(parseInt(isCorrect))) {
            
            if (isCorrect === 'true') {

                this.muncher.munchAnimation();

                this.incrementScore();
    
                cell[0].setAttribute('value', 0);
                
                cell.html('');

                this.remainingCorrect--;

                if (!this.remainingCorrect) {
                    this.muncher.element.remove();
                    this.results(this.lives)
                }

                return;
            }

            this.loseLife($(`${id} h3`).text());
        }
    }

    incrementScore() {
        const score = $('#score p');
        score.text(parseInt(score.text()) + this.incrementBy);
    }

    loseLife(text) {

        let row = $('#row-2');

        row.html('');

        this.muncher.element.remove();

        row.append(`<div class="lose-life">
            <span>Look again!  ${text} is not a ${this.level.name.toLowerCase()}</span>
        </div>`);

        this.results(null);
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