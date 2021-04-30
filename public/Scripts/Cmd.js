import Server from '../Engine/Server.js';

class Command {
  constructor(re, fn) {
    this.re = re;
    this.fn = fn;
  }

  run (msg, player, players) {
    let match = this.re.exec(msg);
    if (match != null) {
      this.fn(match, player, players);
      return true;
    }
    return false;
  }
}

class send {
  static run(argv, player, players) {
    for (let i = 0; i < parseInt(argv[2]); i++) {
      Server.emit('chat', {sender: player.name,     msg: argv[1], c:"rgb(200,200,200)"});
    }
  }
}

class speedCheat {
  static run(argv, player, players) {
    player.get("movement").speed = parseInt(argv[1]);
  }
}

class tpCheat {
  static run(argv, player, players, chatc) {
    let name = argv[1];
    for (let key in players) {
      let p = players[key];
      if (name == p.name) {
        player.x = p.x;
        player.y = p.y;
        return;
      }
    }
  }
}

export { Command,  speedCheat, tpCheat, send };