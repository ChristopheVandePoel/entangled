/// <reference path="./Primitives/Immovable.ts"/>
/// <reference path="./Primitives/Movable.ts"/>
/// <reference path="./Physics/World.ts"/>
/// <reference path="./utils/utils.ts"/>
function init() {
    var canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 750;
    canvas.style.border = "1px solid black";
    document.getElementById("app").appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var world = new Core.World(ctx, Utils.determineCrossing);
    world.createMovableObject(new Core.Rectangle(150, 150, 20, 30, 25, -20));
    world.createMovableObject(new Core.Rectangle(480, 250, 10, 40, 30, -10));
    world.createMovableObject(new Core.Rectangle(480, 250, 10, 40, -30, -10));
    world.createMovableObject(new Core.Rectangle(250, 50, 20, 30, 30, -15));
    world.createImmovableObject(new Core.Immovable(400, 600, 500, 40));
    world.createImmovableObject(new Core.Immovable(200, 400, 250, 40));
    world.createImmovableObject(new Core.Immovable(600, 400, 250, 40));
    world.createImmovableObject(new Core.Immovable(900, 375, 100, 1000));
    world.renderObjects();
    world.start();
    setTimeout(function () {
        world.startTime();
    }, 500);
    setTimeout(function () {
        world.stopTime();
    }, 2000);
}
init();
//# sourceMappingURL=index.js.map