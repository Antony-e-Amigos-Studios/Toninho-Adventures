const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const PORT = 3000
const readline = require('readline')

const map = require('./Matrixs/mapMatrix.js')
let tree = require('./Matrixs/treeMatrix.js')

for (let i = 3; i < tree.length; i++) {
  for (let j = 3; j < tree[0].length; j++) {
    tree[i][j] = Math.floor(Math.random() * 6);
    if (i < 5 || i > 18) {
      tree[i][j] = Math.floor(Math.random() * 6) + 7;
    } else if (j < 5 || j > 23) {
      tree[i][j] = Math.floor(Math.random() * 6) + 7;
    }
  }
}

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

    socket.emit('Matrixs', map, tree)

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
        players[id] = data;
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