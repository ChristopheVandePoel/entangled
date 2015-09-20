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
                //console.log(object.vertices);
            });
            this.renderObjects();
        };
        World.prototype.detectStaticHit = function (movObject) {
            this._notMovableWorldObjects.forEach(function (staticObject) {
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
                var ctx = _this._ctx;
                // to be refactored
                ctx.beginPath();
                var startPoint = object.vertices[0];
                var that = _this;
                ctx.moveTo(startPoint[0], startPoint[1]);
                object.vertices.forEach(function (coords, i) {
                    if (i !== 0) {
                        ctx.lineTo(coords[0], coords[1]);
                    }
                }, ctx);
                ctx.lineTo(startPoint[0], startPoint[1]);
                ctx.stroke();
                ctx.fillStyle = ("black");
            });
            this._movableWorldObjects.forEach(function (object) {
                var ctx = _this._ctx;
                // to be refactored
                ctx.beginPath();
                var startPoint = object.vertices[0];
                var that = _this;
                ctx.moveTo(startPoint[0], startPoint[1]);
                object.vertices.forEach(function (coords, i) {
                    if (i !== 0) {
                        ctx.lineTo(coords[0], coords[1]);
                    }
                }, ctx);
                ctx.lineTo(startPoint[0], startPoint[1]);
                ctx.stroke();
                ctx.fillStyle = ("black");
                ctx.fillRect(object.center[0] - 1, object.center[1] - 1, 3, 3);
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