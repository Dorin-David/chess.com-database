import { useState, useEffect } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { FaChessPawn } from 'react-icons/fa';
import { HiStatusOnline } from 'react-icons/hi';
import CountryFlag from '../../components/UI/CountryFlag';
import Spinner from '../../components/UI/Spinner/Spinner';
import LinkIcon from '../../components/UI/LinkIcon/LinkIcon';
import parseTimeStamp from '../../utils/timestampParser';
import style from './user-card.module.css';

function UserCard(props) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const url = `https://api.chess.com/pub/player/${props.user}`;

            try {
                const req = await fetch(url);
                const data = await req.json();

                const userData = {
                    avatar: data.avatar,
                    username: data.url.match(/[\w]+$/)[0],
                    name: data.name,
                    link: data.url,
                    country: (data.country.slice(-2).toLowerCase() || null),
                    location: data.location,
                    joined: parseTimeStamp(data.joined),
                    lastOnline: parseTimeStamp(data.last_online),
                    followers: data.followers

                }
                setUser(userData)
                setLoading(false)
                setError(false)

            } catch (err) {
                setLoading(false)
                setError(err.message)
            }
        }
        fetchData()

    }, [props.user])


    let userInfo = <Spinner></Spinner>;

    if (!loading) {
        userInfo = (<div className={style.wrapper}>
            <img src={user.avatar} alt={user.username} />
            <div className={style['username-wrapper']}>
                <div className={style['username-info']}>
                    <div>
                    <h1>{user.username}</h1>
                    <LinkIcon link={user.link} />
                    </div>
                    <CountryFlag isoCode={user.country} />
                </div>
                <div className={style['name-location-followers']}>
                {user.name ? <p>{user.name}</p> : null}
                {user.location ? <p>{<MdLocationOn />} {user.location}</p> : null}
                <p><FiUsers title="followers"  /> {user.followers}</p>
                </div>
            <p><FaChessPawn title="joined"/> {user.joined}</p>
            <p><HiStatusOnline title="last online"/> {user.lastOnline}</p>
            </div>
        </div>)
    }

    return !error ? userInfo : <h1>Something went wrong</h1>
}

export default UserCard