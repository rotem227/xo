var log = function(msg) {
    //console.log(msg);
};

var xo = {
    grid: 5,
    board: [],
    rowClass: ".xo-row",
    cellClass: ".xo-cell",
    currentSumbol: "",
    win: {
        symbol: "",
        array: [],
        index: 0,
        direction: ""
    },
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
        
        //log(this.board);
    },
    declareWinner: function() {
        alert("***** WIN!!! -> " + this.win.symbol + " is the winner!!!");
        return false;
    },
    markWin: function(winArray, direction) {
        console.log("****************** winning array:");
        console.log(this.win.array);
        console.log("win symbol: " + this.win.symbol);
        console.log("win index: " + this.win.index);
        console.log("win direction: " + this.win.direction);
    },
    isEqual: function(checkArray) {
        var i = 0;
        
        for ( i = 0 ; i < checkArray.length ; i++ ) {
            if ( i > 0 ) {
                if ( checkArray[i] != checkArray[i-1] ) {
                    return false;
                    log("isEqual() -> all values are NOT equal");
                } else {
                    if ( checkArray[i] == undefined || checkArray[i-1] == undefined ) {
                        return false;
                        log("isEqual() -> all values are NOT equal");
                    }
                }
            }
        }
        
        log("isEqual() -> all values are equal");
        return true;
    },
    isSeriesOfThree: function(checkArray) {
        var i = 0,
            z = 0,
            lastLoopValue = 0,
            arrayOfThree = [],
            seriesOfThree = false;

        if ( checkArray.length > 3 ) {
            lastLoopValue = checkArray.length - 2;
        } else {
            lastLoopValue = 1;
        }
        
        for ( i = 0 ; i < lastLoopValue ; i++ ) {
            for ( z = 0 ; z < 3 ; z++ ) {
                arrayOfThree.push( checkArray[i + z] );
            }
            
            if ( this.isEqual(arrayOfThree) ) {
                this.win.array = checkArray;
                this.win.symbol = arrayOfThree[0];
                return true;
            } 
            
            arrayOfThree = [];
        }
        
        return false;
    },
    checkHorizontal: function() {
        var rowArray = [],
            rowNumber = 0,
            winRow = -1;
            
        log("------------------------------------------------------------------------ checkHorizontal()");

        for ( rowNumber = 0 ; rowNumber < this.grid ; rowNumber++ ) {
            rowArray = this.board[rowNumber];
            // Minimum of 3 values are needed for victory
            if ( rowArray.length > 2 ) {
                if ( this.isSeriesOfThree(rowArray) ) {
                    winRow = rowNumber;
                    this.win.index = winRow;
                    this.win.direction = "horizontal";
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

            // Minimum of 3 values are needed for victory
            if ( columnArray.length > 2 ) {
                if ( this.isSeriesOfThree(columnArray) ) {
                    winColumn = columnNumber;
                    this.win.index = winColumn;
                    this.win.direction = "vertical";
                    return winColumn;
                }
            }
            
            columnArray = [];
        }

        return -1;
    },
/*
    checkDiagonal: function() {
        var that = this,
            i = 0,
            diagonalLoop = 0,
            diagonalArray = [],
            diagonalIndex = 0,
            winDiagonal = -1;
            
        console.log("------------------------------------------------------------------------ checkDiagonal()");
        
        function addCellValueToArray(row, column) {
            if ( that.board[row][column] != undefined ) {
                diagonalArray.push(that.board[row][column]);
            }
        }
        
        function createBackSlashDiagonalArray(index) {
            for ( diagonalIndex = 0 ; diagonalIndex < that.grid ; diagonalIndex++ ){
                addCellValueToArray(diagonalIndex, diagonalIndex);
            }
        }
        
        function createForwardSlashDiagonalArray(index) {
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
  
            // Minimum of 3 values are needed for victory
            if ( diagonalArray.length > 2 ) {
                if ( this.isSeriesOfThree(diagonalArray) ) {
                    winDiagonal = diagonalLoop;
                    this.win.index = winDiagonal;
                    this.win.direction = "diagonal";
                    return winDiagonal;
                }
            }
            
            diagonalArray = [];
            diagonalLoop++;
        }
        
        return -1;
    },
*/
    checkDiagonal: function() {
        var that = this,
            i = 0,
            z = 0,
            q = 0,
            diagonalArray = [],
            winDiagonal = -1;
            
        console.log("------------------------------------------------------------------------ checkDiagonal()");
        
        function addCellValueToArray(row, column) {
            console.log("$$$ getting the values of row: " + row + " column: " + column);
            diagonalArray.push(that.board[row][column]);
        }
        
        function createBackSlashDiagonalArray(row, column) {
            console.log("----- backSlash -> loop of: " + row + " until less than: " + (row + 3));
            for ( q = row ; q < row + 3 ; q++ ) {
                addCellValueToArray(q, column);
                column++;
            }
            console.log("----- end of backSlash loop");
        }
        
        function createForwardSlashDiagonalArray(row, column) {
            //console.log("forwardSlash: " + " row: " + row + " column: " + column);
            for ( q = column ; q >= column - 2 ; q-- ){
                addCellValueToArray(row, q);
                row++;
            }
        }
        
        function checkForDiagonalWin() {
            // Minimum of 3 values are needed for victory
            if ( diagonalArray.length > 2 ) {
                if ( that.isSeriesOfThree(diagonalArray) ) {
                    winDiagonal = i;
                    that.win.index = winDiagonal;
                    that.win.direction = "diagonal";
                    console.log("win!: " + winDiagonal);
                    return winDiagonal;
                }
            }
            
            console.log("*** can't find a win");
            //console.log("------------------");
            
            diagonalArray = [];
            return -1;
        }
        
        
        // Rows - starting point limit - loop
        for ( i = 0 ; i < ((this.grid - 3) + 1) ; i++ ) {
            // Cells loop
            for ( z = 0 ; z < this.grid ; z++ ) {
                // Right diagonal
                if ( z + 2 < this.grid ) {
                    console.log("i: " + i + " z: " + z);
                    //console.log("Right check -> i: " + i + " z: " + z + " | right");
                    createBackSlashDiagonalArray(i, z);
                }
                
                console.log(diagonalArray);
                
                if ( checkForDiagonalWin() > -1 ) {
                    return winDiagonal;
                }

                //diagonalArray = [];
                // Left diagonal
                /*
                if ( z - 2 >= 0 ) {
                    console.log("Left Check -> i: " + i + " z: " + z + " | left");
                    createForwardSlashDiagonalArray(i, z);
                }
                
                console.log("--------- Left:");
                console.log(diagonalArray);
                console.log("---------------");
                */
                
                //if ( checkForDiagonalWin() > -1 ) {
                    //return winDiagonal;
                //}
                
                diagonalArray = [];
            }
        }
        
        console.log("**********************************************************");
        console.log("**********************************************************");
        console.log("**********************************************************");
        
        return -1;
    },
    checkForWin: function() {
        if ( this.checkHorizontal() > -1 || this.checkVertical() > -1 || this.checkDiagonal() > -1 ) {
            this.markWin();
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
    setCellsStyle: function() {
        var i = 0,
            z = 0,
            cell = document.getElementsByClassName("xo-cell"),
            cellStyleProperties = ["width", "height", "lineHeight"],
            cellSize = (window.innerWidth / 10) - (this.grid * 7);
        
        if ( cellSize < 40 ) {
            cellSize = 40;
        }
        
        for ( i = 0 ; i < cell.length ; i++ ) {
            for ( z = 0 ; z < cellStyleProperties.length ; z++ ) {
                cell[i].style[cellStyleProperties[z]] = cellSize + "px";
                cell[i].style.fontSize = (cellSize / 2) + "px";
            }
        }

    },
    generateGameBoard: function() {
        var row = 0,
            column = 0,
            xoContainer = document.getElementsByClassName("xo-container")[0],
            xoRow,
            xoCell;
            
        while (xoContainer.firstChild) {
            xoContainer.removeChild(xoContainer.firstChild);
        }
        
        for ( row = 0 ; row < this.grid ; row++ ) {
            xoRow = document.createElement("div");
            xoRow.className = "xo-row";
            xoContainer.appendChild(xoRow);
            
            xoRow = document.getElementsByClassName("xo-row")[row];
            for ( column = 0 ; column < this.grid ; column++ ) {
                xoCell = document.createElement("div");
                xoCell.className = "xo-cell";
                xoRow.appendChild(xoCell);
            }            
        }
    },
    init: function() {
        this.generateGameBoard();
        this.setCellsStyle();
        this.createHorizontalArrays();
        this.createCellsClickEvents();
    }
};

var setGrid = function(rangeSelectedValue) {
    var i = 0,
        rangeLabels = document.querySelectorAll(".xo-range .range-labels label");
    
    for ( i = 0 ; i < rangeLabels.length ; i++ ) {
        rangeLabels[i].className = "";
    }   
    
    rangeLabels[rangeSelectedValue - 3].className = "range-selected-value";
    
    xo.grid = rangeSelectedValue;
    xo.init();

};

window.onresize = function() {
    xo.setCellsStyle();
};

document.addEventListener("DOMContentLoaded", function() {

    document.getElementsByName("range")[0].value = 4;
    setGrid(document.getElementsByName("range")[0].value);

});

