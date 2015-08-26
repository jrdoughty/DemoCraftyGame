"use strict";

var StageW = 432,
    StageH = 432,
    stageDiv,
    chatDiv,
    sceneManager;



window.onload = function () {
    //start crafty
    stageDiv = document.querySelector("#stage");
    chatDiv = document.querySelector("#chat");
    sceneManager = Crafty.e('2D, Persist, SceneManager');
    Crafty.init(StageW, StageH);
    stageDiv.style.width = StageW + "px";
    chatDiv.style.width = StageH + "px";

    $.ajaxSetup({
        beforeSend: function(xhr){
            if (xhr.overrideMimeType)
            {
                xhr.overrideMimeType("application/json");
            }
        }
    });
    $.getJSON("wester1.json", function(map){
        sceneManager.StartScene(MakeScene(map,50,0));
    })
    
};
