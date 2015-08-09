"use strict";

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

            var Paused = function() {
                    if (inventorySystem.IsActive()) {
                        return true;
                    }
                    return false;
                },
                startLocation = [startX, startY],
                player,
                i = 0;

            player = Crafty.e("2D, DOM, Meldy, Keyboard, Mouse, Dialogues,  GetPoints,  CustomControls,  SpriteAnimation")
                    .attr({
                        x: startLocation[0],
                        y: startLocation[1],
                        w: 32,
                        h: 64,
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
                    .reel("walkright", 500, 0, 0, 8)
                    .reel("walkrightup", 500, [
                        [8, 0],
                        [9, 0],
                        [10, 0],
                        [11, 0],
                        [12, 0],
                        [13, 0],
                        [14, 0],
                        [0, 1]
                    ])
                    .reel("walkleftup", 500, [
                        [1, 1],
                        [2, 1],
                        [3, 1],
                        [4, 1],
                        [5, 1],
                        [6, 1],
                        [7, 1],
                        [8, 1]
                    ])
                    .reel("walkup", 500, [
                        [9, 1],
                        [10, 1],
                        [11, 1],
                        [12, 1],
                        [13, 1],
                        [14, 1],
                        [0, 2],
                        [1, 2]
                    ])
                    .reel("walkrightdown", 500, [
                        [2, 2],
                        [3, 2],
                        [4, 2],
                        [5, 2],
                        [6, 2],
                        [7, 2],
                        [8, 2],
                        [9, 2]
                    ])
                    .reel("walkleftdown", 500, [
                        [10, 2],
                        [11, 2],
                        [12, 2],
                        [13, 2],
                        [14, 2],
                        [0, 3],
                        [1, 3],
                        [2, 3]
                    ])
                    .reel("walkdown", 500, [
                        [3, 3],
                        [4, 3],
                        [5, 3],
                        [6, 3],
                        [7, 3],
                        [8, 3],
                        [9, 3],
                        [10, 3]
                    ])
                    .reel("walkleft", 500, [
                        [11, 3],
                        [12, 3],
                        [13, 3],
                        [14, 3],
                        [0, 4],
                        [1, 4],
                        [2, 4],
                        [3, 4]
                    ])
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

            /**@
             * #TiledMapImport
             * @category Setup
             * Setup Basic Scenes, Namely Loading and Main
             * @param setMapDataSource - takes Tiled JSON Object as a Param
             * @param createWorld - Runs with world creation, allowing you to loop through the elements
             * and add components like Collision to them.
             */
            //the loading screen that will display while our assets load
            Crafty.e("2D, DOM, TiledMapBuilder").setMapDataSource(map)
                .createWorld(function(tiledmap) {
                    var i,
                        entity;
                    //Obstacles
                    if (tiledmap.getEntitiesInLayer('Solids')) {
                        for (i = 0; i < tiledmap.getEntitiesInLayer('Solids').length; i = i + 1) {
                            entity = tiledmap.getEntitiesInLayer('Solids')[i];
                            entity.addComponent("Collision");
                            entity.addComponent("Interactable");

                            entity.collision(entity.polygon);
                            
                        }
                    }
                })
            inventorySystem.Init(0, 0, StageW, StageH, 32, 100);

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

            inventorySystem.Close();
            for (i = 0; i < 5; i = i + 1) { //JSLint barfs about making functions in loops, should make certain this is handled better in production code
                inventorySystem.AddItem(Crafty.e("2D, DOM, Item, greenhat").attr({
                    description: "greenhat",
                    Use: function() {
                        console.log("Used Green Hat");
                    }
                }));
                inventorySystem.AddItem(Crafty.e("2D, DOM, Item, greentunic").attr({
                    description: "greentunic",
                    Use: function() {
                        console.log("Used Green Tunic");
                    }
                }));
                inventorySystem.AddItem(Crafty.e("2D, DOM, Item, greenpants").attr({
                    description: "greenpants",
                    Use: function() {
                        console.log("Used Green Pants");
                    }
                }));
                inventorySystem.AddItem(Crafty.e("2D, DOM, Item, greenshoes").attr({
                    description: "greenshoes",
                    Use: function() {
                        inventorySystem.Close();
                        console.log("Used Green Shoes");
                    }
                }));
            }

        });
    }
    return scene;
}
