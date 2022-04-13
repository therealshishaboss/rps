const readline = require('readline')


const readData = (question) => {

    return new Promise((response) => {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, (a) => {

            rl.close()
            response(a)
        })
    })
}

module.exports = readData;