"use strict";

var Paused = function () {
    if (inventorySystem.IsActive()) {
        return true;
    }
    return false;
}

var MakeScene = function(map, startX, startY) {
    var scene = {},
        i;
    scene.init = function() {};
    scene.manager = {};
    scene.sceneName = "name";
    scene.SetManager = function(manager) {
        this.manager = manager;
    };
    scene.criteria = [];
    for (i = map.tilesets.length - 1; i >= 0; i--) {
        scene.criteria.push(map.tilesets[i].image.replace("../",""))
    };
    scene.criteria += ['sharedimages/64map.png',
        'sharedimages/Meldy_Walk_1.png',
        'sharedimages/itemsprites.png',
        'sharedimages/menu.jpg'];

    scene.SetScene = function() {
        Crafty.scene(this.sceneName, function() {
            var player,
                i = 0;            

            Crafty.e("2D, DOM, TiledMapBuilder").setMapDataSource(map)
                .createWorld(function(tiledmap) {
                    var i,
                        entity;
                    //Obstacles
                    if (tiledmap.getEntitiesInLayer('Solids')) {
                        for (i = 0; i < tiledmap.getEntitiesInLayer('Solids').length; i = i + 1) {
                            entity = tiledmap.getEntitiesInLayer('Solids')[i];
                            entity.addComponent("Collision");
                            entity.collision(entity.polygon);  
                        }
                    }
                    if(tiledmap.getEntitiesInLayer('Player')){
                        player = Player(tiledmap.getEntitiesInLayer('Player')[0].x,tiledmap.getEntitiesInLayer('Player')[0].y);
                    } else {
                        player = Player(100,0);
                    }
                });
            inventorySystem.Init(0, 0, StageW, StageH, 32, 100);
            inventorySystem.CreateDemo();
            Crafty.e("2D, DOM, Item, greenhat").attr({
                    x:64,
                    y:270,
                    w:30,
                    h:30,
                    description: "greenhat",
                    Use: function() {
                        console.log("Used Green Hat");
                    }
                })

        });
    }
    return scene;
}
