var pagex = 1260;
var pagey = 660;

var words;
var table1;
var selectedtype = " ";

var pitch;
var spotify;
var textblob;

var questions = ["What adjectives are used most commonly by pitchfork for each score category?",
"What kind of adjectives exist in the lyrics at each score category?",
"How vocal or speechy is the the average song at each category?",
"How subjective are Pitchfork's reviews at each score category?",
"What do algorithms think is subjective or not?",
"How “subjective” will TextBlob say the musicians lyrics are?"];

var mgr;

function preload() {
  table1 = loadTable("data/subjectivity.csv", "header");
  font = loadFont('./assets/Arial.ttf');
  crowd = loadSound('data/speechiness.mp3');
  bg = loadImage("images/gradient.jpg");
  pitch = loadImage("images/pitchfork.png");
  spotify = loadImage("images/spotify.png");
  textblob = loadImage("images/textblob.png");
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

///////////////////////////////////////

function Animation1()
{
    var textX;
    var textY;
    var see;
    var sel=0;
    var t1;

    this.draw = function()
    {
        textX = 10;
        textY = 0;
        background(95,75,139);
        
        push();
        translate(5,20);
        textblob.resize(80,0);
        image(textblob,0,0);
        spotify.resize(80,0);
        image(spotify,80,-10);
        pitch.resize(80,0);
        image(pitch,170,-10);
        pop();

        textAlign(CENTER);
        textFont('Roboto');
        fill("white");
        textSize(62);
        text("Music Subjectivity", width / 2, 140);
        textSize(30);
        push();
        textStyle(ITALIC);
        text("What can we learn about words in lyrics, reviews and algorithmic sentiment analysis?", width / 2, 200);
        textSize(20);
        text("What questions do you have? Toggle them by pressing Q", width / 2, 240);
        pop();
        textSize(20);
        text("press next...",width-60,height-20)

        

        if(see){
          push();
          translate(550+facex,350+facey);
          noStroke()
          
          var bbox = font.textBounds(questions[sel], 0,0, 30)
          ellipse(0,-10,bbox.w+40,bbox.h+35);
          fill("white")
          triangle(100, 20, 250, 10, 0,50)
          fill(95,75,139)
          textFont('Covered By Your Grace');
          textSize(30);
          text(questions[sel], 0,0)
          pop();
        }

    }

    this.keyPressed = function()
    {
      if(keyCode==81){
        see = true;
        var old = sel;
        while(sel==old){
          sel = Math.floor(Math.random()*6);
        }
      }
      
      if(keyCode==39){
        this.sceneManager.showNextScene();
      }
    }

}


////////////////////////////

class Instr{
  constructor(x, y) {
  this.x = x;
  this.y = y;
  }

  display(){
		push();
		translate(pagex/2-capx/2, 420);
		textAlign(CENTER);
		text(this.txt,this.x,this.y);
		pop();
	}
	
	move(){
		this.x = this.x + random(-8, 8);
		this.y = this.y - 10;

	}
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
      this.x = x+50;
      this.y = y+50;
      this.adj = adj;
      this.freq = freq;
      this.type = type;
      this.score = score;
      this.speechiness = speechiness;
    }
  
  
    display() {
      textSize(this.freq/3);
      if(this.type=="review"){
          textFont("Bradley Hand");
          fill(214, 0, 189)
      }
      else{
          textFont("Arial");
          fill(255, 136, 17);
      }
    
      text(this.adj, this.x, this.y);
      
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

    push();
    textSize(20);
    fill("black");
    textFont("Arial");
    if(selectedtype<=9 && selectedtype>=1){
      text("displaying score: "+selectedtype,83,21)
    }
    else{
      text("displaying score: ",78,21)
    }

    textSize(12);
    fill(214, 0, 189)
    text("Reviews",40,41)
    fill(255, 136, 17);
    text("Lyrics",100,41)
    pop();

    push();
    fill("white");
    textFont("Arial");
    textAlign(CENTER);
    textSize(14);
    text("more",(3/4)*pagex+30,640);
    text("less",pagex/4-30,640);
    text("subjective",pagex/2,640);
    pop();
        
      
        textAlign(CENTER);
        textFont('Roboto');
        fill("white");
        textSize(62);
        text("Press a key 1-9", width / 2, 170);
        textSize(20);
        push();
        textStyle(ITALIC);
        text("This will display the most commonly found adjectives in reviews (pink) and lyrics (orange)", width / 2, 250);
        text("The size of the font indicates their frequency", width / 2, 300);
        text("The adjectives are placed left to right based on TextBlob's analysis of the level of subjectivity expressed through the words", width / 2, 350);
        pop();
        textSize(20);
        fill("red")
        text("press next...",width-60,height-20)

        

    }

    this.keyPressed = function()
    {
      if(keyCode==39){
        this.sceneManager.showNextScene();
      }
    }

}




function Animation3(){


  this.keyPressed = function() {
    console.log("HERE")
    if(keyCode-48==selectedtype){
      selectedtype="";
      crowd.stop();
    }
    else{
      selectedtype = keyCode-48
      console.log(selectedtype);
      if(selectedtype<=9 && selectedtype>=1){
        crowd.play();
        for (var i = 0; i < words.length; i++) {
          if(words[i].score==selectedtype){
            masterVolume(words[i].speechiness);
            break;
          }
        }
    }
      
    }
  
  }

  this.draw = function(){

    image(bg,0,0,pagex,pagey);
      // background(194, 234, 210);
      // console.log(mouseX)
      // console.log(mouseX)
  
      push();
      textSize(20);
      fill("black");
      textFont("Arial");
      if(selectedtype<=9 && selectedtype>=1){
        text("displaying score: "+selectedtype,83,21)
      }
      else{
        text("displaying score: ",78,21)
      }

      textSize(12);
      fill(214, 0, 189)
      text("Reviews",40,41)
      fill(255, 136, 17);
      text("Lyrics",100,41)
      pop();
  
      push();
      fill("white");
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
  }

