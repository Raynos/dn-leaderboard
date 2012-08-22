var crdt = require("crdt")
    , Doc = crdt.Doc
    , kv = require("kv")

var boardDoc = new Doc()
    , keyValueStore = kv("dn-leaderboard")

window.doc = boardDoc

module.exports = boardDoc
module.exports.sync = sync

function sync() {
    var name = "board"

    keyValueStore.has(name, function (err) {
        if (err) {
            boardDoc.sync = true
            return write()
        }

        var stream = keyValueStore.get(name)
        stream.pipe(boardDoc.createWriteStream())
        stream.once("end", write)
    })

    function write() {
        var readStream = boardDoc.createReadStream({ end: false })

        readStream.pipe(keyValueStore.put(name))
    }
}