/// <reference path="../Math/Vectors.ts"/>
module Core {

    export class Movable {
        //will be refactored, because height and width are not necessary for rendering
        // we need in first instance, the centerpoint for velocity and vertices for rendering
        public x:number;
        public y:number;
        public w:number;
        public h:number;
        public vx:number;
        public vy:number;
        public center: Array<number>;
        public rot:number;
        public vertices: Array<Object>;
        private _vectors: Vectors;

        constructor(x:number, y:number, w:number, h:number, vx:number = 0, vy:number = 0, rot:number = 0) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.vx = vx;
            this.vy = vy;
            this.center = [(x+(w/2)),(y+(h/2))];
            this.rot = rot;
            this._vectors = new Vectors();
        }

        //this method has to dissapear eventually, or at least be transformed to simply
        //calculate centerpoint coordinates and speeds
        public moveCoordinates(t:number) {
            let newVy = this.vy + ((10) * t);

            this.vy = newVy;
            this.center = [(this.x+(this.w/2)),(this.y+(this.h/2))];
            this.moveVertices(t);
        }

        public moveVertices(t:number) {
            this.vertices.forEach((vertice)=> {

                let newX = (this.vx*t) + vertice[0];
                let newY = (this.vy*t) + vertice[1];
                //console.log(this.vx, this.vy);

                vertice[0] = newX;
                vertice[1] = newY;
            });

            this.getCenter();
        }

        public getCenter() {
            let center = [0,0];
            let Vectors = this._vectors;
            let area = this.getArea();
            for (var i = 0; i < this.vertices.length; i++) {
                let j = (i + 1) % this.vertices.length;
                let cross = Vectors.cross(this.vertices[i], this.vertices[j]);
                let temp = Vectors.multiply(Vectors.add(this.vertices[i], this.vertices[j]), cross);
                center = Vectors.add(center, temp);
            }

            center = Vectors.divide(center, 6 * area);

            this.center = center;
            //console.log(center);
        }

        public getArea() {
            let area = 0;
            let j = this.vertices.length - 1;

            for (var i = 0; i < this.vertices.length; i++) {
                area += (this.vertices[j][0] - this.vertices[i][0]) * (this.vertices[j][1] + this.vertices[i][1]);
                j = i;
            }

            return area / 2;
        }

        public rotateVertices(t:number) {
            this.vertices.forEach((vertice)=> {

            })
        }

        public getVertices() {
            return this.vertices;
        }
    }


    export class Rectangle extends Movable {
        constructor(x:number, y:number, w:number, h:number, vx:number = 0, vy:number = 0, rot:number = 0) {
            super(x, y, w, h, vx, vy, rot);
            this.createVertices();
            this.center = [x,y];
        }

        public createVertices() {
            let result = [];

            result.push([this.x - this.w/2 ,this.y - this.h/2]);
            result.push([this.x + this.w/2 ,this.y - this.h/2]);
            result.push([this.x + this.w/2 ,this.y + this.h/2]);
            result.push([this.x - this.w/2 ,this.y + this.h/2]);

            this.vertices = result;
        }
    }
}