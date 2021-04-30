import Server from '../Engine/Server.js';

export default class Chat {
  constructor(){
    this.chat = document.createElement('div');
    this.chat.id = "chat";
    this.input = document.createElement('input');
    this.input.type = "text";
    this.msgs = document.createElement('div');
    this.msgs.id = "msgs";
    this.chat.append(this.msgs);
    this.chat.append(this.input);
    document.querySelector('body').append(this.chat);
    // corte aq caso de merda
    this.buf = "";
    this.p = document.createElement('p');
    this.p.id = "p"
    this.msgs.append(this.p);
  }

  add_message(message){
    if (this.buf.split('\n').length > 50) {
      let lines = this.buf.split('\n');
      lines.splice(0,1);
      this.buf = lines.join('\n');
    }

    let validate = /^[^<]+$/g;

    if (!validate.exec(message.msg)) {
      this.buf += `<h4 style="color:red">${message.sender} tentou haskiar o sistema</h4>\n`;
      this.p.innerHTML = this.buf;
      return;
    }

    this.buf += `<h4 style="color: ${message.color || '#eeeeee'}">${message.sender}: ${message.msg}</h4>`;

    // for (let line of buf.split('\n')) {
    //   this.p.append(color);
      
    //   color.style.color = message.c || "#eeeeee"
    // }

    this.p.innerHTML = this.buf;
  }
}