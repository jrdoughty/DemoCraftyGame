"use strict";
/**@
    * #Sprite Setup
    * @category Setup
    * using Crafty.sprite to create sprites from the sprite sheets I specify in 
    */
//turn the sprite map into usable components

Crafty.sprite(64, 128, "img/Meldy_Walk_1.png", { Meldy: [0, 0] }, 2, 2);
Crafty.sprite(32, "img/actor.png", {
    Actor: [0, 0]
});
Crafty.sprite(128, "img/spells/firelion_right.png", {
    FireLionRight: [0, 0]
});
Crafty.sprite(128, "img/spells/firelion_left.png", {
    FireLionLeft: [0, 0]
});
Crafty.sprite(128, "img/spells/firelion_up.png", {
    FireLionUp: [0, 0]
});
Crafty.sprite(128, "img/spells/firelion_down.png", {
    FireLionDown: [0, 0]
});
Crafty.sprite(16, 16, "img/itemsprites.png", {
    greenhat: [0, 0],
    greentunic: [0, 1],
    greenpants: [0, 2],
    greenshoes: [0, 3],
    greyhat: [1, 0],
    greytunic: [1, 1],
    greypants: [1, 2],
    greyshoes: [1, 3]
});

Crafty.sprite(384, 304, "img/menu.jpg", {
    InventoryBackground: [0, 0]
});
