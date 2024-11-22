const palette = [
    '#FF0000',
    '#FFD700',
    '#1E90FF',
    '#32CD32',
    '#8B4513',
    '#FF4500',
    '#800080',
    '#FF8C00',
    '#8B0000',
    '#F08080',
    '#FFA07A',
    '#ADFF2F',
    '#6495ED',
    '#D2691E',
    '#DA70D6'
];


let img;

function preload() {
    img = loadImage('letters2.png');
}

var gui;

var pixelSize = 7;
var outlineOn = false;
var pctRandom = 0.4;
var reset = false;
var madeOf = ['shapes', 'vs', 'copyrights', 'chaos'];
var speed = 2.4;

function setup() {
    let imgRatio = img.width / img.height;

    createCanvas(windowWidth - 100, windowWidth / imgRatio);

    img.resize(width, height);

    gui = createGui('bathwall_logo');

    gui.addGlobals('madeOf');
    gui.addGlobals('outlineOn');
    sliderRange(5, 15, 1);
    gui.addGlobals('pixelSize');
    sliderRange(0, 1, 0.05);
    gui.addGlobals('pctRandom');
    sliderRange(1, 5, 0.7);
    gui.addGlobals('speed');
    gui.addGlobals('reset');

    strokeWeight(0.3);
    textStyle(BOLD);
    ellipseMode(CORNER);
    angleMode(DEGREES);

    frameRate(10);
}

let numColsShowing = 0;
let colors = [];

function draw() {
    clear();

    if (reset) {
        numColsShowing = 0;
        colors = [];
        reset = false;
    }

    setupColors();

    for (let x = 0; x < width; x += pixelSize) {
        if (x / pixelSize >= numColsShowing) continue;

        for (let y = 0; y < height; y += pixelSize) {

            outlineOn ? stroke(0) : noStroke();
            fill(colors[x][y]);
            textSize(pixelSize + 2);
            translate(x, y);

            let colorful = colors[x][y] !== 'white' && colors[x][y] !== 'black';

            if (madeOf === 'vs' || (madeOf === 'chaos' && random() < 0.3)) {
                text('v', 0, 0);
            } else if (madeOf === 'copyrights' || (madeOf === 'chaos' && random() > 0.3 && random() < 0.6)) {
                text('©', 0, 0);
            } else {
                if (colorful) {
                    stroke(0);
                    fill('white');
                    rect(0, 0, pixelSize, pixelSize);
                    fill(colors[x][y]);
                    let offset = 3;
                    translate(offset / 2, offset / 2);
                    rect(0, 0, pixelSize - offset, pixelSize - offset);
                    translate(-offset / 2, -offset / 2);
                } else {
                    rect(0, 0, pixelSize, pixelSize);
                }
            }

            translate(-x, -y);
        }
    }

    if (numColsShowing < width / pixelSize) {
        numColsShowing += speed;
    }
}

function setupColors() {
    for (let x = 0; x < width; x += pixelSize) {
        if (!colors[x]) colors[x] = [];

        for (let y = 0; y < height; y += pixelSize) {

            if (!colors[x][y]) {
                let pixel = img.get(x, y);
                let hasColor = pixel.some(v => v !== 0);

                colors[x][y] = hasColor ? (random() < pctRandom ? random(palette) : 'black') : 'white';
            }
        }
    }
}

// ALLOW IMAGE UPLOAD , EDIT BLACK AND WHITE

// TODO: 
// 1. start out with it missing 10 px arbitratily..
// 		then make these pixels animate in one click at a time from left to right...
// 2. toggle for roundness of circles



