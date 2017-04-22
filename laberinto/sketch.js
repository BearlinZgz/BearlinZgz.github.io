var w = 25, rows = 20, cols = 20;
var grid = [];
var current;
var stack = [];

var img;
var wallcolor;

var finished = false;
var showMaze = true;
var countdownFinished = 10;


function preload() {
  img = loadImage("assets/koala.jpg");
}

function setup() {
  createCanvas(cols * w, rows * w);
  frameRate(10);
  wallcolor = color(255,155,0);

  for (i = 0 ; i < rows ; i++) {
    grid[i] = [];
    for (j = 0 ; j < cols ; j++) {
      grid[i][j] = new Cell(i,j);
    }
  }

  current = grid[0][0];
  current.visited = true;
}

function draw() {
  //background(0);
  image(img, 0, 0);

  if(showMaze) {
    stroke(wallcolor);
    strokeWeight(2);
    line(0,0,0,height);
    line(0,height,width,height);

    for (i = 0 ; i < rows ; i++) {
      for (j = 0 ; j < cols ; j++) {
        grid[i][j].show();
      }
    }
    current.highlight();
  } else {
    textAlign(CENTER);
    textSize(32);
    stroke(0);
    strokeWeight(3);
    fill(wallcolor);
    text("I <3 KOALA", width/2, height - 37);
  }

  if (!finished) {
    var next = current.getUnvisitedNeighbour();
    if (next) {
      stack.push(current);
      removeWall(current, next);
      next.visited = true;
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    } else {
      finished = true;
    }
  } else {
    countdownFinished--;
    if (countdownFinished <= 0) showMaze = false;
  }

}

function removeWall(a,b) {
  if (a.i - b.i === 1) a.top = false;
  if (a.j - b.j === -1) a.right = false;
  if (a.i - b.i === -1) b.top = false;
  if (a.j - b.j === 1) b.right = false;
}

function Cell(i,j) {
  this.i = i;
  this.j = j;
  this.top = true;
  this.right = true;
  this.visited = false;

  this.show = function() {
    var x = j * w;
    var y = i * w;

    noStroke()
    fill(255,128,0,100);
    if(!this.visited) {
      //fill(255,255,255,255);
      fill(0);
      rect(x, y, w, w);
    }

    noFill();
    stroke(wallcolor);
    strokeWeight(2);
    //rect(x, y, w, w);
    if (this.top) line(x, y, x+w, y);
    if (this.right) line(x+w, y, x+w, y+w);
  }

  this.highlight = function() {
    var x = j * w;
    var y = i * w;

    noStroke()
    fill(127,0,225);
    rect(x, y, w, w);
  }

  this.getUnvisitedNeighbour = function() {
    var candidates = [];
    if (grid[i-1] && grid[i-1][j] && !grid[i-1][j].visited) candidates.push(grid[i-1][j]);
    if (grid[i] && grid[i][j+1] && !grid[i][j+1].visited) candidates.push(grid[i][j+1]);
    if (grid[i+1] && grid[i+1][j] && !grid[i+1][j].visited) candidates.push(grid[i+1][j]);
    if (grid[i] && grid[i][j-1] && !grid[i][j-1].visited) candidates.push(grid[i][j-1]);
    if (candidates.length === 0) return null;
    return random(candidates);

  }

}
