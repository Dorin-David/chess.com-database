import { MdLocationOn } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { FaChessPawn } from 'react-icons/fa';
import { HiStatusOnline } from 'react-icons/hi';
import CountryFlag from '../UI/CountryFlag';
import LinkIcon from '../UI/LinkIcon/LinkIcon';
import style from './user-card.module.css';

function UserCard(props) {
    return (<div className={style.wrapper}>
        <img src={props.avatar} alt={props.username} />
        <div className={style['username-wrapper']}>
            <div className={style['username-info']}>
                <div>
                    <h1>{props.username}</h1>
                    <LinkIcon link={props.link} />
                </div>
                <CountryFlag isoCode={props.country} />
            </div>
            <div className={style['name-location-followers']}>
                {props.name ? <p>{props.name}</p> : null}
                {props.location ? <p>{<MdLocationOn />} {props.location}</p> : null}
                <p><FiUsers title="followers" /> {props.followers}</p>
            </div>
            <p><FaChessPawn title="joined" /> {props.joined}</p>
            <p><HiStatusOnline title="last online" /> {props.lastOnline}</p>
        </div>
    </div>)
}

export default UserCard