var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
        }
        Movable.prototype.moveCoordinates = function (t) {
            var newVy = this.vy + ((10) * t);
            var newY = (this.vy * t) + this.y;
            var newX = (this.vx * t) + this.x;
            this.vy = newVy;
            this.y = newY;
            this.x = newX;
            this.center = [(this.x + (this.w / 2)), (this.y + (this.h / 2))];
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
        }
        return Rectangle;
    })(Movable);
    Core.Rectangle = Rectangle;
})(Core || (Core = {}));
//# sourceMappingURL=Movable.js.map