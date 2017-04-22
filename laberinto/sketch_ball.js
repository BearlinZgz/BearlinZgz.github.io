//var cx = 100, cy = 100;
//var csize = new Oscilator(0,32,1/2);
var cx, cy;

var colour = {
    r: 0,
    g: 128,
    b: 255
}

function changeColour() {
    colour.r = random(0,255);
    colour.g = random(0,255);
    colour.b = random(0,255);
}

function setup() {
    createCanvas(1000,600);
    cx = new Oscilator(25, width -25, 4, 50, changeColour);
    cy = new Oscilator(25, height - 25, 2, 50, changeColour);


}

function draw() {
    background(255,255,170, 255);
    
    noStroke();
    fill(colour.r, colour.g, colour.b);
    ellipse(cx.get(), cy.get(), 50, 50);
    cx.next();
    cy.next();
    
    /*
    cx = (cx + 4 >= width + 50)? -50 : cx + 4;
    cy = (cy + 2 >= height + 50)? -50 : cy + 2;
    */
    
    
  
}

function Oscilator(from, to, step, value, impact) {
    this.from = from;
    this.to = to;
    this.step = step;
    this.value = (value != null)? value : from;
    
    this.direction ="up";
    this.impact = impact;
}

Oscilator.prototype.get = function() { return this.value; }

Oscilator.prototype.next = function() { 
    if (this.direction === "up") {
        if (this.value < this.to) {
            this.value += this.step;
        } else {
            this.direction = "down";
            this.value -= this.step;
            if (this.impact) this.impact();
            
        }
    } else if (this.direction === "down") {
        if (this.value > this.from) {
            this.value -= this.step;
        } else {
            this.direction = "up";
            this.value += this.step;
            if (this.impact) this.impact();
        }
    }
    
    return this.value;
}

