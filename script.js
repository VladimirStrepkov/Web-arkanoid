const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class gameObject {
    #x;
    #y;
    #width;
    #height;
    #image;

    constructor (x, y, width, height, image) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#image = new Image();
        this.#image.src = image;
    }

    get getX() {
        return this.#x;
    }
    set setX(value) {
        this.#x = value;
    }

    get getY() {
        return this.#y;
    }
    set setY(value) {
        this.#y = value;
    }

    get getWidth() {
        return this.#width;
    }

    get getHeight() {
        return this.#height;
    }

    get getImage() {
        return this.#image;
    }

    static rectIntersection(gameObject1, gameObject2) {
        const x1 = gameObject1.getX
        const y1 = gameObject1.getY
        const w1 = gameObject1.getWidth
        const h1 = gameObject1.getHeight

        const x2 = gameObject2.getX
        const y2 = gameObject2.getY
        const w2 = gameObject2.getWidth
        const h2 = gameObject2.getHeight

        if (x2 + w2 < x1 || x2 > x1 + w1 || y2 + h2 < y1 || y2 > y1 + h1) {
            return false;
        } else {
            return true;
        }
    }
}

const player = new gameObject(565, 640, 100, 30, 'images/playerSprite.png');
playerSpeed = 5;

const ball = new gameObject(1000, 100, 15, 15, 'images/ballSprite.png');
let ballSpeed = 4;
let ballDirectionVector = [-1, 1];

const walls = [];
const bricks = [];

let scores = 0;

const levels = [];
levels.push(
    [
     '################################',
     '#                              #',
     '#                              #',
     '#                              #',
     '#      *                *      #',
     '#                              #',
     '#                              #',
     '#                              #',
     '#                              #',
     '#               0              #',
     '#                              #',
     '#                              #',
     '#                              #',
     '#                              #',
     '#                              #',
     '#                              #',
     '#             p                #',
     '#                              #',
    ]
)
levels.push(
    [
     '################################',
     '#     * * * * * * * * * *      #',
     '#                              #',
     '#                              #',
     '#               0              #',
     '#                              #',
     '#                              #',
     '#                              #',
     '#                              #',
     '#       #######                #',
     '#                              #',
     '#                              #',
     '#             p                #',
     '#                              #',
     '#                              #',
     '#                              #',
     '#     ###      ######          #',
     '#                              #',
    ]
)
let numLevel = 0;

ctx.font = "48px serif";


let playerDirRight = false;
let playerDirLeft = false;
document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyA') playerDirLeft = true;
    else if (event.code === 'KeyD') playerDirRight = true;
})
document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyA') playerDirLeft = false;
    else if (event.code === 'KeyD') playerDirRight = false;
})


let ballLeftCollision = false;
let ballRightCollision = false;
let ballTopCollision = false;
let ballBottomCollision = false;
function ballCollision(obj) {
    if (ball.getX <= obj.getX) ballRightCollision = true;
    if (ball.getX + ball.getWidth >= obj.getX + obj.getWidth) ballLeftCollision = true;

    if (ball.getY <= obj.getY) ballBottomCollision = true;
    if (ball.getY + ball.getHeight >= obj.getY + obj.getHeight) ballTopCollision = true;
}

function gameObjectPlacement(level) {
    let numberColorBricks = 0;
    let imageBrick;
    for (let i = 0; i < level.length; i++) {
        for (let j = 0; j < level[0].length; j++) {
            if (level[i][j] === '#') {
                walls.push(new gameObject(40 * j, 40 * i, 40, 40, 'images/wallSprite.png'));
            }
            else if (level[i][j] === '*') {
                if (numberColorBricks == 0) imageBrick = 'images/blueBrickSprite.png';
                else if (numberColorBricks == 1) imageBrick = 'images/pinkBrickSprite.png';
                else if (numberColorBricks == 2) imageBrick = 'images/yellowBrickSprite.png';
                numberColorBricks++;
                numberColorBricks %= 3;
                bricks.push(new gameObject(40 * j, 40 * i, 80, 40, imageBrick))
            }
            else if (level[i][j] === 'p') {
                player.setX = 40 * j;
                player.setY = 40 * i;
            }
            else if (level[i][j] == '0') {
                ball.setX = 40 * j;
                ball.setY = 40 * i;
            }
        }
    }
}


function oneFrameGameCycle() {
    // ОбРАБОТКА ИГРОВЫХ СОБЫТИЙ

    if (playerDirLeft) {
        player.setX = player.getX - playerSpeed;
        if (gameObject.rectIntersection(player, ball) && ball.getX - playerSpeed < player.getX) ball.setX = player.getX - ball.getWidth;

    } else if (playerDirRight) {
        player.setX = player.getX + playerSpeed;
        if (gameObject.rectIntersection(player, ball) 
        && ball.getX + ball.getWidth + playerSpeed > player.getX + player.getWidth) ball.setX = player.getX + player.getWidth;
    }
    if (player.getX < 40) player.setX = 40;
    if (player.getX + player.getWidth + 40 > 1280) player.setX = 1280 - 40 - player.getWidth;

    if (gameObject.rectIntersection(player, ball)) ballCollision(player);
    for (let i = 0; i < walls.length; i++) if (gameObject.rectIntersection(walls[i], ball)) ballCollision(walls[i]);
    for (let i = 0; i < bricks.length; i++) if (gameObject.rectIntersection(bricks[i], ball)) {
        ballCollision(bricks[i]);
        scores++;
        bricks.splice(i, 1);
    }
    
    if (ballBottomCollision && ballTopCollision && ballRightCollision && ballLeftCollision) {
        ballDirectionVector[0] = -ballDirectionVector[0];
        ballDirectionVector[1] = -ballDirectionVector[1];
    }
    else if (ballRightCollision && ballLeftCollision && ballBottomCollision) ballDirectionVector[1] = -1;
    else if (ballRightCollision && ballLeftCollision && ballTopCollision)ballDirectionVector[1] = 1;
    else if (ballTopCollision && ballBottomCollision && ballLeftCollision) ballDirectionVector[0] = 1;
    else if (ballTopCollision && ballBottomCollision && ballRightCollision) ballDirectionVector[0] = -1;
    else if (ballBottomCollision && ballLeftCollision) ballDirectionVector = [1, -1];
    else if (ballBottomCollision && ballRightCollision) ballDirectionVector = [-1, -1];
    else if (ballTopCollision && ballLeftCollision) ballDirectionVector = [1, 1];
    else if (ballTopCollision && ballRightCollision) ballDirectionVector = [-1, 1];
    else if (ballBottomCollision) ballDirectionVector[1] = -1;
    else if (ballTopCollision) ballDirectionVector[1] = 1;
    else if (ballLeftCollision) ballDirectionVector[0] = 1;
    else if (ballRightCollision) ballDirectionVector[0] = -1;

    if (ballBottomCollision || ballTopCollision || ballRightCollision || ballLeftCollision) {
        if (Math.abs(ballDirectionVector[0] > 0.2)) ballDirectionVector[0] *= Math.random() * (1 - 0.9) + 0.9;
        if (Math.abs(ballDirectionVector[1] > 0.2)) ballDirectionVector[1] *= Math.random() * (1 - 0.9) + 0.9;
    }
    ballLeftCollision = false;
    ballRightCollision = false;
    ballTopCollision = false;
    ballBottomCollision = false;

    let hypotenuse = (ballDirectionVector[0] ** 2 + ballDirectionVector[1] ** 2) ** 0.5;
    ball.setX = ball.getX + ballSpeed * ballDirectionVector[0] / hypotenuse;
    ball.setY = ball.getY + ballSpeed * ballDirectionVector[1] / hypotenuse;


    // ОТРИСОВКА КАДРА
    ctx.fillStyle = '#ACB78E';
    ctx.fillRect(0, 0, 1280, 720);

    ctx.drawImage(player.getImage, player.getX, player.getY);
    ctx.drawImage(ball.getImage, ball.getX, ball.getY);
    for (let i = 0; i < walls.length; i++) {
        ctx.drawImage(walls[i].getImage, walls[i].getX, walls[i].getY);
    }
    for (let i = 0; i < bricks.length; i++) {
        ctx.drawImage(bricks[i].getImage, bricks[i].getX, bricks[i].getY);
    }

    ctx.fillStyle = 'red';
    ctx.fillText(`Очки: ${scores}`, 50, 100);

    // Смена уровня
    if (bricks.length == 0 && numLevel < levels.length - 1) {
        numLevel++;
        walls.splice(0, walls.length)
        gameObjectPlacement(levels[numLevel]);
    }
    // Перезапуск уровня
    if (ball.getX > 1380 || ball.getX < -100 || ball.getY > 820 || ball.getY < -100) {
        scores = 0;
        walls.splice(0, walls.length)
        bricks.splice(0, bricks.length)
        gameObjectPlacement(levels[numLevel]);
    }
}
setInterval(oneFrameGameCycle, 10)

gameObjectPlacement(levels[0])