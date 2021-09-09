/*
{
  "@id": "URL", // the location of this profile (always self-referencing)
  "url": "URL", // the chess.com user's profile page (the username is displayed with the original letter case)
  "username": "string", // the username of this player
  "player_id": 41, // the non-changing Chess.com ID of this player
  "title": "string", // (optional) abbreviation of chess title, if any
  "status": "string", // account status: closed, closed:fair_play_violations, basic, premium, mod, staff
  "name": "string", // (optional) the personal first and last name
  "avatar": "URL", // (optional) URL of a 200x200 image
  "location": "string", // (optional) the city or location
  "country": "URL", // API location of this player's country's profile
  "joined": 1178556600, // timestamp of registration on Chess.com
  "last_online": 1500661803, // timestamp of the most recent login
  "followers": 17 // the number of players tracking this player's activity
  "is_streamer": "boolean", //if the member is a Chess.com streamer
  "twitch_url": "Twitch.tv URL",
  "fide": "integer" // FIDE rating
}
 
 */

import { useState, useEffect } from 'react';
import CountryFlag from '../components/UI/CountryFlag';
import Spinner from '../components/UI/Spinner/Spinner';
import LinkIcon from '../components/UI/LinkIcon/LinkIcon';

function UserCard(props) {
    //what's the logic for retrieving data? should we have a useEffect or rely on the 
    // upper components which does not render the userCard unless a specific criteria is met
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            const url = `https://api.chess.com/pub/player/${props.user}`;
            try {
                const req = await fetch(url);
                const data = await req.json();
                console.log(data)

            function parseTimeStamp(stamp){
                const date = new Date(stamp * 1000);
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                return `${date.getDate()} ${months[date.getMonth()].toUpperCase()} ${date.getFullYear()}`
            }

                const userData = {
                    avatar: data.avatar,
                    username: data.username,
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

            } catch(err) {
               console.log(err)
               setLoading(false)
               setError(err.message)
            }
        }
        fetchData()
        
    }, [props.user])


    let userInfo = <Spinner></Spinner>;

    if(!loading){
        userInfo = (<div>
            <img src={user.avatar} alt={user.username} />
            <div>
                <h1>{user.username} ({user.name})</h1>
                <LinkIcon link={user.url}/>
                {/* <img src={`https://www.countryflags.io/${props.isoCode}/flat/48.png`} alt="flag" />  <- decide if it is worth sourcing*/}
                <CountryFlag isoCode={user.country} />
                <p>location: {user.location}</p>
            </div>
            <p>joined: {user.joined}</p>
            <p>last online: {user.lastOnline}</p>
            <p>followers: {user.followers}</p>
        </div>)
    }

    return !error ? userInfo : <h1>Something went wrong</h1>
}

export default UserCard