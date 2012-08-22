var LeaderBoard = require("./leaderboard")
    , network = require("./network")
    , boardDoc = require("./document")
    , LiveReloadClient = require("live-reload")
    , body = document.body

var leaderBoard = LeaderBoard(boardDoc)
leaderBoard.appendTo(body)

boardDoc.sync()

LiveReloadClient(8081)