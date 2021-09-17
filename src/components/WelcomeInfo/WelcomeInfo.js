import style from './welcome-info.module.css';

function WelcomeInfo() {
    return (<div className={style["welcome-info"]}>
        <h1>Chess.com database</h1>
        <p>Welcome to the chess.com's user database. This app was heavily inspired by the layout you can found
            at <a href="https://www.chess.com/home" target="_blank" rel="noreferrer">their website</a>, when you check
            the stats and the games of your profile. Hope you're a chess player and that you will enjoy it!
        </p>
    </div>)
}

export default WelcomeInfo