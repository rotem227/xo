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
            emptyRow = true,
            allCellsAreEqual = true,
            continueSearchInRow = true;
        
        for ( rowNumber = 0 ; rowNumber < this.grid ; rowNumber++ ) {
            log("*************** Checking row number: " + rowNumber);
            cell = this.board[rowNumber]["group"+rowNumber+""];
            log("continueSearchInRow: " + continueSearchInRow + " | cellNumber: " + cellNumber);
            while ( continueSearchInRow && cellNumber < this.grid ) {
                if ( cellNumber > 0 ) {
                    log("---------------------------------------------");
                    log("--- inside while loop... checking cell number: " + cellNumber);
                    log("checking typeof cell: " + typeof(cell[cellNumber]));
                    log("checking typeof cell1 - 1: " + typeof(cell[cellNumber - 1]));
                    if ( typeof(cell[cellNumber]) != "undefined" && typeof(cell[cellNumber - 1]) != "undefined" ) {
                        if ( cell[cellNumber] != cell[cellNumber - 1] ) {
                            continueSearchInRow = false;    
                            emptyRow = false;
                            log("Different cells were found");
                        }
                    } else {
                        continueSearchInRow = false; 
                        log("Empty cell was found");
                    }
                }
                cellNumber++;
                log("---------------------------------------------");
            }
            log("End of cells while loop");
            log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            if ( continueSearchInRow ) {
                winRow = rowNumber;
                log("winRow was found: " + winRow);
            } else {
                continueSearchInRow = true;
            }
            log("*****************************************************");
        }
        log("*** End of rows loop");
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

