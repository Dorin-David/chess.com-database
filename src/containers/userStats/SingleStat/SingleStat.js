import { useState } from 'react';
import { IoIosArrowUp as OpenArrow } from 'react-icons/io';
import { IoIosArrowDown as CloseArrow } from 'react-icons/io';
import { BsClockFill as Rapid } from 'react-icons/bs';
import { BsLightningFill as Blitz } from 'react-icons/bs';
import { GiSupersonicBullet as Bullet } from 'react-icons/gi';
import { FaCalendarDay as Daily} from 'react-icons/fa';
import style from './stats.module.css'


const icons = {
    chess_rapid: <Rapid style={{color: '#6c9d41'}}/>,
    chess_blitz: <Blitz style={{color: '#f7c045'}}/>,
    chess_bullet: <Bullet style={{color: '#f1ab22'}}/>,
    chess_daily: <Daily style={{color: '#db7e3b'}}/>
}

function SingleStat(props) {
    const [openInfo, setOpenInfo] = useState(false);

    function toggleInfo() {
        setOpenInfo(curr => !curr)
    }

    let stats = (<div className={style.stats}>
        <p>Highest <span className={style.green}>{props.highest}</span></p>
        <p>Games <span>{props.wonGames + props.lostGames + props.drewGames}</span></p>
        <p>Won <span className={style.green}>{props.wonGames}</span></p>
        <p>Lost <span className={style.red}>{props.lostGames}</span></p>
        <p>Drew <span>{props.drewGames}</span></p>
    </div>)

    return (<div className={style.wrapper}>
        <div className={style['main-info']}>
            {icons[props.icon]}
            <p>{props.game}</p>
            <p>{props.rating}</p>
            {openInfo ?  <OpenArrow onClick={toggleInfo} /> : <CloseArrow onClick={toggleInfo} />}
        </div>
            {openInfo && props.rating ? stats : openInfo && !props.rating ? <p>No games played</p> : null}
    </div>)

}

export default SingleStat