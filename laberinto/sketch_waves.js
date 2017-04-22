var endArc = new Interval(0,1,1/120);

var gayColours = {
    red : {r:228, g:3, b:3},
    orange : {r:255, g:140, b:0},
    yellow : {r:255, g:237, b:0},
    green : {r:0, g:128, b:38},
    blue : {r:0, g:77, b:255},
    purple : {r:117, g:7, b:13}
}
var rainbow = [gayColours.red, gayColours.orange, gayColours.yellow, gayColours.green, gayColours.blue, gayColours.purple];
var waves = [];


function setup() {
    createCanvas(1000,600);
    strokeWeight(4);
    var reverseRainbow = rainbow.slice(0).reverse();
    for (var i = 0; i<6; i++) {
        waves.push(new Wave(width/2, height/2, 50 + 50*i, reverseRainbow.slice(0,i+1)));
    }    
}

function draw() {
    background(255);
    waves.forEach(w => w.draw());  
}

function Wave(x, y, size, colours) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.colours = colours;
    
    this.done = false;
    this.cindex = 0;
    this.arcLength = new Interval(0,1,1/120);
    
}

Wave.prototype.draw = function() {
    noFill();
    
    
    if (this.cindex > 0) {
        var prevColour = this.colours[this.cindex - 1];
        stroke(prevColour.r, prevColour.g, prevColour.b);
        ellipse(this.x, this.y, this.size, this.size);
    }
    if (this.done === false) {
        var colour = this.colours[this.cindex];
        stroke(colour.r, colour.g, colour.b);
        arc(this.x, this.y, this.size, this.size, -HALF_PI, -HALF_PI + this.arcLength.next()*TWO_PI);
        if(this.arcLength.growing === false) {
            this.cindex++;
            this.arcLength = new Interval(0,1,1/120);
            if (this.cindex >= this.colours.length) this.done = true;
        }
    }
      

    
}



function Interval(from, to, step) {
    this.from = from;
    this.to = to;
    this.step = step;
    
    this.value = from;
    this.growing = true;
    
}

Interval.prototype.next = function() {
    if (this.growing) {
        if (this.value + this.step >= this.to) {
            this.value = this.to;
            this.growing = false;
        } else {
            this.value = this.value + this.step;
        }
        
    }
    return this.value;
    
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

