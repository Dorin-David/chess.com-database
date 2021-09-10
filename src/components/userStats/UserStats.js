
import { FaChessBoard as ChessBoard } from 'react-icons/fa'
import SingleStat from './SingleStat/SingleStat';
import capitalizeWord from '../../utils/capitalizeWord';
import calculateTotalGames from '../../utils/calculateTotalGames';
import style from './user-stats.module.css';


function UserStats(props) {
    return (<div className={style['stats-wrapper']}>
        <h2>Stats</h2>
        <p> <ChessBoard /> Games <span>{calculateTotalGames(props.gamesStats)}</span></p>
        {Object.keys(props.gamesStats).map(stat => <SingleStat
            key={stat}
            icon={stat}
            game={capitalizeWord(stat.replace(/\w+_(\w+)/, "$1"))}
            rating={props.gamesStats[stat].rating}
            highest={props.gamesStats[stat].best}
            wonGames={props.gamesStats[stat].win}
            lostGames={props.gamesStats[stat].loss}
            drewGames={props.gamesStats[stat].draw}
        />)}
    </div>)

}

export default UserStats