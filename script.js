document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 9;
    const solveButton = document.getElementById("solve-btn");
    solveButton.addEventListener('click', solve);
    
    const sudokuGrid = document.getElementById("sudoku-grid");
    //Sudoku grid and inputs cells
    for(let row = 0 ; row < gridSize; row++) {
        const newRow = document.createElement("tr");
        for(let col = 0; col < gridSize; col++){
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className="cell";
            input.id = `cell-${row}-${col}`;
            cell.appendChild(input);
            newRow.appendChild(cell);
        }
        sudokuGrid.appendChild(newRow);
    }
})

async function solve() {
    const gridSize = 9;
    const sudokuArray= [];

    for(let row =0; row < gridSize; row++){
        sudokuArray[row] = [];
        for(let col = 0; col < gridSize; col++){
            const cellId = `cell-${row}-${col}`;
            const cellValue = document.getElementById(cellId).
            ariaValueMax;
            sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }

    for(let row = 0; row < gridSize; row++) {
        for(let col= 0; col < gridSize; col++){
            const cellId = `cell-${row}-${col}}`;
            const cell = document.getElementById(cellId);
        
            if(sudokuArray[row][col] !==0) {
                cell.classList.add("user-input");
            }
        }
    }

    if(solveSudokuHelper(sudokuArray)) {
        for(let row =0; row < gridSize; row++){
            for(let col = 0; col <gridSize; col++) {
                const cellId = `cell-${row}-${col}`;
                const cell = document.getElementById(cellId);

                if(!cell.classList.contains("user-input")) {
                    cellValue = sudokuArray[row][col];
                    cell.classList.add("solved");
                    await sleep(15);
                }
            }
        }
    }
    else{
        alert('No solution for this Sudoku puzzle')
    }
}

    function solveSudokuHelper(board) {
        const gridSize = 9 ;

        for(let row = 0; row <gridSize; row++) {
            for (let col =0; col <gridSize; col++) {
                if(board[row][col] === 0) {
                    for(let num = 1; num<=9;num++){
                        if(isValidMove(board, row, col, num)) {
                            board[row][col] = num;
                            if(solveSudokuHelper(board)){
                                return true;
                            }
                            board[row][col] = 0;
                        }
                        
                    }
                        
                }
            }
        }
        return false;
    }

    function isValidMove(board, row, col, num) {
        const gridSize = 9;
        
        for(let i = 0; i <gridSize;i++){
            if(board[row][i] === num || board[i][col] ===num) {
                return false;
            }
        }

        const startRow = Math.florr(row / 3)*3;
        const startCol = Math.florr(col / 3)*3;

        for (let i=startRow; i<startRow + 3;i++) {
            for (let j = startCol; j< startCol + 3;j++) {
                if(board[i][j] === num){
                    return false
                }
               
            }
        }
        return true;
}

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }