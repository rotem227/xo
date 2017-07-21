var log = function(msg) {
    //console.log(msg);
};

var xo = {
    grid: 5,
    board: [],
    rowClass: "xo-row",
    cellClass: "xo-cell",
    currentSumbol: "",
    win: {
        symbol: "",
        array: [],
        index: [],
        direction: "",
        color: "blue"
    },
    generateSymbol: (function() {
        var symbols = ["X", "O"],
            randomBinary = Math.floor(Math.random() * 2),
            chosenSymbol = symbols[randomBinary];
        
        // Swtiching between the symbols to get a different value in each time
        function getSymbol() {
            return ( chosenSymbol == symbols[0] ) ? symbols[1] : symbols[0];
        }
        
        // Setting the first player symbol
        this.currentSymbol = getSymbol();
        log("FIRST SYMBOL: " + this.currentSymbol);       
       
        return function() {
            chosenSymbol = getSymbol();
            this.currentSymbol = chosenSymbol;
            return chosenSymbol;
        };
    }()),
    declareWinner: function() {
        alert("***** WIN!!! -> " + this.win.symbol + " is the winner!!!");
        return false;
    },
    isValueInArray: function(value, array) {
        var i = 0;

        if ( array.length > 0 ) {
            for ( i = 0 ; i < array.length ; i++ ) {
                if ( value == array[i] ) {
                    return true;
                }
            }
        }
        
        return false;
    },
    createSequenceMapArray: function(array) {
        var i = 0,
            value = 0,
            sequenceMapArray = [];

        for ( i = 0 ; i < (array.length - 2) ; i++ ) {
            if ( array[i] == array[i+1] && array[i] == array[i+2] ) {
                value = i;
                while ( value < i + 3 ) {
                    if ( !this.isValueInArray(value, sequenceMapArray) ) {
                       sequenceMapArray.push(value); 
                    }
                    value++;
                }
            }
        }
        
        return sequenceMapArray;
    },
    markHorizontalWin: function() {
        var i = 0,
            winRowIndex = this.win.index[0],
            winRowArray = this.board[winRowIndex],
            sequenceMap = this.createSequenceMapArray(winRowArray),
            xoRow = document.getElementsByClassName(this.rowClass)[winRowIndex],
            xoCell = xoRow.getElementsByClassName(this.cellClass);
        
        for ( i = 0 ; i < sequenceMap.length ; i++ ) {
            xoCell[sequenceMap[i]].style.color = this.win.color;
        }
    },
    markVerticalWin: function() {
        var i = 0,
            winColumnIndex = this.win.index[0],
            winColumnArray = [],
            sequenceMap = [];
        
        // Build vertical array from board
        for ( i = 0 ; i < this.grid ; i++ ) {
            winColumnArray.push(this.board[i][winColumnIndex]);
        }
        
        sequenceMap = this.createSequenceMapArray(winColumnArray);
 
        console.log("vertical win:");
        console.log(sequenceMap);
        console.log(winColumnIndex);
    },
    markDiagonalWin: function() {
        var that = this,
            i = 0,
            winDiagonalIndex = this.win.index,
            winDiagonalArray = [],
            winDiagonalDirection = this.win.direction,
            sequenceMap = [];
        
        console.log("diagonal win:");
        console.log(winDiagonalIndex);
        console.log(winDiagonalDirection);
        
        // Building a backslash array from starting point of row and column
        function buildBackSlashArray(row, column) {
            while ( row < that.grid && column < that.grid  ) {
                winDiagonalArray.push(that.board[row][column]);
                row++;
                column++;
            }
        }
        
        // Building a forward array from starting point of row and column
        function buildForwardSlashArray(row, column) {
            while ( row < that.grid && column > -1 ) {
                winDiagonalArray.push(that.board[row][column]);
                row++;
                column--;
            }
        }
        
        // Mark backslash array from starting point of row and column repeating until length value
        function markBackSlashDiagonal(row, column, length) {
        
        }
        
        // Mark forwardslash array from starting point of row and column repeating until length value
        function markForwardSlashDiagonal(row, column, length) {
        
        }
        
        if ( winDiagonalDirection == "backslash" ) {
            buildBackSlashArray(winDiagonalIndex[0], winDiagonalIndex[1]);
        } else if ( winDiagonalDirection == "forwardslash" ) {
            buildForwardSlashArray(winDiagonalIndex[0], winDiagonalIndex[1]);
        }
        
        console.log("************************************************ diagonal win:");
        console.log(winDiagonalArray);
        console.log("*****************************************************************");
        
        sequenceMap = this.createSequenceMapArray(winDiagonalArray);
        
        console.log(sequenceMap);
        console.log(winDiagonalIndex);
        
        if ( winDiagonalDirection == "backslash" ) {
            markBackSlashDiagonal(winDiagonalIndex[0], winDiagonalIndex[1], sequenceMap.length);
        } else if ( winDiagonalDirection == "forwardslash" ) {
             markForwardSlashDiagonal(winDiagonalIndex[0], winDiagonalIndex[1], sequenceMap.length);
        }
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
    isSequnceOfThree: function(checkArray) {
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

        for ( rowNumber = 0 ; rowNumber < this.grid ; rowNumber++ ) {
            rowArray = this.board[rowNumber];
            // Minimum of 3 values are needed for victory
            if ( rowArray.length > 2 ) {
                if ( this.isSequnceOfThree(rowArray) ) {
                    winRow = rowNumber;
                    this.win.index.push(winRow);
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
        
        for ( columnNumber = 0 ; columnNumber < this.grid ; columnNumber++ ) {
            for ( boardRow = 0 ; boardRow < this.grid ; boardRow++ ) {
                if ( this.board[boardRow][columnNumber] != undefined ) {
                    columnArray.push( this.board[boardRow][columnNumber] );
                }
            }

            // Minimum of 3 values are needed for victory
            if ( columnArray.length > 2 ) {
                if ( this.isSequnceOfThree(columnArray) ) {
                    winColumn = columnNumber;
                    this.win.index.push(winColumn);
                    this.win.direction = "vertical";
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
            z = 0,
            q = 0,
            diagonalArray = [],
            currentDiagonal = "",
            winDiagonal = -1;
        
        function addCellValueToDiagonalArray(row, column) {
            diagonalArray.push(that.board[row][column]);
        }
        
        // Checking 3 rows at a time
        function createBackSlashDiagonalArray(row, column) {
            currentDiagonal = "backslash";
            for ( q = row ; q < row + 3 ; q++ ) {
                addCellValueToDiagonalArray(q, column);
                column++;
            }
        }
        
        // checking 3 columns at a time
        function createForwardSlashDiagonalArray(row, column) {
            currentDiagonal = "forwardslash";
            for ( q = column ; q >= column - 2 ; q-- ) {
                addCellValueToDiagonalArray(row, q);
                row++;
            }
        }
        
        function checkForDiagonalWin(row, column) {
            // Minimum of 3 values are needed for victory
            if ( diagonalArray.length > 2 ) {
                if ( that.isSequnceOfThree(diagonalArray) ) {
                    winDiagonal = i;
                    that.win.index = [row, column];
                    that.win.direction = currentDiagonal;
                    log("win!: " + winDiagonal);
                    return winDiagonal;
                }
            }
            
            diagonalArray = [];
            return -1;
        }
        
        // Rows loop - last row number of searching for diagonal sequnce is (this.grid - 2)
        for ( i = 0 ; i < (this.grid - 2) ; i++ ) {
            // Cells loop
            for ( z = 0 ; z < this.grid ; z++ ) {
                // BackSlash diagonal
                if ( z + 2 < this.grid ) {
                    createBackSlashDiagonalArray(i, z);
                }
                
                if ( checkForDiagonalWin(i, z) > -1 ) {
                    return winDiagonal;
                }
                
                // ForwardSlash diagonal
                if ( z - 2 >= 0 ) {
                    createForwardSlashDiagonalArray(i, z);
                }

                if ( checkForDiagonalWin(i, z) > -1 ) {
                    return winDiagonal;
                }
            }
        }
        
        return -1;
    },
    checkForWin: function() {
        if ( this.checkHorizontal() > -1 ) {
            this.markHorizontalWin();
        } else if ( this.checkVertical() > -1 ) {
            this.markVerticalWin();
        } else if ( this.checkDiagonal() > -1 ) {
            this.markDiagonalWin();
        }
    },
    addSymbolToHorizontalArray: function(symbol, cellNumber, rowNumber) {
        // Adding current symbol to horizontal arrays and check for a winning sequnce
        this.board[rowNumber][cellNumber] = symbol;
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
            row = document.getElementsByClassName(this.rowClass),
            cell;
        
        // Adding click event to a cell
        function addClickEventToCell(cellElement, cellNumber, rowNumber) {
            cellElement.addEventListener("click", function() {
                that.setSymbolInCell(this, cellNumber, rowNumber);
            });
        }
        
        // Iteraing the cells and calling the 'add click event' function
        for ( currentRow = 0 ; currentRow < this.grid ; currentRow++ ) {
            cell = row[currentRow].getElementsByClassName(this.cellClass);
            for ( currentCell = 0 ; currentCell < this.grid ; currentCell++ ) {
                addClickEventToCell(cell[currentCell], currentCell, currentRow); 
            }
        }
    },
    createHorizontalArrays: function() {
        /*
            Clicking on a cell will save its value in a horizontal order -
            according the current row of the cell.
            All the cells in the first row will be assigned to the first array,
            All the cells in the second row will be assigned to the second array, and so on..
            
            This way, it will be easy to search for a winning sequence:
            - Horizontal: In the current order of the arrays
            - Vertical: In the first value of each array, second values of each array and so on..
            - Diagonal: Iterating the arrays values in diagonal pattern
        */
        var i = 0;
        
        for ( i = 0 ; i < this.grid ; i++ ) {
            this.board.push({});
            this.board[i] = [];
        }
    },
    setCellsStyle: function() {
        var i = 0,
            z = 0,
            cell = document.getElementsByClassName("xo-cell"),
            cellStyleProperties = ["width", "height", "lineHeight"],
            cellSize = (window.innerWidth / 10) - (this.grid * 7)
            minimumCellSize = 40;
        
        if ( cellSize < minimumCellSize ) {
            cellSize = minimumCellSize;
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
        
        // Delete current board
        while (xoContainer.firstChild) {
            xoContainer.removeChild(xoContainer.firstChild);
        }
        
        // Generate new baord
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
    //xo.grid = 35;
    xo.init();

};

window.onresize = function() {
    xo.setCellsStyle();
};

document.addEventListener("DOMContentLoaded", function() {

    document.getElementsByName("range")[0].value = 4;
    setGrid(document.getElementsByName("range")[0].value);

});

