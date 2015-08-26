Crafty.c('SpellCaster',{
    spells : [],
    activeSpell:{},
    CastSpell: function(){
        this.activeSpell.Cast(this);
    },
    init: function(){
        this.bind('KeyDown',function(){
            if(this.isDown(Crafty.keys.CTRL)){
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
            Cast: fireLion
        });

        if(this.spells.length == 1){
            this.activeSpell = this.spells[0];
        }
    }
    
})

fireLion = function(player) {
    var lion = Crafty.e('2D, DOM, SpriteAnimation, FireLionFull'),
        frame = "",
        yVelocity = 0,
        xVelocity = 0,
        velocity = 1;
    lion.attr({
        x: 0,
        y: 0,
        w: player.w,
        h: player.h,
        z: 100,
        killNextFrame: false
    });
    lion.reel("FireLionAnimDown", 500, [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
        [0, 3],
        [1, 3],
        [2, 3],
        [3, 3]
    ])
        .reel("FireLionAnimLeft", 500, [
            [4, 0],
            [5, 0],
            [6, 0],
            [7, 0],
            [4, 1],
            [5, 1],
            [6, 1],
            [7, 1],
            [4, 2],
            [5, 2],
            [6, 2],
            [7, 2],
            [4, 3],
            [5, 3],
            [6, 3],
            [7, 3]
        ])
        .reel("FireLionAnimRight", 500, [
            [4, 4],
            [5, 4],
            [6, 4],
            [7, 4],
            [4, 5],
            [5, 5],
            [6, 5],
            [7, 5],
            [4, 6],
            [5, 6],
            [6, 6],
            [7, 6],
            [4, 7],
            [5, 7],
            [6, 7],
            [7, 7]
        ])
        .reel("FireLionAnimUp", 500, [
            [0, 4],
            [1, 4],
            [2, 4],
            [3, 4],
            [0, 5],
            [1, 5],
            [2, 5],
            [3, 5],
            [0, 6],
            [1, 6],
            [2, 6],
            [3, 6],
            [0, 7],
            [1, 7],
            [2, 7],
            [3, 7]
        ]);
    if(player.reel() === null){//If not populate, player hasn't moved and is still pointing down
        frame = "FireLionAnimDown";
        yVelocity = velocity;
        lion.x = player.x;
        lion.y = player.y + player.h;
    }else if (player.reel().indexOf("right") > -1) {
        frame = "FireLionAnimRight";
        xVelocity = velocity;
        lion.x = player.x + player.w;
        lion.y = player.y;
    } else if (player.reel().indexOf("left") > -1) {
        frame = "FireLionAnimLeft";
        xVelocity = -velocity;
        lion.x = player.x - lion.w;
        lion.y = player.y;
    } else if (player.reel().indexOf("up") > -1) {
        frame = "FireLionAnimUp";
        yVelocity = -velocity;
        lion.x = player.x;
        lion.y = player.y - lion.h;
    } else {
        frame = "FireLionAnimDown";
        yVelocity = velocity;
        lion.x = player.x;
        lion.y = player.y + player.h;
    }
    lion.animate(frame, 1);
    lion.bind('EnterFrame', function() {
        this.x += xVelocity;
        this.y += yVelocity;
        if (this.killNextFrame) {
            this.destroy();
        } else if (this.getReel().currentFrame === 15) {
            this.killNextFrame = true;
        }

    });
}

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