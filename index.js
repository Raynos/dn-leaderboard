var LeaderBoard = require("./leaderboard")
    , network = require("./network")
    , boardDoc = require("./document")
    , body = document.body

var leaderBoard = LeaderBoard(boardDoc)
leaderBoard.appendTo(body)