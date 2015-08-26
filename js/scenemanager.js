"use strict";
/**@
 * #Scenes
 * @category Setup
 * Setup Basic Scenes, Namely Loading and Main
 * @param loading - loading text screen. Waits on sprite .png files
 * @param main - main gameplay scene
 */

//automatically play the loading scene
Crafty.c("SceneManager", {
    StartScene: function (scene) {
        Crafty.scene("loading", function () {
            //black background with some loading text
            Crafty.background("#000");
            Crafty.e("2D, DOM, Text")
                .attr({
                    w: 100,
                    h: 20,
                    x: 150,
                    y: 120
                })
                .text("Loading")
                .css({
                    "text-align": "center"
                });
            Crafty.load(scene.criteria, function () {
                scene.SetManager(this);
                scene.SetScene();
                Crafty.scene(scene.sceneName);
            });
        });
        Crafty.scene("loading");
    }
});