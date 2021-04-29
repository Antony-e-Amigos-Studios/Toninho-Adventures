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
    this.p.id = "p";
    this.msgs.append(this.p);
  }

  add_message(message){
    this.p.style.color = message.c || "#eeeeee"
    this.buf += `${message.sender}: ${message.msg}\n`;
    this.p.innerText = this.buf;
  }
}