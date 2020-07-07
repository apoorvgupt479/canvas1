var ppXl = 0 ;
var ppYl = 0;
var pXl;
var pYl;
var mycolor;
var colorChoice;
var colorVariety = ["black","white","red","orange","yellow","green","blue","purple","pink","grey","brown","teal"];

var pointer,database,position,prevposition;
var pointerPosition,prevPosition;

function setup() {
  createCanvas(displayWidth,21*displayHeight/25);
  background(235,235,235);
  mycolor = createSprite(1400,600,50,30);
  rand = random(0,11);
  database = firebase.database();
  pointerPosition = database.ref("pointer/position");
  pointerPosition.on("value", readPos, showErr);
  prevPosition = database.ref("pointer/prevposition");
  prevPosition.on("value", readPos, showErr);
}

function readOtherPos(data){
    position = data.val();
    }

function readPos(data){
	prevPosition = data.val();
    }
	
	
	
	
	
function draw() {
  
  pXl = mouseX;
  pYl = mouseY;
	
  line(prevPosition.x,prevPosition.y,pointerPosition.x,pointerPosition.y);
    
  changePosition(pXl,pYl);
  changeOtherPosition(ppXl,ppYl);
  
  strokeWeight(5);
  text("space to erase",1400,670);

  if(mouseDown("leftButton"))
  line(pXl,pYl,ppXl,ppYl);

  if(mousePressedOver(mycolor))
  colorChoice = colorVariety;
  
  mycolor.shapeColor = (colorChoice);
  console.log(colorChoice);
  fill(95,154,255);


  ppXl = pXl;
  ppYl = pYl;

  
}

function keyPressed(){
  if(keyCode === 32){
    background(235,235,235);
  }
}

function changePosition(x,y){
    database.ref("pointer/position").set({'x':x,'y':y});
}

function changeOtherPosition(x,y){
    database.ref("pointer/prevposition").set({'x':ppXl+x,'y':ppYl+y});
}

function showErr(){
    text("cant read",200,200);
}
