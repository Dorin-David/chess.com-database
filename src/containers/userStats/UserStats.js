import { useState, useEffect } from 'react';
import { FaChessBoard as ChessBoard} from 'react-icons/fa'
import Spinner from '../../components/UI/Spinner/Spinner';
import SingleStat from './SingleStat/SingleStat';
import capitalizeWord from '../../utils/capitalizeWord';
import calculateTotalGames from '../../utils/calculateTotalGames';
import style from './user-stats.module.css';


function UserStats(props) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [gamesStats, setGamesStats] = useState({})

    useEffect(() => {
        setLoading(true)
        async function fetchData(){
            const url = `https://api.chess.com/pub/player/${props.user}/stats`;
            try {
                const req = await fetch(url);
                const data = await req.json();
                const stats = {
                    chess_rapid: {
                        rating: data.chess_rapid?.last?.rating,
                        best: data.chess_rapid?.best?.rating || '-',
                        win: data.chess_rapid?.record?.win,
                        loss: data.chess_rapid?.record?.loss,
                        draw: data.chess_rapid?.record?.draw
                     }, 
                     chess_blitz: {
                        rating: data.chess_blitz?.last?.rating,
                        best: data.chess_blitz?.best?.rating || '-',
                        win: data.chess_blitz?.record?.win,
                        loss: data.chess_blitz?.record?.loss,
                        draw: data.chess_blitz?.record?.draw
                     }, 
                 
                     chess_bullet: {
                        rating: data.chess_bullet?.last?.rating,
                        best: data.chess_bullet?.best?.rating || '-',
                        win: data.chess_bullet?.record?.win,
                        loss: data.chess_bullet?.record?.loss,
                        draw: data.chess_bullet?.record?.draw
                     },
                     chess_daily: {
                        rating: data.chess_daily?.last?.rating,
                        best: data.chess_daily?.best?.rating || '-',
                        win: data.chess_daily?.record?.win,
                        loss: data.chess_daily?.record?.loss,
                        draw: data.chess_daily?.record?.draw
                    }
                    
                    };
                
                setGamesStats(stats)
                setLoading(false)
                setError(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
                setError(err.message)
            }

        }
        fetchData()

    }, [props.user]);

    let displayStats = <Spinner />;
    if(!loading){
        displayStats = (<div className={style['stats-wrapper']}>
            <h2>Stats</h2>
            <p> <ChessBoard/> Games <span>{calculateTotalGames(gamesStats)}</span></p>
             {Object.keys(gamesStats).map(stat => <SingleStat 
                  key={stat}
                  icon={stat}
                  game={capitalizeWord(stat.replace(/\w+_(\w+)/, "$1"))}
                  rating={gamesStats[stat].rating}
                  highest={gamesStats[stat].best}
                  wonGames={gamesStats[stat].win}
                  lostGames={gamesStats[stat].loss}
                  drewGames={gamesStats[stat].draw}
             />)}
        </div>)
    }

    return !error ? displayStats : <h1>Something went wrong</h1>
}

export default UserStats