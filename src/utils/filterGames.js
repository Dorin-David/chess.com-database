function filterGames(games, rules) {

    if (Object.values(rules).some(rule => rule)){
        return games.filter(game => {
            let passesTest = true;

            if (rules.color) passesTest = game[rules.color].username.toLowerCase() === rules.user;
            if(rules.startDate){
                let gameComesAfter = new Date(game.end_time * 1000).getDate() >= new Date(rules.startDate).getDate();
                passesTest = passesTest && gameComesAfter
            }
            if(rules.endDate) {
                let gameComesBefore = (new Date(game.end_time * 1000).getDate() <= new Date(rules.endDate).getDate());
                passesTest = passesTest && gameComesBefore
            }
            if (rules.result) {
                let gameResult;
             
                    const userColor = game.white.username.toLowerCase() === rules.user ? 'white' : 'black';
                    switch (game[userColor].result) {
                        case 'win':
                            gameResult = 'win';
                            break;
                        case 'agreed':
                        case 'repetition':
                        case 'stalemate':
                        case 'insufficient':
                        case '50move':
                        case 'timevsinsufficient':
                            gameResult = 'draw';
                            break;
                        default:
                            gameResult = 'lose'
                    }
                   passesTest = passesTest && (gameResult === rules.result)
            }

            return passesTest
        })

    }
    return games

}

export { filterGames }