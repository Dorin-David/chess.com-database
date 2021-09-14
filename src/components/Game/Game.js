import { BsClockFill as Rapid } from 'react-icons/bs';
import { BsLightningFill as Blitz } from 'react-icons/bs';
import { GiSupersonicBullet as Bullet } from 'react-icons/gi';
import { FaCalendarDay as Daily} from 'react-icons/fa';
import { FaPlusSquare as Won} from 'react-icons/fa';
import { FaMinusSquare as Lost } from 'react-icons/fa';
import { BsSquareHalf as Draw } from 'react-icons/bs';
import LinkIcon from '../UI/LinkIcon/LinkIcon';
import style from './game.module.css';

const icons = {
    rapid: <Rapid style={{color: '#6c9d41'}}/>,
    blitz: <Blitz style={{color: '#f7c045'}}/>,
    bullet: <Bullet style={{color: '#f1ab22'}}/>,
    daily: <Daily style={{color: '#db7e3b'}}/>
}

function Game(props){
    const userColor = props.white.username === props.username ? 'white' : 'black';
    const hasUserWon = props[userColor].result === 'win';
    let accuracies = <div className={style.accuracy}>-</div>;
    if(props.accuracies){
        accuracies = (<div className={style.accuracy}>
            <p>{props.accuracies.white}</p>
            <p>{props.accuracies.black}</p>
            </div>)
    }

    return (<div className={style.wrapper}>
        {icons[props.gameType]}
        <div className={style.players}>
            <p><span className={[style.userColor, style.white].join(' ')}></span> {props.white.username} ({props.white.rating})</p>
            <p><span className={[style.userColor, style.black].join(' ')}></span>{props.black.username} ({props.black.rating})</p>
        </div>
        {(props.white.result === 'agreed' 
          || props.white.result === 'repetition'
          || props.white.result === 'stalemate'
          || props.white.result === '50move'
          || props.white.result === 'timevsinsufficient') ? <Draw className={style.draw}/> : hasUserWon ? <Won className={style.won}/> : <Lost className={style.lost}/>}
        {accuracies}
        <p className={style.date}>{props.date}</p>
        <LinkIcon link={props.link}/>

    </div>)

}

export default Game