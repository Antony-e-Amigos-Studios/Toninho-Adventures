/**
 * Antony Game Engine
 * @author Magoninho and Tsukiiii
 * @copyright Copyright (c) 2021 Antony e Amigos Studios. All rights reserved
 */
import { NonEntityGameObject } from "./GameObject.js";

export default class Game extends NonEntityGameObject {
    constructor() {
        super();
        this.xspd = 0;
        this.dt = 0;
        this.last = Date.now();
        this.yspd = 0;
        this.text = "";
        this.entities = [];
        this.background = undefined;
        this.scenes = {};
        this.scene = "";
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    draw(ctx) {
        if(!this.background) {
            ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
            ctx.fillRect(0, 0, this.width, this.height);
        } else {
            ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            ctx.drawImage(this.background, 0, 0, this.width, this.height);
            ctx.imageSmoothingEnabled = false; // A LINHA MAIS MILAGROSA DO PROJETO
        }
    }

    setbg(img) {
        this.background = img;
    }

    apply_to_all_entities(f) {
        for (let ent of this.entities) {
            f(ent);
        }
    }

    drawtext(txt) {
      this.text = txt;
    }

    gameLoop() {
        if (this === undefined) {
            return undefined;
        }
        let now = Date.now();
        this.dt = (now - this.last) / 1000;
        this.last = now;
        this.update_components();
        this.draw(this.ctx); // apaguei essa linha sem qrer fds
        if (this.scene !== "") {
            this.get_current_scene().update(this.ctx);
        }
        for (let ent of this.entities) {
            ent.update(this, this.dt);
            ent.position_update();
            ent.update_components(this.ctx, this.dt);
        }

        this.ctx.font = "15px monospace";
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.fillText(this.text,10,100);
        
        // tem q por o deltaTime aq
        window.requestAnimationFrame(this.gameLoop);
    }

    add_entity(entity) {
        this.entities.push(entity);
    }

    remove_entity(entity) {
        delete this.entities[entity]
    }

    get_text(name) {
      return name in this.texts;
    }

    create_scene(name, scene) {
        this.scenes[name] = scene;
    }

    get_current_scene(){
        if (this.scene !== "") {
            return this.scenes[this.scene];
        }
    }

    create_text(name) {
      this.texts[name] = "";
    }

    set_text(name, value) {
      this.texts[name] = value;
    }

    set_current_scene(name) {
        if (name in this.scenes) { // if key exists
            this.scene = name;
        }
    }

    center(dim) {
        return {x:(this.width/2 - dim.w/2) + dim.x,
                y:(this.height/2 - dim.h/2) + dim.y};
    }

    main() {
        this.canvas.style.border = "1px solid #000";

        document.body.appendChild(this.canvas);

        setInterval(this.gameLoop.bind(this), 1000 / 60);
    }
}