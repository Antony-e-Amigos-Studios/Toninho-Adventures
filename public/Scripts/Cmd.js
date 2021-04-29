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

class speedCheat {
  static run(argv, player, players) {
    player.get("movement").speed = parseInt(argv[1]);
  }
}

class tpCheat {
  static run(argv, player, players) {
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

export { Command,  speedCheat, tpCheat };