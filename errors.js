const errorsList = {
    '0': {
        name: 'Size error',
        description: "The number of moves should not be >= 3!",
        example: 'rock scissors paper'
    },

    '1': {
        name: 'Parity error',
        description: "The number of moves must be odd!",
        example: 'rock paper scissors lizard spock'
    },

    '2': {
        name: 'Uniqueness error',
        description: "The moves must be unique!",
        example: 'rock scissors paper'
    }
}


function errors(errorCodes) {

    if (errorCodes) {
        errorCodes.forEach(errCode => {

            const err = errorsList[errCode];
            
            console.log(`Error: ${err.name}
            Description: ${err.description}
            Correct example: ${err.example} `);
        });
        process.exit();
    }
}

module.exports = errors;