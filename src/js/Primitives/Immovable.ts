module Core {
    export class Immovable{
        public x:number;
        public y:number;
        public w:number;
        public h:number;
        public vertices: Array<Object>;

        constructor(x:number,y:number,w:number, h:number) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.createVertices();
        }

        public createVertices() {
            let result = [];
            //needs refactoring to vector in stead of just points
            result.push([this.x - this.w/2 ,this.y - this.h/2]);
            result.push([this.x + this.w/2 ,this.y - this.h/2]);
            result.push([this.x + this.w/2 ,this.y + this.h/2]);
            result.push([this.x - this.w/2 ,this.y + this.h/2]);

            this.vertices = result;
        }
    }
}