/// <reference path="../Primitives/Immovable.ts"/>
/// <reference path="../Primitives/Movable.ts"/>
/// <reference path="../utils/utils.ts"/>

module Core {

    export class World {

        private _name:string;

        private _ctx: CanvasRenderingContext2D;

        private _timeStarted: boolean  = false;

        private _movableWorldObjects: Array<Movable> = [];

        private _notMovableWorldObjects: Array<Immovable> = [];

        private _beginTime: number = 0;

        private _tickInterval: number = 0;

        private _timeScale: number = 1;

        private _timeBase : number = 150;

        private _determineCrossing : Function;

        /**
         * @param ctx
         * @param crossing
         */
        constructor(ctx: CanvasRenderingContext2D, crossing: Function) {
            this._ctx = ctx;
            this._determineCrossing = crossing;
        }

        public createImmovableObject(notMovable:Immovable) {
            this._notMovableWorldObjects.push(notMovable);
        }

        public createMovableObject(movable:Movable) {
            this._movableWorldObjects.push(movable);
        }

        public start(){

            //console.log(this._determineCrossing(0,10,10,0,0,0,30,30));

            //adjusting the world timescale, depending on rerendertime of previous step
            this.adjusteTimeScale();

            //progress the world
            if(this._timeStarted && this._tickInterval !== 0) {
                this.progressWorld();
            }

            //calculating the ticklength
            this.calculateTickLength();


            //console.log('Advancing:', this._tickInterval, this._timeScale);

            //rerun the whole thing as fast as possible
            if (this._timeStarted) {
                window.requestAnimationFrame(this.start.bind(this));
            }
        }

        public adjusteTimeScale() {
            if (this._tickInterval !== 0 && this._timeStarted) {
                this._timeScale = (this._tickInterval / this._timeBase );
            }
        }

        public calculateTickLength() {
            if (this._beginTime === 0 && this._timeStarted) {
                this._beginTime = Date.now();
            }else if(this._beginTime !== 0) {
                let now = Date.now();
                this._tickInterval = now - this._beginTime;
                this._beginTime = now;
            }
        }

        public progressWorld() {
            this._movableWorldObjects.forEach((object) => {
                let t = this._timeScale;

                //velocity & position:

                object.moveCoordinates(t);

                this.detectStaticHit(object);
                //console.log(object.vertices);
            });


            this.renderObjects();
        }

        public detectStaticHit(movObject: Movable) {
            this._notMovableWorldObjects.forEach((staticObject) => {

            })
        }

        public stopTime() {
            this._timeStarted = false;
        }
        public startTime() {
            this._timeStarted = true;
            this.start();
        }

        public clearObject() {

        }

        public renderObjects() {
            this._ctx.clearRect(0,0,1000,750);
            this._notMovableWorldObjects.forEach((object) => {
                let ctx = this._ctx;

                // to be refactored
                ctx.beginPath();
                let startPoint = object.vertices[0];
                let that = this;
                ctx.moveTo(startPoint[0], startPoint[1]);
                object.vertices.forEach((coords, i) => {
                    if (i !== 0) {
                        ctx.lineTo(coords[0], coords[1]);
                    }
                }, ctx);
                ctx.lineTo(startPoint[0], startPoint[1]);
                ctx.stroke();

                ctx.fillStyle = ("black");
            });
            this._movableWorldObjects.forEach((object) => {
                let ctx = this._ctx;

                // to be refactored
                ctx.beginPath();
                let startPoint = object.vertices[0];
                let that = this;
                ctx.moveTo(startPoint[0], startPoint[1]);
                object.vertices.forEach((coords, i) => {
                    if (i !== 0) {
                        ctx.lineTo(coords[0], coords[1]);
                    }
                }, ctx);
                ctx.lineTo(startPoint[0], startPoint[1]);
                ctx.stroke();

                ctx.fillStyle = ("black");
                ctx.fillRect(object.center[0]-1, object.center[1]-1, 3, 3);

            });
        }

        /**
         * @returns {string}
         */
        public getName() {
            return this._name;
        }
    }
}