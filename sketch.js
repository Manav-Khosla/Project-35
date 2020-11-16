//Create variables here
var dogImage, happyDogImage, dog;
var canvas;
var foodStock, database;
var foodS;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");

}

function setup() {
	canvas = createCanvas(500, 500);
  database = firebase.database();

  foodStock=database.ref('food');
  foodStock.on("value", readStock);

  dog = createSprite(250, 300, 200 ,200);
  dog.addImage(dogImage);
  dog.scale = 0.5;

}


function draw() {  
  background(40, 150, 20);
  drawSprites();
  //add styles here

  textSize(20);
  fill("White");
  text("Note: Press the Up Arrow Key to Feed your Dog!", 20, 20);
  textSize(24);
  text("Food Remaining: "+foodS, 20, 50);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<= 0){
    x = 0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    food: x
  });

}



