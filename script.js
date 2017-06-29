var log = function(msg) {
    console.log(msg);
};

var xo = {
    grid: 3,
    board: [],
    cell: document.getElementsByClassName("xo-cell"),
    currentSumbol: "",
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
    createBoardArrays: function() {
        var i = 0;
        
        for ( i = 0 ; i < this.grid ; i++ ) {
            this.board.push({});
            this.board[i]["group"+i+""] = [];
        }
        
        log(this.board);
    },
    declareWinner: function(symbol = "") {
        log("WIN!!! -> " + symbol + " is the winner!!!");
    },
    checkHorizontal: function() {
        var cell,
            rowNumber = 0,
            cellNumber = 0,
            winRow = -1,
            searchInRow = true,
            continueChecking = true;
        
        log("*********************************************");
        log("Checking Horizonal:");
        
        while ( continueChecking ) {
            for ( rowNumber = 0 ; rowNumber < this.grid ; rowNumber++ ) {
                log("-------------------------------");
                cell = this.board[rowNumber]["group"+rowNumber+""];
                while ( searchInRow && cellNumber < this.grid ) {
                    log("Checking in row number: " + rowNumber + " | searchInRow: " + searchInRow + " cellNumber: " + cellNumber);
                    log("cell1 value: " + cell[cellNumber]);
                    log("cell2 value: " + cell[cellNumber - 1]);
                    if ( typeof(cell[cellNumber]) != "undefined" && typeof(cell[cellNumber - 1]) != "undefined" ) {
                        if ( cell[cellNumber] != cell[cellNumber - 1] ) {
                            searchInRow = false;    
                            log("Different cells were found");
                        }
                    } else {
                        searchInRow = false; 
                        log("Empty cell was found");
                    }
                    cellNumber++;
                }
                if ( searchInRow ) {
                    winRow = rowNumber;
                    continueChecking = false;
                    log("winRow was found: " + winRow);
                } else {
                    cellNumber = 0;
                    searchInRow = true;
                }
                log("End of row number: " + rowNumber);
                log("-------------------------------");
            }
        }
        
        log("*********************************************");
        log("winRow: " + winRow);
        return winRow;
        
    },
    checkVertical: function() {
    
    },
    checkDiagonal: function() {
    
    },
    checkForWin: function() {
        if ( this.checkHorizontal() > -1 ) {
            this.declareWinner();
        }
        this.checkVertical();
        this.checkDiagonal();
    },
    addSymbolToBoardGroup: function(index, symbol) {
        var boardGroupNumber = Math.floor(index / this.grid);
        this.board[boardGroupNumber]["group"+boardGroupNumber+""].push(symbol);
        
        this.checkForWin();
    },
    setSymbol: function(index, clickedElement) {
        this.generateSymbol();
        if ( clickedElement.innerHTML == "" ) {
            clickedElement.innerHTML = this.currentSymbol;
            this.addSymbolToBoardGroup(index, this.currentSymbol);
        }
    },
    createCellsClickEvents: function() {
        var i = 0,
            THIS = this;
            
        function addClickEventToCell(index) {
            THIS.cell[index].addEventListener("click", function() {
                THIS.setSymbol(index, this);
            });
        }
        
        for ( i = 0 ; i < xo.cell.length ; i++ ) {
            addClickEventToCell(i); 
        }
    },
    init: function() {
        this.createBoardArrays();
        this.createCellsClickEvents();
    }
};

document.addEventListener("DOMContentLoaded", function() {

    xo.init();

});

