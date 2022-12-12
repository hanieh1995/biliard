////load assets///
let sprites = [];
let assetsStillLoading = 0;

function loadSprite(fileName) {
    assetsStillLoading++;

    let spriteImage = new Image()
    spriteImage.src = "./assets/sprites/" + fileName;

    spriteImage.addEventListener("load", function () {
        assetsStillLoading--;
    })

    return spriteImage;
}

function loadAssets(callback) {
    sprites.background = loadSprite("backgrund.png");
    sprites.whiteBall = loadSprite("ball.png");
    sprites.stick = loadSprite("stick.png");

    assetsLoadingLoop(callback);
}

function assetsLoadingLoop(callback){
    if(assetsStillLoading){
        requestAnimationFrame(assetsLoadingLoop.bind(this , callback))
    }else{
        callback()
    }
}

/////

//vector 
function Vector(x = 0, y = 0) {
    this.x = 0;
    this.y = 0;
}

Vector.prototype.copy = function () {
    return new Vector(this.x, this.y)
}

Vector.prototype.length = function (value) {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
}

Vector.prototype.mult = function (value) {
    return new Vector(this.x + value, this.y + value)
}

Vector.prototype.addTo = function (vector) {
    this.x += vector.x;
    this.y += vector.y;
}

////


//canvas
function Canvas2D() {
    this._canvas = document.getElementById("screen");
    this.ctx = this._canvas.getContext("2d");
}

Canvas2D.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this._canvas.clientWidth, this._canvas.clientHeight)
};
Canvas2D.prototype.drawImage = function (image, position = new Vector(), origin = new Vector(), rotation = 0) {
    this.ctx.save();
    this.ctx.translate(position.x, position.y)
    this.ctx.rotate(rotation)
    this.ctx.drawImage(image, -origin.x, -origin.y)
    this.ctx.restore()
};

let Canvas = new Canvas2D();
////////

////game world////
function GameWorld() {

}

GameWorld.prototype.update = function () {

}

GameWorld.prototype.draw = function () {
    Canvas.drawImage(sprites.background)
}

let gameworld = new GameWorld()

/////

function animate() {
    Canvas.clear();
    gameworld.update();
    gameworld.draw();
    requestAnimationFrame(animate);
}

loadAssets(animate);