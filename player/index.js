var html = require("./player")
    , Fragment = require("fragment")
    , EventEmitter = require("events").EventEmitter
    , databind = require("data-bind")

module.exports = Player

function Player(row) {
    var elem = Fragment(html).firstChild
        , widget = new EventEmitter()

    widget.id = row.id
    widget.appendTo = appendTo
    widget.select = select
    widget.unselect = unselect

    databind(elem, row)

    elem.addEventListener("click", emitSelected)

    return widget

    function emitSelected() {
        widget.emit("selected", widget)
    }

    function select() {
        elem.classList.add("selected")
    }

    function unselect() {
        elem.classList.remove("selected")
    }

    function appendTo(parent) {
        parent.appendChild(elem)
    }
}