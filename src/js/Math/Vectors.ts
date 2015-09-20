module Core {
    export class Vectors{

        public cross(vectorA,vectorB) {
            return (vectorA[0] * vectorB[1]) - (vectorA[1] * vectorB[0]);
        }

        public add(vectorA,vectorB) {
            return [vectorA[0] + vectorB[0] , vectorA[1] + vectorB[1]];
        }

        public dot() {

        }

        public multiply(vector, scalar) {
            return [ vector[0] * scalar, vector[1] * scalar ];
        }

        public divide(vector, scalar) {
            return [ vector[0] / scalar, vector[1] / scalar ];
        }
    }
}