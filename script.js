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
}



// player = new gameObject(1, 2, 10, 10, 'sdfsf');
// player.setX = 4;
// console.log(player.getImage);

// ctx.strokeStyle = 'red';
// ctx.strokeRect(100, 100, 50, 50);
