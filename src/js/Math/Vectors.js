var Core;
(function (Core) {
    var Vectors = (function () {
        function Vectors() {
        }
        Vectors.prototype.cross = function (vectorA, vectorB) {
            return (vectorA[0] * vectorB[1]) - (vectorA[1] * vectorB[0]);
        };
        Vectors.prototype.add = function (vectorA, vectorB) {
            return [vectorA[0] + vectorB[0], vectorA[1] + vectorB[1]];
        };
        Vectors.prototype.dot = function () {
        };
        Vectors.prototype.multiply = function (vector, scalar) {
            return [vector[0] * scalar, vector[1] * scalar];
        };
        Vectors.prototype.divide = function (vector, scalar) {
            return [vector[0] / scalar, vector[1] / scalar];
        };
        return Vectors;
    })();
    Core.Vectors = Vectors;
})(Core || (Core = {}));
//# sourceMappingURL=Vectors.js.map