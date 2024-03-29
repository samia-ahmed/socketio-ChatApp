const app = require('express')();
const http = require('http').Server(app);
const port = process.env.PORT || 5000;
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

io.on("connection", function(socket){
    socket.on("user_join", function(data){
        console.log('now a user joined');
        
        this.username = data;
        socket.broadcast.emit('user_join', data);
    });

    socket.on("chat_message", function(data){
        data.username = this.username;
        socket.broadcast.emit('chat_message', data);
    });

    socket.on("disconnect", function(data) {
        socket.broadcast.emit("user_leave", this.username);
    })
})





http.listen(port, function(){
    console.log('listening on port', port);
})