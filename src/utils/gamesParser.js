import timestampParser from "./timestampParser";
export default function gamesParser(games){
    return games.filter(game => game.rules === 'chess').map(game => {
        const data = {
            link: game.url,
            date: timestampParser(game.end_time),
            timestamp: game.end_time,
            accuracies: (game.accuracies || null),
            gameType: game.time_class,
            white: game.white,
            black: game.black
        }
        return data
    })
}