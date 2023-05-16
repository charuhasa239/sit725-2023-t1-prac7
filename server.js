var express = require('express');
var app = express();
require('./dbConnection');
let router = require('./route/route');

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);
let io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

var port = process.env.port || 3000;
app.listen(port, () => {
    console.log("App listening to: " + port)
})