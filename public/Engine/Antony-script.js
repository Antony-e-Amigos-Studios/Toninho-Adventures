export default class Script {
  constructor(code) {
    this.code = code;
  }

  parse(code) {
    let ast = [];
    for (let i of code.split('\n')) {
      
    }
  }

  run() {
    let ast = this.parse(this.code);
  }
}