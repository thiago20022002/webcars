/**
 * Created by Goncalves 2/13/16
 */
var session_id = "";
$(document).ready(function () {
    var socket = io.connect('http://localhost:80/websocket');
    
    socket.on("open", function (msg) {
        session_id = msg;
    });
    
    socker.on('messages', function (msg) {
        console.log(msg);
    });
});
