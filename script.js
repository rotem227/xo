var xo = {
    grid: 3,
    cell: document.getElementsByClassName("xo-cell"),
    symbol: (function() {
        var symbols = ["X", "O"],
            randomBinary = Math.floor(Math.random() * 2),
            chosenSymbol = symbols[randomBinary];
        
        function replaceSymbol() {
            return ( chosenSymbol == symbols[0] ) ? symbols[1] : symbols[0];
        }
        
        console.log("FIRST SYMBOL: " + replaceSymbol());       
       
        return function() {
            chosenSymbol = replaceSymbol();
            return chosenSymbol;
        };
    }()),
    setSymbol: function(clickedElement, index) {
        if ( clickedElement.innerHTML == "" ) {
            console.log("index: " + index);
            clickedElement.innerHTML = this.symbol();
        }
    },
    addCellClickEvent: function(index) {
        var THIS = this;
        
        console.log("index: " + index);
        this.cell[index].addEventListener("click", function() {
            THIS.setSymbol(this, index);
        });
    },
    func: function(index) {
        console.log(index);
    },
    init: function() {
        var i = 0,
            THIS = this;

        for ( i = 0 ; i < xo.cell.length ; i++ ) {
            //this.addCellClickEvent(i); 

            var f = function() {
                console.log();
                //THIS.func(i);
            };
            

            this.cell[i].addEventListener("click", f);
        }
    }
};

document.addEventListener("DOMContentLoaded", function() {

    xo.init();

});

