"use strict";
/**@
    * #Interaction System
    * @category GamePlay
    * using Crafty.sprite to create sprites from the sprite sheets I specify in 
    * @param interactableObjects - Array of Objects with the Interactable Component. 
    * Made for speed since Crafty("Interactable") is a very slow way to access the entities
    * @param Interactable - Component that allows the use of interaction functions, 
    * Sets the default function to log a "test" string
    * @param Interactor - Adds a KeyDown Event Listener that checks for new directions and the spacebar
    * If the player is facing the entity that is interactable and is close enough, it will trigger the interaction
    */
var interactableObjects = []
Crafty.c('Interactable', {
    init: function () {
        interactableObjects.push(this);
        this.interaction = function (o) {
            console.log("test");
        }
    },
    Interact: function (object) {
        this.interaction(object);
    }
});

Crafty.c('Interactor', {
    init: function () {

        this.faceing = {
            left: false,
            right: false,
            up: false,
            down: true
        };
        this.bind("KeyDown", function () {
            var i,
                leftDown = this.isDown(Crafty.keys.LEFT_ARROW) || this.isDown(Crafty.keys.A),
                rightDown = this.isDown(Crafty.keys.RIGHT_ARROW) || this.isDown(Crafty.keys.D),
                downDown = this.isDown(Crafty.keys.DOWN_ARROW) || this.isDown(Crafty.keys.S),
                upDown = this.isDown(Crafty.keys.UP_ARROW) || this.isDown(Crafty.keys.W);

            if (!this.paused()) {
                if (leftDown || rightDown || downDown || upDown) {
                    if (!leftDown) {
                        this.faceing.left = false;
                    }
                    if (!rightDown) {
                        this.faceing.right = false;
                    }
                    if (!downDown) {
                        this.faceing.down = false;
                    }
                    if (!upDown) {
                        this.faceing.up = false;
                    }

                    if (this.isDown(Crafty.keys.LEFT_ARROW) || this.isDown(Crafty.keys.A)) {
                        this.faceing.left = true;
                        this.faceing.right = false;
                    } else if (this.isDown(Crafty.keys.RIGHT_ARROW) || this.isDown(Crafty.keys.D)) {
                        this.faceing.right = true;
                        this.faceing.left = false;
                    }

                    if (this.isDown(Crafty.keys.UP_ARROW) || this.isDown(Crafty.keys.W)) {
                        this.faceing.up = true;
                        this.faceing.down = false;
                    } else if (this.isDown(Crafty.keys.DOWN_ARROW) || this.isDown(Crafty.keys.S)) {
                        this.faceing.down = true;
                        this.faceing.up = false;
                    }
                }

                if (this.isDown(Crafty.keys.SPACE)) {
                    for (i = 0; i < interactableObjects.length; i = i + 1) {
                        if (this.faceing.up && this.faceing.left && !this.faceing.right &&
                            this.x + this.w > interactableObjects[i].x &&
                            this.x - (this.w / 2) < interactableObjects[i].x + interactableObjects[i].w &&
                            this.y + this.h > interactableObjects[i].y &&
                            this.y < interactableObjects[i].y + interactableObjects[i].h + (interactableObjects[i].h / 2) ||

                            this.faceing.up && this.faceing.right && !this.faceing.left &&
                            this.x < interactableObjects[i].x + interactableObjects[i].w &&
                            this.x + this.w > interactableObjects[i].x - (interactableObjects[i].w / 2) &&
                            this.y + this.h > interactableObjects[i].y &&
                            this.y < interactableObjects[i].y + interactableObjects[i].h + (interactableObjects[i].h / 2) ||

                            this.faceing.down && this.faceing.right && !this.faceing.left &&
                            this.x < interactableObjects[i].x + interactableObjects[i].w &&
                            this.x + this.w > interactableObjects[i].x - (interactableObjects[i].w / 2) &&
                            this.y + this.h > interactableObjects[i].y - (interactableObjects[i].h / 2) &&
                            this.y < interactableObjects[i].y + interactableObjects[i].h ||

                            this.faceing.down && this.faceing.left && !this.faceing.right &&
                            this.x + this.w > interactableObjects[i].x &&
                            this.x - (this.w / 2) < interactableObjects[i].x + interactableObjects[i].w &&
                            this.y + this.h > interactableObjects[i].y - (interactableObjects[i].h / 2) &&
                            this.y < interactableObjects[i].y + interactableObjects[i].h ||

                            this.faceing.up && !this.faceing.left && !this.faceing.right &&
                            this.x - this.w < interactableObjects[i].x &&
                            this.x + this.w > interactableObjects[i].x &&
                            this.y >= interactableObjects[i].y + interactableObjects[i].h &&
                            this.y < interactableObjects[i].y + interactableObjects[i].h + (interactableObjects[i].h / 2) ||

                            this.faceing.down && !this.faceing.left && !this.faceing.right &&
                            this.x - this.w < interactableObjects[i].x &&
                            this.x + this.w > interactableObjects[i].x &&
                            this.y + this.h <= interactableObjects[i].y &&
                            this.y + this.h > interactableObjects[i].y - (interactableObjects[i].h / 2) ||

                            this.faceing.right && !this.faceing.up && !this.faceing.down &&
                            this.x + this.w <= interactableObjects[i].x &&
                            this.x + this.w > interactableObjects[i].x - (interactableObjects[i].w / 2) &&
                            this.y - this.h < interactableObjects[i].y &&
                            this.y + this.h > interactableObjects[i].y ||

                            this.faceing.left && !this.faceing.up && !this.faceing.down &&
                            this.x >= interactableObjects[i].x + interactableObjects[i].w &&
                            this.x < interactableObjects[i].x + interactableObjects[i].w + (interactableObjects[i].w / 2) &&
                            this.y - this.h < interactableObjects[i].y + interactableObjects[i].h &&
                            this.y + this.h > interactableObjects[i].y) {
                            this.Interact(interactableObjects[i]);
                            break;
                        }
                    }
                }
                if (this.isDown(Crafty.keys.I)) {
                    inventorySystem.Open(Crafty.viewport.x, Crafty.viewport.y);
                }
            }
            else {

                if (this.isDown(Crafty.keys.SPACE) && this.isDown(Crafty.keys.SHIFT)) {
                    inventorySystem.UseItemFromMenuWithElectricity();
                }
                else if (this.isDown(Crafty.keys.SPACE)) {

                    inventorySystem.UseItemFromMenu();
                }

                if (this.isDown(Crafty.keys.I)) {
                    inventorySystem.Close();
                }
                if (rightDown) {
                    inventorySystem.MoveSelectedItem("right");
                }
                if (leftDown) {
                    inventorySystem.MoveSelectedItem("left");
                }
                if (upDown) {
                    inventorySystem.MoveSelectedItem("up");
                }
                if (downDown) {
                    inventorySystem.MoveSelectedItem("down");
                }
            }
            if (this.isDown(Crafty.keys.B)) {
                inventorySystem.AddItem(Crafty.e("2D, DOM, Item, greenshoes"));

            }
            if (this.isDown(Crafty.keys.J)) {
                inventorySystem.RemoveItem("greenshoes");

            }
        });
    },
    paused: function () { return false },
    Interactor: function (pauseMethod) {
        this.paused = pauseMethod;
    },
    Interact: function (o) {
        o.Interact(this);
    }


});

/**@
    * #Custom Controls
    * @category Input
    * Didn't want to use the auto-magic that is multiway
    * @param {integer} speed - num of pixels to move
    * @param {object} from - Last Location x and y - set in the constructor to keep from being a shared var
    * @param {function} Constructor - sets up from and returns itself for chaining
    * @param {function} Reset From
    * @param {function} Move
    **/
Crafty.c('CustomControls', {
    speed: 3,
    paused: function () { return false },
    CustomControls: function (speed, pauseMethod) {
        if (speed) {
            this.speed = speed;
            this.paused = pauseMethod;
        }
        this.from = {
            x: this.x,
            y: this.y
        };
        return this;
    },
    ResetFrom: function () {
        this.from.x = this.x;
        this.from.y = this.y;
    },
    Animate: function () {

        if (!this.paused()) {
            if (this.isDown(Crafty.keys.LEFT_ARROW) && this.isDown(Crafty.keys.UP_ARROW) || this.isDown(Crafty.keys.A) && this.isDown(Crafty.keys.W)) {
                if (!this.isPlaying("walkleftup"))
                    this.animate("walkleftup", -1);
            } else if (this.isDown(Crafty.keys.RIGHT_ARROW) && this.isDown(Crafty.keys.UP_ARROW) || this.isDown(Crafty.keys.D) && this.isDown(Crafty.keys.W)) {
                if (!this.isPlaying("walkrightup"))
                    this.animate("walkrightup", -1);
            } else if (this.isDown(Crafty.keys.RIGHT_ARROW) && this.isDown(Crafty.keys.DOWN_ARROW) || this.isDown(Crafty.keys.D) && this.isDown(Crafty.keys.S)) {
                if (!this.isPlaying("walkrightdown"))
                    this.animate("walkrightdown", -1);
            } else if (this.isDown(Crafty.keys.LEFT_ARROW) && this.isDown(Crafty.keys.DOWN_ARROW) || this.isDown(Crafty.keys.A) && this.isDown(Crafty.keys.S)) {
                if (!this.isPlaying("walkleftdown"))
                    this.animate("walkleftdown", -1);
            } else if (this.isDown(Crafty.keys.LEFT_ARROW) || this.isDown(Crafty.keys.A)) {
                if (!this.isPlaying("walkleft"))
                    this.animate("walkleft", -1);
            } else if (this.isDown(Crafty.keys.RIGHT_ARROW) || this.isDown(Crafty.keys.D)) {
                if (!this.isPlaying("walkright"))
                    this.animate("walkright", -1);
            } else if (this.isDown(Crafty.keys.UP_ARROW) || this.isDown(Crafty.keys.W)) {
                if (!this.isPlaying("walkup"))
                    this.animate("walkup", -1);
            } else if (this.isDown(Crafty.keys.DOWN_ARROW) || this.isDown(Crafty.keys.S)) {
                if (!this.isPlaying("walkdown"))
                    this.animate("walkdown", -1);
            }
        }
        else {
            this.pauseAnimation();
        }
    },
    Move: function () {
        this.leftDown = this.isDown(Crafty.keys.LEFT_ARROW) || this.isDown(Crafty.keys.A);
        this.rightDown = this.isDown(Crafty.keys.RIGHT_ARROW) || this.isDown(Crafty.keys.D);
        this.downDown = this.isDown(Crafty.keys.DOWN_ARROW) || this.isDown(Crafty.keys.S);
        this.upDown = this.isDown(Crafty.keys.UP_ARROW) || this.isDown(Crafty.keys.W);

        if (!this.paused()) {
            if (this.leftDown && this.upDown) {
                this.x -= this.speed * .71;
                this.y -= this.speed * .71;
            } else if (this.rightDown && this.upDown) {
                this.x += this.speed * .71;
                this.y -= this.speed * .71;
            } else if (this.rightDown && this.downDown) {
                this.x += this.speed * .71;
                this.y += this.speed * .71;
            } else if (this.leftDown && this.downDown) {
                this.x -= this.speed * .71;
                this.y += this.speed * .71;
            } else if (this.rightDown) {
                this.x += this.speed;
            } else if (this.leftDown) {
                this.x -= this.speed;
            } else if (this.upDown) {
                this.y -= this.speed;
            } else if (this.downDown) {
                this.y += this.speed;
            }
        }
    }
});


Crafty.c('Item', {
    description: "No description Added" + this.name,
    selected: false,
    Use: function() {
        console.log("No Use Added");
    },
    UseWithElectricity: function() {
        console.log("No Use With Electricity");
    }
});

Crafty.c('Spell', {
    description: "No description Added" + this.name,
    selected: false,
    Use: function() {
        console.log("No Use Added");
    },
    UseInInventory: function() {
        console.log("No Use With Electricity");
    }
});

Crafty.c('SpellCaster',{
    spells : [],
    activeSpell:{},
    CastSpell: function(){
        this.activeSpell.Cast(this);
    },
    init: function(){
        this.bind('KeyDown',function(){
            if(this.isDown(Crafty.keys.SPACE)){
                this.CastSpell();
            }
        })
    }
});

Crafty.c('FireLion',{
    init: function(){
        this.requires('SpellCaster');
        this.spells.push({
            id:'FireLion',
            Cast: function(player){
                var lion = Crafty.e('2D, DOM, SpriteAnimation, FireLionRight');
                lion.attr({
                    x: player.x + player.w,
                    y: player.y,
                    w: player.w*2,
                    h: player.h*2,
                    z: 100});
                lion.reel('FireLionRightAnim', 500, [[0,0],[1,0],[2,0],[3,0],
                    [0,1],[1,1],[2,1],[3,1],
                    [0,2],[1,2],[2,2],[3,2],
                    [0,3],[1,3],[2,3],[3,3]]);
                lion.animate('FireLionRightAnim', -1);
                lion.bind('EnterFrame',function(){this.x += 2});
            }
        });

        if(this.spells.length == 1){
            this.activeSpell = this.spells[0];
        }
    },
    
})
