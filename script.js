var log = function(msg) {
    console.log(msg);
};

var xo = {
    grid: 4,
    board: [],
    rowClass: ".xo-row",
    cellClass: ".xo-cell",
    currentSumbol: "",
    winner: "",
    generateSymbol: (function() {
        var symbols = ["X", "O"],
            randomBinary = Math.floor(Math.random() * 2),
            chosenSymbol = symbols[randomBinary];
        
        function getSymbol() {
            return ( chosenSymbol == symbols[0] ) ? symbols[1] : symbols[0];
        }
        
        this.currentSymbol = getSymbol();
        log("FIRST SYMBOL: " + this.currentSymbol);       
       
        return function() {
            chosenSymbol = getSymbol();
            this.currentSymbol = chosenSymbol;
            return chosenSymbol;
        };
    }()),
    createHorizontalArrays: function() {
        var i = 0;
        
        for ( i = 0 ; i < this.grid ; i++ ) {
            this.board.push({});
            this.board[i] = [];
        }
        
        log(this.board);
    },
    declareWinner: function() {
        alert("***** WIN!!! -> " + this.winner + " is the winner!!!");
        return false;
    },
    isEqual: function(checkArray) {
        var i = 0;
        
        for ( i = 0 ; i < checkArray.length ; i++ ) {
            if ( i > 0 ) {
                //log("checking if : " + checkArray[i] + " is equal to: " + checkArray[i-1]);
                if ( checkArray[i] != checkArray[i-1] ) {
                    //log("both values are different");
                    return false;
                    log("isEqual() -> all values are NOT equal");
                } else {
                    //log("checking if one of the value is undefined");
                    if ( checkArray[i] == undefined || checkArray[i-1] == undefined ) {
                        //log("one of the values is undefined");
                        return false;
                        log("isEqual() -> all values are NOT equal");
                    }
                }
            }
        }
        
        log("isEqual() -> all values are equal");
        return true;
    },
    checkHorizontal: function() {
        var rowArray = [],
            rowNumber = 0,
            winRow = -1;
            
        log("------------------------------------------------------------------------ checkHorizontal()");

        for ( rowNumber = 0 ; rowNumber < this.grid ; rowNumber++ ) {
            rowArray = this.board[rowNumber];
            if ( rowArray.length == this.grid ) {
                if ( this.isEqual(rowArray) ) {
                    winRow = rowNumber;
                    this.winner = rowArray[0];
                    return winRow;
                }
            }
        }

        return -1;
    },
    checkVertical: function() {
        var columnArray = [],
            columnNumber = 0,
            winColumn = -1,
            boardRow = 0;
        
        log("------------------------------------------------------------------------ checkVertical()");
        
        for ( columnNumber = 0 ; columnNumber < this.grid ; columnNumber++ ) {
            for ( boardRow = 0 ; boardRow < this.grid ; boardRow++ ) {
                if ( this.board[boardRow][columnNumber] != undefined ) {
                    columnArray.push( this.board[boardRow][columnNumber] );
                }
            }

            if ( columnArray.length == this.grid ) {
                if ( this.isEqual(columnArray) ) {
                    winColumn = columnNumber;
                    this.winner = columnArray[0];
                    return winColumn;
                }
            }
            
            columnArray = [];
        }

        return -1;
    },
    checkDiagonal: function() {
        var that = this,
            i = 0,
            diagonalLoop = 0,
            diagonalArray = [],
            diagonalIndex = 0,
            winDiagonal = -1;
            
        log("------------------------------------------------------------------------ checkDiagonal()");
        
        function addCellValueToArray(row, column) {
            if ( that.board[row][column] != undefined ) {
                diagonalArray.push(that.board[row][column]);
            }
        }
        
        function createBackSlashDiagonalArray() {
            for ( diagonalIndex = 0 ; diagonalIndex < that.grid ; diagonalIndex++ ){
                addCellValueToArray(diagonalIndex, diagonalIndex);
            }
        }
        
        function createForwardSlashDiagonalArray() {
            var rowNumber = 0;
            for ( diagonalIndex = that.grid - 1 ; diagonalIndex >= 0 ; diagonalIndex-- ){
                addCellValueToArray(rowNumber, diagonalIndex);
                rowNumber++;
            }
        }
        
        while ( diagonalLoop < 2 ) {
            if ( diagonalLoop == 0 ) {
                createBackSlashDiagonalArray();
            } else if ( diagonalLoop == 1 ) {
                createForwardSlashDiagonalArray();
            }
  
            if ( diagonalArray.length == this.grid ) {
                if ( this.isEqual(diagonalArray) ) {
                    winDiagonal = diagonalLoop;
                    this.winner = diagonalArray[0];
                    return winDiagonal;
                }
            }
            
            diagonalArray = [];
            diagonalLoop++;
        }
        
        return -1;
    },
    checkForWin: function() {
        if ( this.checkHorizontal() > -1 || this.checkVertical() > -1 || this.checkDiagonal() > -1 ) {
            //this.declareWinner();
        }
        if ( this.checkHorizontal() > -1 ) {
            alert("Horizintal Win!: " + this.checkHorizontal());
        }
        if ( this.checkVertical() > -1 ) {
            alert("Vertical Win!: " + this.checkVertical());
        }
        if ( this.checkDiagonal() > -1 ) {
            alert("Diagonal Win!: " + this.checkDiagonal());
        }
    },
    addSymbolToHorizontalArray: function(symbol, cellNumber, rowNumber) {
        this.board[rowNumber][cellNumber] = symbol;
        log("------------------------ START BOARD ------------------------");
        log(this.board[0]);
        log(this.board[1]);
        log(this.board[2]);
        log("------------------------- END BOARD -------------------------");
        this.checkForWin();
    },
    setSymbolInCell: function(cell, cellNumber, rowNumber) {
        this.generateSymbol();
        if ( cell.innerHTML == "" ) {
            cell.innerHTML = this.currentSymbol;
            this.addSymbolToHorizontalArray(this.currentSymbol, cellNumber, rowNumber);
        }
    },
    createCellsClickEvents: function() {
        var currentRow = 0,
            currentCell = 0,
            that = this,
            row = document.querySelectorAll(this.rowClass),
            cell;
            
        function addClickEventToCell(cellElement, cellNumber, rowNumber) {
            cellElement.addEventListener("click", function() {
                that.setSymbolInCell(this, cellNumber, rowNumber);
            });
        }
        
        for ( currentRow = 0 ; currentRow < this.grid ; currentRow++ ) {
            cell = row[currentRow].querySelectorAll(this.cellClass);
            for ( currentCell = 0 ; currentCell < this.grid ; currentCell++ ) {
                addClickEventToCell(cell[currentCell], currentCell, currentRow); 
            }
        }
    },
    init: function() {
        this.createHorizontalArrays();
        this.createCellsClickEvents();
    }
};

document.addEventListener("DOMContentLoaded", function() {

    xo.init();

});

