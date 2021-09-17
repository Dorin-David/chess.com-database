import { useState, useEffect } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import timestampParser from '../../utils/timestampParser';
import UserStats from '../../components/userStats/UserStats';
import UserCard from '../../components/userCard/userCard';
import UserGames from '../userGames/userGames';
import FilterGames from '../filterGames/filterGames';
import style from './user-data.module.css';

/*
{
  "startDate": "2021-09-13T22:00:00.000Z",
  "endDate": "2021-09-22T22:00:00.000Z",
  "result": "won",
  "color": "white",
  "order": "oldest"
}
*/

function UserData(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [gamesStats, setGamesStats] = useState({})
    const [user, setUser] = useState({});
    const [filterRules, setFilterRules] = useState({})

    useEffect(() => {
        setLoading(true)
        setError(false);
        setFilterRules({})

        async function fetchUserData() {
            const userUrl = `https://api.chess.com/pub/player/${props.user}`;
            try {
                //general user data
                const user_req = await fetch(userUrl);
                const data = await user_req.json();

                const userData = {
                    avatar: data.avatar,
                    username: data.url.match(/[\w]+$/)[0],
                    name: data.name,
                    link: data.url,
                    country: (data.country.slice(-2).toLowerCase() || null),
                    location: data.location,
                    joined: timestampParser(data.joined),
                    lastOnline: timestampParser(data.last_online),
                    followers: data.followers

                }
                setUser(userData)

                //user's stats

                const statsUrl = `https://api.chess.com/pub/player/${props.user}/stats`;
                const stats_req = await fetch(statsUrl);
                const statsData = await stats_req.json();
                const stats = {
                    chess_rapid: {
                        rating: statsData.chess_rapid?.last?.rating,
                        best: statsData.chess_rapid?.best?.rating || '-',
                        win: statsData.chess_rapid?.record?.win,
                        loss: statsData.chess_rapid?.record?.loss,
                        draw: statsData.chess_rapid?.record?.draw
                    },
                    chess_blitz: {
                        rating: statsData.chess_blitz?.last?.rating,
                        best: statsData.chess_blitz?.best?.rating || '-',
                        win: statsData.chess_blitz?.record?.win,
                        loss: statsData.chess_blitz?.record?.loss,
                        draw: statsData.chess_blitz?.record?.draw
                    },

                    chess_bullet: {
                        rating: statsData.chess_bullet?.last?.rating,
                        best: statsData.chess_bullet?.best?.rating || '-',
                        win: statsData.chess_bullet?.record?.win,
                        loss: statsData.chess_bullet?.record?.loss,
                        draw: statsData.chess_bullet?.record?.draw
                    },
                    chess_daily: {
                        rating: statsData.chess_daily?.last?.rating,
                        best: statsData.chess_daily?.best?.rating || '-',
                        win: statsData.chess_daily?.record?.win,
                        loss: statsData.chess_daily?.record?.loss,
                        draw: statsData.chess_daily?.record?.draw
                    }

                };

                setGamesStats(stats)
                setLoading(false)
                setError(false)

            } catch (err) {
                setLoading(false)
                setError(err.message)
            }

        }

        fetchUserData()

    }, [props.user])

    function setFilteringRules(rules) {
        setFilterRules({ ...rules, user: props.user })
    }

    let userData = <Spinner />;
    if (!loading) {
        userData = (<><div className={style.wrapper}>
            <UserCard
                avatar={user.avatar}
                username={user.username}
                name={user.name}
                link={user.link}
                country={user.country}
                location={user.location}
                followers={user.followers}
                joined={user.joined}
                lastOnline={user.lastOnline}
            />
            <div className={style.interactive}>
            <UserStats gamesStats={gamesStats} />
            <FilterGames forwardRules={setFilteringRules} />
            </div>
            <UserGames user={props.user} filterRules={filterRules} />
            
        </div>
        </>)

    }

    return !error ? userData : <h1 className={style.error}>Something went wrong :(</h1>

}

export default UserData