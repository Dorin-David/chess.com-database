import { useState, useEffect } from 'react';

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
    console.log(games.slice(0, offset))
    return <h1>Test</h1>


}

export default UserGames