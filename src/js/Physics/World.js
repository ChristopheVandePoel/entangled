/// <reference path="../Primitives/Immovable.ts"/>
/// <reference path="../Primitives/Movable.ts"/>
/// <reference path="../utils/utils.ts"/>
var Core;
(function (Core) {
    var World = (function () {
        /**
         * @param ctx
         * @param crossing
         */
        function World(ctx, crossing) {
            this._timeStarted = false;
            this._movableWorldObjects = [];
            this._notMovableWorldObjects = [];
            this._beginTime = 0;
            this._tickInterval = 0;
            this._timeScale = 1;
            this._timeBase = 150;
            this._ctx = ctx;
            this._determineCrossing = crossing;
        }
        World.prototype.createImmovableObject = function (notMovable) {
            this._notMovableWorldObjects.push(notMovable);
        };
        World.prototype.createMovableObject = function (movable) {
            this._movableWorldObjects.push(movable);
        };
        World.prototype.start = function () {
            //console.log(this._determineCrossing(0,10,10,0,0,0,30,30));
            //adjusting the world timescale, depending on rerendertime of previous step
            this.adjusteTimeScale();
            //progress the world
            if (this._timeStarted && this._tickInterval !== 0) {
                this.progressWorld();
            }
            //calculating the ticklength
            this.calculateTickLength();
            //console.log('Advancing:', this._tickInterval, this._timeScale);
            //rerun the whole thing as fast as possible
            if (this._timeStarted) {
                window.requestAnimationFrame(this.start.bind(this));
            }
        };
        World.prototype.adjusteTimeScale = function () {
            if (this._tickInterval !== 0 && this._timeStarted) {
                this._timeScale = (this._tickInterval / this._timeBase);
            }
        };
        World.prototype.calculateTickLength = function () {
            if (this._beginTime === 0 && this._timeStarted) {
                this._beginTime = Date.now();
            }
            else if (this._beginTime !== 0) {
                var now = Date.now();
                this._tickInterval = now - this._beginTime;
                this._beginTime = now;
            }
        };
        World.prototype.progressWorld = function () {
            var _this = this;
            this._movableWorldObjects.forEach(function (object) {
                var t = _this._timeScale;
                //velocity & position:
                object.moveCoordinates(t);
                _this.detectStaticHit(object);
                console.log(object.center);
            });
            this.renderObjects();
        };
        World.prototype.detectStaticHit = function (movObject) {
            this._notMovableWorldObjects.forEach(function (staticObject) {
                if (movObject instanceof Core.Rectangle) {
                    var isOnplaneHeight = ((movObject.y + movObject.h >= staticObject.y) && (movObject.y < staticObject.y));
                    var hitsBottom = (movObject.x < staticObject.x + staticObject.w) && (movObject.x + movObject.w) > staticObject.x;
                    if (isOnplaneHeight && hitsBottom) {
                        //console.log('hit!');
                        var newYv = -(movObject.vy) / (1.7);
                        movObject.y = staticObject.y - movObject.h;
                        if (Math.abs(-(movObject.vy) / (1.7)) < 3) {
                            newYv = 0;
                        }
                        var newXv = (-(movObject.vx) / (1.7));
                        //console.log('speed: ', newYv);
                        movObject.vy = newYv;
                        movObject.vx = ((movObject.vx) / (1.7));
                    }
                }
            });
        };
        World.prototype.stopTime = function () {
            this._timeStarted = false;
        };
        World.prototype.startTime = function () {
            this._timeStarted = true;
            this.start();
        };
        World.prototype.clearObject = function () {
        };
        World.prototype.renderObjects = function () {
            var _this = this;
            this._ctx.clearRect(0, 0, 1000, 750);
            this._notMovableWorldObjects.forEach(function (object) {
                _this._ctx.fillStyle = "#FF0500";
                _this._ctx.fillRect(object.x, object.y, object.w, object.h);
            });
            this._movableWorldObjects.forEach(function (object) {
                _this._ctx.fillStyle = "#AF0500";
                _this._ctx.fillRect(object.x, object.y, object.w, object.h);
            });
        };
        /**
         * @returns {string}
         */
        World.prototype.getName = function () {
            return this._name;
        };
        return World;
    })();
    Core.World = World;
})(Core || (Core = {}));
//# sourceMappingURL=World.js.map