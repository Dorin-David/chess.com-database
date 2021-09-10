import { useState, useEffect } from 'react';
import gamesParser from '../../utils/gamesParser';
import Game from '../../components/Game/Game';
import Button from '../../components/UI/Button/Button';

function UserGames(props) {
    const [counter, setCounter] = useState(0);
    const [userGamesArchive, setuserGamesArchive] = useState([]);

    const [games, setGames] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(25)

    useEffect(() => {
        setLoading(true);
        setError(false);
        async function getPlayerGames() {
            try {
                const url = `https://api.chess.com/pub/player/${props.user}/games/archives`;
                const req = await fetch(url);
                const monthsGamesArchive = await req.json();
                setuserGamesArchive(monthsGamesArchive.archives)
                setCounter(monthsGamesArchive.archives.length - 1)
                setLoading(false)
            } catch (err) {
                setLoading(false);
                setError(false);
            }
        }
        getPlayerGames()
    }, [props.user])

    useEffect(() => {
        setLoading(true)
        async function parsePlayerGames() {
            try {
                let parsedGames = [...games];
                let j = counter;
                while (parsedGames.length < offset) {
                    const specificMonthGamesUrl = userGamesArchive[j];
                    const req = await fetch(specificMonthGamesUrl);
                    const data = await req.json();
                    parsedGames = parsedGames.concat(parsedGames, data.games);
                    j--
                }
                if (j !== counter) {
                    setGames(parsedGames);
                    setCounter(j);
                    setLoading(false)
                }
            } catch (err) {
                setError(true);
                setLoading(false)
            }
        }
        parsePlayerGames()

    }, [games, counter, userGamesArchive, offset])

    function increaseOffset() {
        setOffset(offset => offset + 25)
    }

    return (<div>
        {gamesParser(games.slice(0, offset)).map(game => {
            return <Game
             username={props.user}
             gameType={game.gameType}
             white={game.white}
             black={game.black}
             accuracies={game.accuracies}
             date={game.date}   
            />
        })}
        <Button onButtonClick={increaseOffset}>Show more</Button>
    </div>)


}

export default UserGames