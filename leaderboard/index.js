var html = require("./leaderboard")
    , Fragment = require("fragment")
    , Player = require("../player")
    , store = require("local-store")
    , selected = store("selected-player")
    , EventEmitter = require("events").EventEmitter
    , selectron = require("selectron")
    , sorta = require("sorta")
    , uuid = require("node-uuid")

module.exports = LeaderBoard

function LeaderBoard(doc) {
    var elem = Fragment(html)
        , leaderBoardElem = elem.querySelector(".leaderboard")
        , playerSet = doc.createSet("type", "player")
        , oldSelected = selected.get("player")
        , sel = selectron()
        , sorted = sortable()

    playerSet.forEach(addPlayer)

    playerSet.on("add", addPlayer)

    sel.on("select", function (player) {
        oldSelected = null
        selected.set("player", player.id)
    })

    sortable.appendTo(elem)

    return {
        appendTo: appendTo
    }

    function addPlayer(obj) {
        var player = Player(obj, sorted())

        player.on("selected", sel.select)

        if (oldSelected === player.id) {
            sel.select(player)
        }
    }

    function appendTo(parent) {
        parent.appendChild(elem)
    }
}

function sortable() {
    var sort = sorta({
        compare: function (a, b) {
            return a.value < b.value ? 1 : -1
        }
    }, function (row) {
        var key = row.key
            , value = row.value
            , emitter = value.emitter

        emitter.on("value", function (v) {
            value.value = v
            row.update(value)
        })

        emitter.on("destroy", function () {
            row.update(undefined)
        })

        return value.element
    })

    Place.appendTo = sort.appendTo

    return Place

    function Place() {
        var value
            , elem
            , emitter = new EventEmitter()

        return {
            update: function (v) {
                value = v
                emitter.emit("value", v)
            }
            , append: function (e) {
                elem = e
                write()
            }
            , destroy: function () {
                emitter.emit("destroy")
            }
        }

        function write() {
            sort.write(uuid(), {
                element: elem
                , value: value
                , emitter: emitter
            })
        }
    }
}