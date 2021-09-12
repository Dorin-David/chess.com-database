import { BsClockFill as Rapid } from 'react-icons/bs';
import { BsLightningFill as Blitz } from 'react-icons/bs';
import { GiSupersonicBullet as Bullet } from 'react-icons/gi';
import { FaCalendarDay as Daily} from 'react-icons/fa';
import { FaPlusSquare as Won} from 'react-icons/fa';
import { FaMinusSquare as Lost } from 'react-icons/fa';
import { BsSquareHalf as Draw } from 'react-icons/bs';

const icons = {
    rapid: <Rapid style={{color: '#6c9d41'}}/>,
    blitz: <Blitz style={{color: '#f7c045'}}/>,
    bullet: <Bullet style={{color: '#f1ab22'}}/>,
    daily: <Daily style={{color: '#db7e3b'}}/>
}

function Game(props){
    const userColor = props.white.username === props.username ? 'white' : 'black';
    const hasUserWon = props[userColor].result === 'win';
    let accuracies = '-';
    if(props.accuracies){
        accuracies = (<div>
            <p>{props.accuracies.white}</p>
            <p>{props.accuracies.white}</p>
            </div>)
    }

    return (<div>
        {icons[props.gameType]}
        <div>
            <p>{props.white.username}</p>
            <p>{props.black.username}</p>
        </div>
        {props.white.result === 'agreed' ? <Draw/> : hasUserWon ? <Won/> : <Lost/>}
        {accuracies}
        <p>{props.date}</p>

    </div>)

}

export default Game