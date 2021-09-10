import timestampParser from "./timestampParser"
/*
{
  "url": "https://www.chess.com/game/live/692667823",
  "pgn": "[Event \"Live Chess\"]\n[Site \"Chess.com\"]\n[Date \"2014.01.06\"]\n[Round \"-\"]\n[White \"Hikaru\"]\n[Black \"Godswill\"]\n[Result \"1-0\"]\n[CurrentPosition \"6k1/1p2R3/p1p5/8/2P1B3/1P1P1p1P/P6K/8 b - -\"]\n[Timezone \"UTC\"]\n[ECO \"C25\"]\n[ECOUrl \"https://www.chess.com/openings/Vienna-Game-Max-Lange-Paulsen-Variation\"]\n[UTCDate \"2014.01.06\"]\n[UTCTime \"23:50:17\"]\n[WhiteElo \"2354\"]\n[BlackElo \"2167\"]\n[TimeControl \"180\"]\n[Termination \"Hikaru won by resignation\"]\n[StartTime \"23:50:17\"]\n[EndDate \"2014.01.06\"]\n[EndTime \"23:54:39\"]\n[Link \"https://www.chess.com/game/live/692667823\"]\n\n1. e4 {[%clk 0:03:00]} 1... e5 {[%clk 0:03:00]} 2. Nc3 {[%clk 0:02:57.6]} 2... Nc6 {[%clk 0:02:57.2]} 3. g3 {[%clk 0:02:42.4]} 3... g6 {[%clk 0:02:52.5]} 4. Bg2 {[%clk 0:02:40.8]} 4... Bg7 {[%clk 0:02:51.8]} 5. Nge2 {[%clk 0:02:38.3]} 5... Nge7 {[%clk 0:02:50.8]} 6. O-O {[%clk 0:02:37.6]} 6... O-O {[%clk 0:02:49.7]} 7. d3 {[%clk 0:02:37.1]} 7... d6 {[%clk 0:02:48.7]} 8. h3 {[%clk 0:02:36.6]} 8... h6 {[%clk 0:02:46.9]} 9. Be3 {[%clk 0:02:35.5]} 9... Be6 {[%clk 0:02:45.5]} 10. Qd2 {[%clk 0:02:35]} 10... Qd7 {[%clk 0:02:44]} 11. Kh2 {[%clk 0:02:33]} 11... Kh7 {[%clk 0:02:42.5]} 12. Nd5 {[%clk 0:02:32.2]} 12... Nd4 {[%clk 0:02:37.4]} 13. Nxe7 {[%clk 0:02:21.8]} 13... Qxe7 {[%clk 0:02:33]} 14. c3 {[%clk 0:02:21.1]} 14... Nxe2 {[%clk 0:02:31.7]} 15. Qxe2 {[%clk 0:02:20.3]} 15... c6 {[%clk 0:02:30.5]} 16. f4 {[%clk 0:02:18.9]} 16... f5 {[%clk 0:02:28.8]} 17. Rae1 {[%clk 0:02:16.3]} 17... a6 {[%clk 0:02:18.1]} 18. fxe5 {[%clk 0:02:13.1]} 18... dxe5 {[%clk 0:02:16.6]} 19. exf5 {[%clk 0:02:11.8]} 19... Bxf5 {[%clk 0:02:15.8]} 20. g4 {[%clk 0:02:11.2]} 20... Be6 {[%clk 0:02:14.8]} 21. c4 {[%clk 0:02:10.7]} 21... Rad8 {[%clk 0:02:12.4]} 22. Be4 {[%clk 0:02:09.6]} 22... Bf7 {[%clk 0:02:04.3]} 23. b3 {[%clk 0:02:07.4]} 23... Qh4 {[%clk 0:01:38.8]} 24. Bf2 {[%clk 0:02:04.8]} 24... Qg5 {[%clk 0:01:37]} 25. Bc5 {[%clk 0:02:03.6]} 25... Be6 {[%clk 0:01:22.7]} 26. Bxf8 {[%clk 0:01:47.4]} 26... Rxf8 {[%clk 0:01:20.9]} 27. Rxf8 {[%clk 0:01:45.1]} 27... Bxf8 {[%clk 0:01:20.1]} 28. Qf2 {[%clk 0:01:44.4]} 28... Be7 {[%clk 0:01:09.6]} 29. Rf1 {[%clk 0:01:42]} 29... h5 {[%clk 0:01:05.2]} 30. gxh5 {[%clk 0:01:40.1]} 30... Qxh5 {[%clk 0:01:04.5]} 31. Qf3 {[%clk 0:01:39.3]} 31... Qg5 {[%clk 0:00:59.4]} 32. Rg1 {[%clk 0:01:34.1]} 32... Qf4+ {[%clk 0:00:48.6]} 33. Qxf4 {[%clk 0:01:29.8]} 33... exf4 {[%clk 0:00:47.8]} 34. Rxg6 {[%clk 0:01:29.4]} 34... f3 {[%clk 0:00:32.9]} 35. Rxe6+ {[%clk 0:01:27.2]} 35... Kg8 {[%clk 0:00:32]} 36. Rxe7 {[%clk 0:01:26.3]} 1-0\n",
  "time_control": "180",
  "end_time": 1389052479,
  "rated": true,
  "accuracies": {
    "white": 96.47,
    "black": 83.84
  },
  "fen": "6k1/1p2R3/p1p5/8/2P1B3/1P1P1p1P/P6K/8 b - -",
  "time_class": "blitz",
  "rules": "chess",
  "white": {
    "rating": 2354,
    "result": "win",
    "@id": "https://api.chess.com/pub/player/hikaru",
    "username": "Hikaru"
  },
  "black": {
    "rating": 2167,
    "result": "resigned",
    "@id": "https://api.chess.com/pub/player/godswill",
    "username": "Godswill"
  }
}
*/

export default function gamesParser(games){
    return games.filter(game => game.rules === 'chess').map(game => {
        const data = {
            link: game.url,
            date: timestampParser(game.end_time),
            accuracies: (game.accuracies || null),
            gameType: game.time_class,
            white: game.white,
            black: game.black
        }
        return data
    })
}