/**
 * Created by emilio.cerezo on 2/16/17.
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){

    console.log('A user connected');

    io.emit('chat message', "A user connected");

    socket.on('disconnect', function(){

        io.emit('chat message', "A user disconnected");

    });

    socket.on('chat', function(msg){

        io.emit('ajaxChat', {
            "msg"       :   msg['msg'],
            "user_id"   :   msg['user_id']
        });

        console.log(msg);
    });

    socket.on('onlineUsers', function(msg){

        io.emit('onlineUsersAjax', {
            "userId"       :   msg['user']
        });

        console.log('Get online users');
    });

    socket.on('refreshChat', function(){

        io.emit('refreshOnlineUsersAjax');

        console.log('refreshed');
    });

});

http.listen(3000, function(){

    console.log('listening on *:3000');

});