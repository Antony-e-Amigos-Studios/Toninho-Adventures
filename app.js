const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const PORT = 3000
const readline = require('readline')
// const rl = readline.createInterface(process.stdin, process.stdout)

app.use(express.static(__dirname + "/public/"))

server.listen(PORT, () => {
    console.clear()
    console.log(`Servidor inciado em http://localhost:${PORT}`)
})

/////////////////////////////////////////////////////////////
let players = {}

io.on('connection', socket => {
    console.log('Cliente conectado!')

    socket.on('NewPlayer', data => {
        for (let key in players) {
          let p = players[key];
          if (p.name == data.name) {
            socket.emit('rename');
            return;
          }
        }
        players[socket.id] = (data)
        io.emit('UpdatePlayers', players)
    })

    socket.on("ValidateName", name => {
      for (let p in players) {
        let pname = players[p].name;
        if(pname === name){
          socket.emit('Name', false)
        }else{
          socket.emit('Name', true)
        }
      }
    })

    socket.on('UpdatePlayer', (id, data) => {
        players[id] = data
        players["online"] = Object.keys(players).length-1;
        io.emit('UpdatePlayers', players)
    })

    socket.on('chat', data => {
        io.emit('chatmsg', data)
    }) // data -> {sender: player.name,
       //          msg:    msg}

    socket.on('disconnect', ()=> {
        delete players[socket.id]
        io.emit('UpdatePlayers', players)
    })
})