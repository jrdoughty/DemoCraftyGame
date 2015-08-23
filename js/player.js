"use strict";

var Player = function(xPos,yPos){
    var player = Crafty.e("2D, DOM, Actor, Keyboard, Mouse, Dialogues,  GetPoints,  CustomControls,  SpriteAnimation, SpellCaster, FireLion")
        .attr({
            x: xPos,
            y: yPos,
            w: 32,
            h: 32,
            z: 100,
            hitbox: Crafty.e("2D,DOM, Keyboard, Interactor, Collision")
                .attr({
                    w: 26,
                    h: 26,
                    z: 100
                })
                .bind("EnterFrame", function() {
                    this.x = player.x - (this.w - player.w) / 2;
                    this.y = player.y - (this.h - player.h);
                })
                .collision()
                .onHit("Solids", function() {
                    player.x = player.from.x;
                    player.y = player.from.y;
                    this.x = player.x - (this.w - player.w);
                    this.y = player.y - (this.h - player.h);
                    player.pauseAnimation();
                })
                .Interactor(Paused)
        })
        .CustomControls(2, Paused)
        .reel("walkdown", 500, 0, 0, 3)
        .reel("walkleft", 500, 0, 1, 3)
        .reel("walkright", 500, 0, 2, 3)
        .reel("walkup", 500, 0, 3, 3)
        .reel("walkrightdown", 500, 3, 2, 3)
        .reel("walkleftdown", 500, 3, 0, 3)
        .reel("walkrightup", 500, 3, 3, 3)
        .reel("walkleftup", 500, 3, 1, 3)
        .setDialogues(DIALOGUES_DATA_SOURCE)
        .bind("Click", function() {
            this.showDialogue();
            chatDiv.style.height = "150px";
        })
        .bind("ConversationIsOver", function() {
            this.endOfConversation();
            chatDiv.style.height = "0px";
        })
        .bind("EnterFrame", function() {
            this.ResetFrom();
            this.Move();
            this.Animate();
        })
        .bind("KeyUp", function() {
            this.pauseAnimation();
        })
    return player;
}