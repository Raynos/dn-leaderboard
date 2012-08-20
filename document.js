var crdt = require("crdt")
    , Doc = crdt.Doc
    , kv = require("kv")

var boardDoc = new Doc()
    , keyValueStore = kv("dn-leaderboard")

sync(boardDoc, 'board')

window.doc = boardDoc

module.exports = boardDoc

function sync(doc, name) {
    keyValueStore.has(name, function (err) {
        if (err) {
            doc.sync = true
            return write()
        }

        var stream = keyValueStore.get(name)
        stream.pipe(doc.createWriteStream())
        stream.once("end", write)
    })

    function write() {
        var readStream = doc.createReadStream({ end: false })

        readStream.pipe(keyValueStore.put(name))
    }
}