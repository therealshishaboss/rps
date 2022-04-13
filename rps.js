const gameAlgorithm = require('./gameAlgorithm')
const SecretKey = require('./SecretKey')
const authenticationChecks = require('./HMAC');
const readData = require('./readData');

const hmac = new authenticationChecks();
const game = new gameAlgorithm();
const secretK = new SecretKey();

game.getMoves();
game.createRules();

newGame();

function newGame() {

    console.log('New game!');

    game.createCompMove();
    game.secretKey = secretK.createSecretKey();

    hmac.createHMAC(game.secretKey, game.currentCompMove);
    console.log('HMAC: ', hmac.HMAC);

    game.showTable();
    interfaceTable();
}

async function interfaceTable() {

    const answer = await readData('Enter your move: ');

    if ((answer >= 0  && answer <= game.moves.length) || answer == '?' ) {

        switch (answer) {

            case '0':
                break;
            case '?':
                console.table(game.rules);
                interfaceTable();
                break;

            default:
                {
                    console.log('Your move: ', game.moves[answer - 1]);
                    console.log('Computer move: ', game.currentCompMove);
                    console.log('You', game.determineResult(game.moves[answer - 1], game.currentCompMove));
                    console.log('HMAC key: ', game.secretKey);

                    const exit = await readData('Do you want to play again? (y/n): ');

                    if (exit == 'y') {
                        newGame();
                    } else {
                        break;
                    }
                }
        }
    } else {

        console.log('The wrong command was entered! (Exapmle: 2 ). Please, try again.');
        interfaceTable();
    }
}