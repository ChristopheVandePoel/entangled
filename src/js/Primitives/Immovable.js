var Core;
(function (Core) {
    var Immovable = (function () {
        function Immovable(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.createVertices();
        }
        Immovable.prototype.createVertices = function () {
            var result = [];
            result.push([this.x - this.w / 2, this.y - this.h / 2]);
            result.push([this.x + this.w / 2, this.y - this.h / 2]);
            result.push([this.x + this.w / 2, this.y + this.h / 2]);
            result.push([this.x - this.w / 2, this.y + this.h / 2]);
            this.vertices = result;
        };
        return Immovable;
    })();
    Core.Immovable = Immovable;
})(Core || (Core = {}));
//# sourceMappingURL=Immovable.js.map