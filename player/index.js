var html = require("./player")
    , Fragment = require("fragment")
    , EventEmitter = require("events").EventEmitter
    , databind = require("data-bind")
    , inherits = require("util").inherits

module.exports = Player

function Player(row, place) {
    var elem = Fragment(html).firstChild
        , widget = new Widget(row.id, elem)

    databind(elem, row)

    row.on("changes", updateValue)

    elem.addEventListener("click", emitSelected)

    place(elem, row.get("score"))

    return widget

    function emitSelected() {
        widget.emit("selected", widget)
    }

    function updateValue(_, changed) {
        if (changed.score) {
            place.update(changed.score)
        }
    }
}

function Widget(id, elem) {
    this.id = id
    this._elem = elem
}
inherits(Widget, EventEmitter)

Widget.prototype.appendTo = appendTo
Widget.prototype.select = select
Widget.prototype.unselect = unselect

function select() {
    this._elem.classList.add("selected")
}

function unselect() {
    this._elem.classList.remove("selected")
}

function appendTo(parent) {
    parent.appendChild(this._elem)
}