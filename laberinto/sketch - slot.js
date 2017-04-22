function setup() {
    createCanvas(1000,600);
    
    //frame
    strokeWeight(4);
    stroke(0);
    rect(200,200,600,200);
    strokeWeight(2);
    line(400,200,400,400);
    line(600,200,600,400);
    

}

function draw() {
    textSize(180);
    image(twemoji.parse('\u2764\uFE0F'), 210, 370, 100, 100);
    //text(String.fromCodePoint(0x1F43B),210,370);	
  
}