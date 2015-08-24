fireLion = function(player){
    var lion = Crafty.e('2D, DOM, SpriteAnimation, FireLionFull');
    lion.attr({
        x: player.x + player.w,
        y: player.y,
        w: player.w,
        h: player.h,
        z: 100,
        killNextFrame:false
    });
    lion.reel('FireLionDownAnim', 500, [[0,0],[1,0],[2,0],[3,0],
        [0,1],[1,1],[2,1],[3,1],
        [0,2],[1,2],[2,2],[3,2],
        [0,3],[1,3],[2,3],[3,3]])
        .reel("walkdown", 500, 0, 0, 3)
        .reel("walkleft", 500, 0, 1, 3)
        .reel("walkright", 500, 0, 2, 3)
        .reel("walkup", 500, 0, 3, 3)
        .reel("walkrightdown", 500, 3, 2, 3)
        .reel("walkleftdown", 500, 3, 0, 3)
        .reel("walkrightup", 500, 3, 3, 3)
        .reel("walkleftup", 500, 3, 1, 3);
    lion.animate('FireLionAnim', 1);
    lion.bind('EnterFrame',function(){
        this.x += 2;
        if(this.killNextFrame){
            this.destroy();
        }else if(this.getReel().currentFrame === 15){
            this.killNextFrame = true;
        }

    });
}