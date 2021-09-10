export default function calculateTotalGames(data){
    return Object.values(data).reduce((acc, game) => acc + ((game.win + game.loss + game.draw) || 0), 0)

}