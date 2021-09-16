import { useState, useEffect } from 'react';
import gamesParser from '../../utils/gamesParser';
import Game from '../../components/Game/Game';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { getMonth } from '../../utils/getMonth';
import { getYear } from '../../utils/getYear';
import { filterGames } from '../../utils/filterGames';
import style from './user-games.module.css';


function UserGames(props) {
    const [counter, setCounter] = useState(null);
    const [userGamesArchive, setuserGamesArchive] = useState([]);

    const [games, setGames] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(25);

    useEffect(() => {
        setLoading(true);
        setError(false);
        async function getPlayerGames() {
            try {
                const url = `https://api.chess.com/pub/player/${props.user}/games/archives`;
                const req = await fetch(url);
                let monthsGamesArchive = await req.json();
                
                if(props.filterRules.startDate || props.filterRules.endDate){
                    monthsGamesArchive = {archives: monthsGamesArchive.archives.filter(archive => {
                        //start date logic            
                        const [archiveYear, archiveMonth] = archive.match(/[0-9]+\/[0-9]+$/)[0].split('/');
                        const startYear = getYear(props.filterRules.startDate);
                        const startMonth = getMonth(props.filterRules.startDate) + 1;                       
                        //we have an end
                        if(props.filterRules.endDate){
                            const endYear = getYear(props.filterRules.endDate);
                            const endMonth = getMonth(props.filterRules.endDate) + 1;
                            //we have both start and end
                            if(props.filterRules.startDate && props.filterRules.endDate) return archiveYear >= startYear && archiveYear <= endYear && archiveMonth >= startMonth && archiveMonth <= endMonth
                            return archiveYear <= endYear && archiveMonth <= endMonth
                        } else return archiveYear >= startYear && archiveMonth >= startMonth
                    })}

                }
                setuserGamesArchive(monthsGamesArchive.archives)
                setCounter(monthsGamesArchive.archives.length - 1)
                setLoading(false)
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        }
        getPlayerGames()
    }, [props.user, props.filterRules])
    useEffect(() => {
        setLoading(true);
        setError(false)
        async function parsePlayerGames() {
            try {
                let parsedGames = [...games];
                let j = counter;
                if(props.filterRules.startDate || props.filterRules.endDate) parsedGames = []; 
                while (j >= 0 && parsedGames.length < (offset * 8)) {
                    if(j === null) return setLoading(false)
                    const specificMonthGamesUrl = userGamesArchive[j];
                    const req = await fetch(specificMonthGamesUrl);
                    const data = await req.json();
                    let fetchedGames = [...data.games];

                    fetchedGames = filterGames(fetchedGames, props.filterRules)
                    parsedGames.push(...fetchedGames);
                    j--
                }

                if (j !== counter) {
                    setGames(parsedGames);
                    setCounter(j);
                }
                setLoading(false)         
            } catch (err) {
                setError(err.message);
                setLoading(false)
            }
        }
        parsePlayerGames()

    }, [games, counter, userGamesArchive, offset, props.filterRules])

    function increaseOffset() {
        setOffset(offset => offset + 25)
    }
    
    let info = <Spinner ></Spinner>;

    if(!loading){
        info = (<> <h1>Games</h1>
            {gamesParser(games.slice(0, offset)).map(game => {
                return <Game
                 key={game.timestamp}
                 username={props.user}
                 gameType={game.gameType}
                 white={game.white}
                 black={game.black}
                 accuracies={game.accuracies}
                 date={game.date}  
                 link={game.link} 
                />
            })}
            <Button onButtonClick={increaseOffset}>Show more</Button>
            </>
        )
    }

    return (<div className={style['games-wrapper']}>{error ? <h1>Something went wrong</h1> : info }</div>)


}

export default UserGames