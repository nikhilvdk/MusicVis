var pagex;
var pagey;
var selectedtype;
var allmove;

var xclick;
var yclick;

var reviews;
var table1;

function preload() {
  table1 = loadTable("data/happiness.csv", "header");
  font = loadFont('./assets/Arial.ttf');
  pencil = loadImage('./images/pencil.png');

  music_1 = loadImage('./images/music_1.png');
  music_2 = loadImage('./images/music_2.png');
  music_3 = loadImage('./images/music_3.png');
  music_4 = loadImage('./images/music_4.png');
  music_5 = loadImage('./images/music_5.png');
  music_6 = loadImage('./images/music_6.png');
  music_7 = loadImage('./images/music_7.png');
  music_8 = loadImage('./images/music_8.png');
  music_9 = loadImage('./images/music_9.png');

  lyr_1 = loadImage('./images/lyr_1.png');
  lyr_2 = loadImage('./images/lyr_2.png');
  lyr_3 = loadImage('./images/lyr_3.png');
  lyr_4 = loadImage('./images/lyr_4.png');
  lyr_5 = loadImage('./images/lyr_5.png');
  lyr_6 = loadImage('./images/lyr_6.png');
  lyr_7 = loadImage('./images/lyr_7.png');
  lyr_8 = loadImage('./images/lyr_8.png');
  lyr_9 = loadImage('./images/lyr_9.png');
}

function setup() {
    pagex = windowWidth;
    pagey = windowHeight;
    createCanvas(pagex,pagey); 
    // loadWords(table1);
}

function loadWords(table) {
   
    reviews = []; 
    lyrics = []; 
    
    for (var i = 0; i < table.getRowCount(); i++) {
      var curr = table.getRow(i);
      // You can access the fields via their column name (or index)
      var score = parseInt(curr.get("score"));
      var r_pol = parseInt(curr.get("r_pol"));
      var l_pol = parseInt(curr.get("l_pol"));
      var valence = parseFloat(curr.get("valence"));
      var song = curr.get("song");


      var musicdisp=window["music_"+score];
      var lyrdisp = window["lyr_"+score];
      
      reviews[i] = new Word(random((score-1)*pagex/9 + 3,score*pagex/9 - 3),r_pol, valence, score,musicdisp,"rev",song);
      lyrics[i] = new Word(random((score-1)*pagex/9 + 3,score*pagex/9 - 3),l_pol, valence, score,lyrdisp,"lyr",song);

    }
}

class Word {
    constructor(x, y, valence,score, imagedisp, type,song) {
      this.x = x;
      this.y = y;
      this.valence = valence;
      this.score = score;
      this.type = type;
      this.imagedisp = imagedisp;
      this.song = song;
      this.click=false;
      this.over=false;
    }
  
  
    // Display the Adj
    display() {
      push();
      strokeWeight(1);
      imageMode(CENTER);
      image(this.imagedisp,this.x,this.y,15,15);
      pop();   
    
      if (this.over) {
        console.log("HERE")
        push();
        textAlign(CENTER);
        noStroke();
        fill(0);
        textSize(8);
        text(this.valence + "\n"+ this.song, this.x, this.y + 13);
        pop();
      }
    }

    mouseover(px, py) {
      var d = dist(px, py, this.x, this.y);
      if (d < 15/2) {
        this.over = true;
      } else {
        this.over = false;
      }
    }

    move(){
      var osc = 0.5 * cos(TWO_PI * frameCount / (20*(1+1/(this.valence*2))));
        this.y += osc;
    }
}
function keyPressed() {
  if (keyCode === 82) {
    selectedtype = "rev";
  }
   if (keyCode === 76) {
    selectedtype = "lyr";
  }
  if (keyCode === 65) {
    if(allmove){
      allmove=false;
    }
    else{
      allmove = true;
    }
  }

}

function mousePressed() {
  for (var i = 0; i < lyrics.length; i++) {
    var d = dist(mouseX, mouseY, lyrics[i].x, lyrics[i].y);
      if (d < 15/2) {
        if(lyrics[i].click==false){
          lyrics[i].click=true;
        }
        else{
          lyrics[i].click=false;
        }
        
      }       
  }

  for (var i = 0; i < reviews.length; i++) {
    var d = dist(mouseX, mouseY, reviews[i].x, reviews[i].y);
      if (d < 15/2) {
        if(reviews[i].click==false){
          reviews[i].click=true;
        }
        else{
          reviews[i].click=false;
        }
        
      }       
  }

}

function draw() {

    for(var i=1;i<3;i++){
      strokeWeight(3);
      line(i*pagex/3,0,i*pagex/3,pagey);
    }


}


  