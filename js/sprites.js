"use strict";
/**@
    * #Sprite Setup
    * @category Setup
    * using Crafty.sprite to create sprites from the sprite sheets I specify in 
    */
//turn the sprite map into usable components

Crafty.sprite(64, 128, "sharedimages/Meldy_Walk_1.png", { Meldy: [0, 0] }, 2, 2);
/*
Crafty.sprite(16, "sharedimages/sprite.png", {
    grass1: [0, 0],
    grass2: [1, 0],
    grass3: [2, 0],
    grass4: [3, 0],
    flower: [0, 1],
    bush1: [0, 2],
    bush2: [1, 2],
    player: [0, 3]
});
Crafty.sprite(32, 32, "sharedimages/Actor8D.png", {
    actor32x32: [0, 0]
});
*/
Crafty.sprite(16, 16, "sharedimages/itemsprites.png", {
    greenhat: [0, 0],
    greentunic: [0, 1],
    greenpants: [0, 2],
    greenshoes: [0, 3],
    greyhat: [1, 0],
    greytunic: [1, 1],
    greypants: [1, 2],
    greyshoes: [1, 3]
});

Crafty.sprite(384, 304, "sharedimages/menu.jpg", {
    InventoryBackground: [0, 0]
});