var discoveryNetwork = require("discovery-network")
    , Connection = discoveryNetwork.Connection
    , RelayStreams = discoveryNetwork.RelayStreams

var conn = Connection("http://discoverynetwork.co/service")
    , boardDoc = require("./document")
    
RelayStreams(conn, "raynos/dn-leaderboard/board", handleStream)

function handleStream(remotePeerId, stream) {
    var docStream = boardDoc.createStream()
    stream.pipe(docStream).pipe(stream)
}