var yarn = require("./yarn")

module.exports = Player

function Player(row) {
    var elem = yarn("player.html", ["player.css"])
        , playerElem = elem.querySelector(".player")
        , nameElem = elem.querySelector(".name")
        , scoreElem = elem.querySelector(".score")

    row.on("update", render)

    playerElem.addEventListener("click", incrementScore)

    render()

    return {
        appendTo: appendTo
    }

    function render() {
        nameElem.textContent = row.get("name")
        scoreElem.textContent = row.get("score")
    }

    function incrementScore() {
        var score = row.get("score")
        score++
        row.set("score", score)
    }

    function appendTo(parent) {
        parent.appendChild(elem)
    }
}