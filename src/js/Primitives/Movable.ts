module Core {

    export class Movable {
        public x:number;
        public y:number;
        public w:number;
        public h:number;
        public vx:number;
        public vy:number;
        public center: Array<number>;
        public rot:number;
        public polar: Array<number>;

        public moveCoordinates(t:number) {
            let newVy = this.vy + ((10) * t);
            let newY = (this.vy * t) + this.y;
            let newX = (this.vx * t) + this.x;

            this.vy = newVy;
            this.y = newY;
            this.x = newX;
            this.center = [(this.x+(this.w/2)),(this.y+(this.h/2))];
        }

        constructor(x:number, y:number, w:number, h:number, vx:number = 0, vy:number = 0, rot:number = 0) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.vx = vx;
            this.vy = vy;
            this.center = [(x+(w/2)),(y+(h/2))];
            this.rot = rot;
        }
    }


    export class Rectangle extends Movable {
        constructor(x:number, y:number, w:number, h:number, vx:number = 0, vy:number = 0, rot:number = 0) {
            super(x, y, w, h, vx, vy, rot);
        }
    }
}