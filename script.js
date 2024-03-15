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
        this.#image = image;
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



// player = new gameObject(1, 2, 10, 10, 'sdfsf');
// player.setX = 4;
// console.log(player.getImage);

// ctx.strokeStyle = 'red';
// ctx.strokeRect(100, 100, 50, 50);
