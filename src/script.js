
let _extraLives = 3;

function buildCell(rowIndex, colIndex) {
    
    const cell = document.createElement('div')
    
    cell.id = `cell-${rowIndex}-${colIndex}`;
    cell.className = "cell";

    return cell;
}

function buildRow(numCells, rowIndex) {
    
    const row = document.createElement('div');
    row.className = "row";
    row.id = `row-${rowIndex}`;

    for (let i = 0; i < numCells; i++)
        row.appendChild(buildCell(rowIndex, i));
    
    return row;
}

function displayExtraLives() {
    for (let i = 0; i < _extraLives; i++) {
        $('.extra-lives').append('<svg class="number-munch" viewBox="0 0 353.612 255.545" xml:space="preserve"><polygon fill="#DBDBDB" points="86.845,0 86.845,42.579 129.424,42.579 129.424,31.936 108.135,31.936 108.135,10.644 129.424,10.644 129.424,0  "/><rect x="108.135" y="10.644" fill="#1D1D1B" width="21.289" height="21.292"/><polygon fill="#DBDBDB" points="150.387,0 150.387,42.579 192.966,42.579 192.966,31.936 171.677,31.936 171.677,10.644 192.966,10.644 192.966,0"/><rect x="171.677" y="10.644" fill="#1D1D1B" width="21.289" height="21.292"/><polygon class="body" fill="#00FF00" points="246.224,129.199 246.224,85.89 213.755,85.89 213.755,106.201 32.81,106.201 32.81,74.068 64.85,74.068 64.85,96.052 180.95,96.052 180.95,42.579 1.354,42.579 1.354,129.199 85.908,129.199 85.908,245.737 0,245.737 0,255.545 96.393,255.545 96.393,129.199 149.831,129.199 149.831,255.545 246.224,255.545 246.224,245.737 160.315,245.737 160.315,129.199 "/></svg>')
    }
}

function buildBoard() {
    for (let i = 0; i < 5; i++) {
        $('#board').append(buildRow(6, i));
    }

    displayExtraLives();
}


buildBoard();
$('.extra-lives').append('')
