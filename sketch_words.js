var pagex = 1260;
var pagey = 660;

var words;
var table1;
var selectedtype = " ";

function preload() {
  table1 = loadTable("data/subjectivity.csv", "header");
  font = loadFont('./assets/Arial.ttf');
  crowd = loadSound('data/speechiness.mp3');
}

function setup() {
  createCanvas(pagex,pagey); 
  loadWords(table1);
}

function loadWords(table) {
   
    words = []; 
  
    
    for (var i = 0; i < table.getRowCount(); i++) {
      var curr = table.getRow(i);
      // You can access the fields via their column name (or index)
      var score = parseInt(curr.get("score"));
      var adj = curr.get("adj");
      var freq = parseInt(curr.get("freq"))+30;
      var rsubj = parseInt(curr.get("rsubj"));
      var lsubj = parseInt(curr.get("lsubj"));
      var speechiness = parseFloat(curr.get("speechiness"));

      var type = curr.get("type");

      var subjin;
      if(type=="lyrics"){
        subjin=lsubj;
      }
      else{
        subjin=rsubj;
      }

      var index = i%10;
      var yval = random(index*pagey/10 +5,(index+1)*pagey/10-5);


      var yinit = random(0,pagey);
      var bbox = font.textBounds(adj, subjin, yval, freq);
      
      words[i] = new Word(subjin+random(-10,10),yval,adj, freq, type,score, speechiness);
    }
}

class Word {
    constructor(x, y, adj, freq, type,score, speechiness) {
      this.x = x;
      this.y = y;
      this.adj = adj;
      this.freq = freq;
      this.type = type;
      this.score = score;
      this.speechiness = speechiness;
    }
  
    // // Checking if mouse is over the Bubble
    // rollover(px, py) {
    //   var d = dist(px, py, this.x, this.y);
    //   if (d < this.diameter/2) {
    //     this.over = true;
    //   } else {
    //     this.over = false;
    //   }
    // }
  
    display() {
      textSize(this.freq/3);
      if(this.type=="review"){
          textFont("Bradley Hand");
          fill(185, 49, 79)
      }
      else{
          textFont("Arial");
          fill(65, 51, 122);
      }
    
      text(this.adj, this.x, this.y);
      
    //   if (this.over) {
    //     textAlign(CENTER);
    //     noStroke();
    //     fill(0);
    //     text(this.name, this.x, this.y + this.diameter/2 + 20);
    //   }
    }

    // move(){
    //     this.x += this.speed;
    //     if(this.x > width){
    //         this.x = 0;
    //     }
    // }
}


function keyPressed() {
  if(keyCode-48==selectedtype){
    selectedtype="";
    crowd.stop();
  }
  else{
    selectedtype = keyCode-48
    crowd.play();
    for (var i = 0; i < words.length; i++) {
      if(words[i].score==selectedtype){
        // console.log(words[i].speechiness*10);
        masterVolume(words[i].speechiness);
        break;
      }
    }
    
  }
  

}


function draw() {
    background(194, 234, 210);
    // console.log(mouseX)
    // console.log(mouseX)

    push();
    textSize(20);
    fill("black");
    textFont("Arial");
    text("displaying score: "+selectedtype,0,21)
    textSize(12);
    text("Review Red, Lyrics Blue",0,41)
    pop();

    push();
    fill("black");
    textFont("Arial");
    textAlign(CENTER);
    textSize(14);
    text("more",(3/4)*pagex+30,640);
    text("less",pagex/4-30,640);
    text("subjective",pagex/2,640);
    pop();

  
    for (var i = 0; i < words.length; i++) {
      if(words[i].score==selectedtype){
        words[i].display();
      }
    }
  
  
  }