const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require('cors');
const {exec} = require('child_process');

app.use(cors());

io.on('connection', (socket) => {

    socket.on('command', (msg) => {
        console.log(msg.cmd);
        try{
            exec(msg.cmd, (err, stdout, stderr)=>{
                console.log(stdout);
                if(stderr){
                    console.log(stderr);
                }
            });
        }
        catch(err){
            console.log("INTERNAL ERROR: ", err);
        }
        
    });

  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});
