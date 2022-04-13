const error = require('./errors')

class Game {
    moves;
    rules;
    currentCompMove;
    secretKey;

    getMoves() {

        const moves = process.argv.slice(2);
        error(this.checkInputMoves(moves));
        this.moves = moves;

    }

    showTable() {

        console.log('Available moves: ');
        this.moves.forEach((element, index) => {
            console.log(`${index+1} - ${element}`);
        });
        console.log('0 - exit');
        console.log('? - help');
    }

    determineResult(yourMove, computerMove) {

        return this.rules[yourMove][computerMove];
    }

    createRules(moves = this.moves) {

        this.rules = moves.reduce((columns, yourMove, index, array) => {

            columns[yourMove] = array.reduce((rows, computerMove) => {

                let centredMoves = this.centerMove(array.slice(0), yourMove);
                let indexComputerMove = centredMoves.indexOf(computerMove);

                rows[computerMove] = 
                (computerMove == yourMove) ? 'draw' 
                : indexComputerMove < Math.floor(array.length / 2) ? 'lose' 
                : 'win';

                return rows;

            }, {});

            return columns;
        }, {});

    }

    checkInputMoves(moves) {

        let errors = [];

        let nonUnique = moves.some((move, index, arr) => {
            if (index != arr.length) return arr.includes(move, index + 1) 
        });

        if (nonUnique) errors.push(2);
        if (moves.length % 2 == 0) errors.push(1)
        if (moves.length < 3) errors.push(0);
        
        return errors.length == 0 ? false : errors;
    }

    centerMove(element, moveToCenter) {

        while (element.indexOf(moveToCenter) != Math.floor(element.length / 2)) {
            element.unshift(element.pop())
        }
        return element
    }

    createCompMove() {
        let i = Math.floor(Math.random() * this.moves.length);
        this.currentCompMove = this.moves[i];
    }
}

module.exports = Game