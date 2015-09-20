var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../Math/Vectors.ts"/>
var Core;
(function (Core) {
    var Movable = (function () {
        function Movable(x, y, w, h, vx, vy, rot) {
            if (vx === void 0) { vx = 0; }
            if (vy === void 0) { vy = 0; }
            if (rot === void 0) { rot = 0; }
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.vx = vx;
            this.vy = vy;
            this.center = [(x + (w / 2)), (y + (h / 2))];
            this.rot = rot;
            this._vectors = new Core.Vectors();
        }
        //this method has to dissapear eventually, or at least be transformed to simply
        //calculate centerpoint coordinates and speeds
        Movable.prototype.moveCoordinates = function (t) {
            var newVy = this.vy + ((10) * t);
            this.vy = newVy;
            this.center = [(this.x + (this.w / 2)), (this.y + (this.h / 2))];
            this.moveVertices(t);
        };
        Movable.prototype.moveVertices = function (t) {
            var _this = this;
            this.vertices.forEach(function (vertice) {
                var newX = (_this.vx * t) + vertice[0];
                var newY = (_this.vy * t) + vertice[1];
                //console.log(this.vx, this.vy);
                vertice[0] = newX;
                vertice[1] = newY;
            });
            this.getCenter();
        };
        Movable.prototype.getCenter = function () {
            var center = [0, 0];
            var Vectors = this._vectors;
            var area = this.getArea();
            for (var i = 0; i < this.vertices.length; i++) {
                var j = (i + 1) % this.vertices.length;
                var cross = Vectors.cross(this.vertices[i], this.vertices[j]);
                var temp = Vectors.multiply(Vectors.add(this.vertices[i], this.vertices[j]), cross);
                center = Vectors.add(center, temp);
            }
            center = Vectors.divide(center, 6 * area);
            this.center = center;
            //console.log(center);
        };
        Movable.prototype.getArea = function () {
            var area = 0;
            var j = this.vertices.length - 1;
            for (var i = 0; i < this.vertices.length; i++) {
                area += (this.vertices[j][0] - this.vertices[i][0]) * (this.vertices[j][1] + this.vertices[i][1]);
                j = i;
            }
            return area / 2;
        };
        Movable.prototype.rotateVertices = function (t) {
            this.vertices.forEach(function (vertice) {
            });
        };
        Movable.prototype.getVertices = function () {
            return this.vertices;
        };
        return Movable;
    })();
    Core.Movable = Movable;
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(x, y, w, h, vx, vy, rot) {
            if (vx === void 0) { vx = 0; }
            if (vy === void 0) { vy = 0; }
            if (rot === void 0) { rot = 0; }
            _super.call(this, x, y, w, h, vx, vy, rot);
            this.createVertices();
            this.center = [x, y];
        }
        Rectangle.prototype.createVertices = function () {
            var result = [];
            result.push([this.x - this.w / 2, this.y - this.h / 2]);
            result.push([this.x + this.w / 2, this.y - this.h / 2]);
            result.push([this.x + this.w / 2, this.y + this.h / 2]);
            result.push([this.x - this.w / 2, this.y + this.h / 2]);
            this.vertices = result;
        };
        return Rectangle;
    })(Movable);
    Core.Rectangle = Rectangle;
})(Core || (Core = {}));
//# sourceMappingURL=Movable.js.map