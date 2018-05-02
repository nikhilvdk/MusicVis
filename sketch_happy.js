var pagex = 1260;
var pagey = 660;
var selectedtype;
var allmove;

var xclick;
var yclick;

var reviews;
var table1;

var pitch;
var spotify;
var textblob;

var see_n;
var see_p;

var posquestions = ["Are pitchfork's reviews as harsh and critical as everyone thinks?",
"Does having a cheerful song title indicate positive lyrics?",
"What are the distinguishable trends/differences between sentiment in lyrics and reviews?"];

var negquestions = ["Are sad songs given lower scores?",
"Can sad songs have a deceivingly happy melodies (high valence)?"];

function preload() {
  table1 = loadTable("data/happiness.csv", "header");
  font = loadFont('./assets/Arial.ttf');
  pencil = loadImage('./images/pencil.png');

  bg = loadImage("images/gradient.jpg");

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

  pitch = loadImage("images/pitchfork.png");
  spotify = loadImage("images/spotify.png");
  textblob = loadImage("images/textblob.png");
}

function setup() {
  createCanvas(pagex,pagey); 
  loadWords(table1);
}

function setup() {
  createCanvas(pagex,pagey); 
  loadWords(table1);

  mgr = new SceneManager();
  mgr.addScene ( Animation1 );
  mgr.addScene ( Animation2 );
  mgr.addScene ( Animation3 );
  mgr.showNextScene();
}

function draw(){
  mgr.draw();
  // console.log(facex,facey)
}

function mousePressed()
{
    mgr.mousePressed();

}

function keyPressed()
{
  mgr.keyPressed();
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


function Animation1(){
  var sel=0;
  this.draw = function(){
    push();
    noStroke();
    fill(145 ,168 ,208);
    rect(0, 0, pagex, pagey/2);
    fill(98, 113, 140);
    rect(0, 330, pagex, pagey/2);
    pop();

        push();
        translate(1000,430);
        textblob.resize(60,0);
        image(textblob,0,0);
        spotify.resize(60,0);
        image(spotify,80,-10);
        pitch.resize(60,0);
        image(pitch,170,-10);
        pop();
    
        textFont('Roboto');
        fill("white");
        textSize(62);
        text("Music Polarity", 10, 60);
        textSize(30);
        push();
        textStyle(ITALIC);
        text("What can we learn about positivity and happiness in lyrics & reviews?", 10, 100);
        textSize(20);
        text("What questions do you have? Toggle them by pressing Q (and try moving up and down)", 10, 130);
        pop();
        textSize(20);
        text("press next...",width-120,height-20)


        if(see_p){
          push();
          textAlign(CENTER);
          translate(100+facex,255);
          noStroke()
          var bbox = font.textBounds(posquestions[sel], 0,0, 30)
          ellipse(330,-10,bbox.w+10,bbox.h+30);
          fill("white")
          triangle(630, 10, 400, 10, 850,50)
          fill(95,75,139)
          textFont('Covered By Your Grace');
          textSize(30);
          text(posquestions[sel], 350,0)
          translate(-100-facex,-255);
          pop();
        }

        if(see_n){
          push();
          textAlign(CENTER);
          translate(200+facex,555);
          noStroke()
          var bbox = font.textBounds(negquestions[sel], 0,0, 30)
          ellipse(340,-10,bbox.w+6,bbox.h+30);
          fill("white")
          triangle(250, -38, 450, -38, 850,-200)
          fill(95,75,139)
          textFont('Covered By Your Grace');
          textSize(30);
          text(negquestions[sel], 350,0)
          translate(-100-facex,-255);
          pop();
        }

  }

  this.keyPressed = function(){
    if(keyCode==39){
      console.log("HERE")
      this.sceneManager.showNextScene();
    }

    if(keyCode==81){
      if(facey>27){
        see_n = true;
        see_p=false;
      }
      else{
        see_n=false;
        see_p=true;
      }
      
      var old = sel;
      while(sel==old){
        sel = Math.floor(Math.random()*2);
      }
      
    }

  }
  
}

function Animation2()
{
  this.setup = function(){
    document.getElementById('video').style.display = "none";
  }

    this.draw = function()
    {
        
    image(bg,0,0,pagex,pagey);
    // background(194, 234, 210);
    // console.log(mouseX)
    // console.log(mouseX)

      
        textAlign(CENTER);
        textFont('Roboto');
        fill("white");
        textSize(62);
        text("Observe each of the score categories", width / 2, 170);
        textSize(20);
        push();
        textStyle(ITALIC);
        text("Each bin is split into 'positive' and 'negative' halves.", width / 2, 250);
        text("Pens indicate reviews, music notes indicate lyrics", width / 2, 300);
        text("Hover over each data point to get song title, and valence (sonic happiness level)", width / 2, 350);
        text("Click on each point to have it dance to its corresponding valence level, or toggle A for all points", width / 2, 400);
        pop();
        textSize(20);
        fill("red")
        text("press next...",width-60,height-50)

        for(var i=1;i<10;i++){
          text(parseInt(i),(i-1)*pagex/9 + pagex/18 -8,650);
        }

    }

    this.keyPressed = function()
    {
      if(keyCode==39){
        this.sceneManager.showNextScene();
      }
    }

}



function Animation3(){

this.keyPressed = function(){
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

this.mousePressed = function() {
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

this.draw = function() {
    background(255);
    textSize(40);
    for(var i=1;i<10;i++){
      text(parseInt(i),(i-1)*pagex/9 + pagex/18 -6,650);
    }

    push();
    textAlign(LEFT);
    textSize(12)
    fill("black");
    textFont("Arial");
    text("Press L for Lyrics",10,21)
    text("Press R for Reviews",10,41)
    text("Click/hover on pt to toggle valence movement/info",10,61)
    text("Press A to toggle all movement",10,81)
    pop();
    
    for(var i=1;i<10;i++){
      strokeWeight(3);
      line(i*pagex/9,0,i*pagex/9,pagey);
    }

    push();
    noStroke();
    fill(0, 138, 0, 50);
    rect(0, 0, pagex, pagey/2);
    fill(138,0,0, 50);
    rect(0, 330, pagex, pagey/2);
    pop();


    if(selectedtype=="rev"){
      for (var i = 0; i < reviews.length; i++) {
        reviews[i].display(); 
        reviews[i].mouseover(mouseX,mouseY);  
        if(reviews[i].click==true || allmove){
          reviews[i].move(); 
        }     
      }

    }

    if(selectedtype=="lyr"){
      for (var i = 0; i < lyrics.length; i++) {
        lyrics[i].display();   
        lyrics[i].mouseover(mouseX,mouseY);
        if(lyrics[i].click==true || allmove){
          lyrics[i].move(); 
        }     
      }

    }

}
}


  