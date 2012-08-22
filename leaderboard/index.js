var html = require("./leaderboard")
    , Fragment = require("fragment")
    , Player = require("../player")
    , store = require("local-store")
    , selected = store("selected-player")

module.exports = LeaderBoard

function LeaderBoard(doc) {
    var elem = Fragment(html)
        , leaderBoardElem = elem.querySelector(".leaderboard")
        , playerSet = doc.createSet("type", "player")
        , oldSelected = selected.get("player")

    playerSet.forEach(addPlayer)

    playerSet.on("add", addPlayer)

    return {
        appendTo: appendTo
    }

    function addPlayer(obj) {
        var player = Player(obj)
        player.appendTo(leaderBoardElem)
        player.on("selected", updateSelected)

        if (obj.id === oldSelected) {
            oldSelected = player
            updateSelected(player)
        }
    }

    function updateSelected(player) {
        if (oldSelected && oldSelected.unselect) {
            oldSelected.unselect()
        }

        oldSelected = player
        player.select()

        selected.set("player", player.id)
    }

    function appendTo(parent) {
        parent.appendChild(elem)
    }
}