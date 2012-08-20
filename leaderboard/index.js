var yarn = require("./yarn")
    , Player = require("../player")

module.exports = LeaderBoard

function LeaderBoard(doc) {
    var elem = yarn("leaderboard.html", ["leaderboard.css"])
        , leaderBoardElem = elem.querySelector(".leaderboard")
        , set = doc.createSet("type", "player")
        , oldSelected = set.get()

    set.on("add", addPlayer)

    return {
        appendTo: appendTo
    }

    function addPlayer(obj) {
        var player = Player(obj)
        player.appendTo(leaderBoardElem)
    }

    function appendTo(parent) {
        parent.appendChild(elem)
    }
}