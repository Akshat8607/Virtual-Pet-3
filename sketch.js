//Create variables here

var dog, normalDog,happyDog, database, foodS, foodStock;

var feed,addFood,fedTime,lastFed,foodObject,bath,bathroom,napy,player,living;

var dogState = "awake";

function preload()
{
  //load images here
  
  happyDog = loadImage("images/dogImg.png");

  normalDog = loadImage("images/dogImg1.png");

  sleepyDog = loadImage("images/Bed Room.png");

  bathroom = loadImage("images/Wash Room.png");

  living = loadImage("images/Living Room.png")
}

function setup() {
  createCanvas(1200,500);
  
  //foodS = 20;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock,showError);
  
  dog = createSprite(180,200,20,20);
  dog.addImage(normalDog);

  dog.scale = 0.25;

  feed = createButton("Feed The Lovely Pet");
  feed.position(500,90);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(650,90);
  addFood.mousePressed(addFoods);

  bath = createButton("Just Freshen Up")
  bath.position(730,90);
  bath.mousePressed(giveBath);

  napy = createButton("Take A Cat Nap")
  napy.position(850,90);
  napy.mousePressed(nap);

  player = createButton("Play")
  player.position(970,90);
  player.mousePressed(play);

  foodObject = new Food();
}


function draw() {  
  background(46, 139, 87);

  //console.log(lastFed);

  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }*/

  foodObject.display();

  drawSprites();
  //add styles here


  //lastFed = foodObject.lastFed;
  fill(255,255,254);
  textSize(15);
  if(foodObject.lastFed >= 12){
    text("Last Feed : " + foodObject.lastFed%12 + " PM", 350,30);
  }else if(foodObject.lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :" + foodObject.lastFed + " AM",350,30);
  }

  fill("white");
  //text("Note: Press the up arrow to feed the dog milk!",130,20)
  text("Food Remaining: " + foodObject.foodStock,550,130);


  if(foodObject.currentTime > foodObject.lastFed){
    //console.log("YAY");
    if(foodObject.lastFed + 2 == foodObject.currentTime){
        imageMode(CENTER);
        image(foodObject.livingRoom,180,200,200,300);
        console.log("YAY");
    }else if(foodObject.lastFed + 1 == foodObject.currentTime){
        imageMode(CENTER);
        image(foodObject.garden,180,200,200,300);
        console.log("YAY1");
    }else{

    }

}

}




function feedDog(){
  dog.addImage(happyDog);
  foodObject.deductFood();
}

function addFoods(){
  foodObject.foodStock++;
  dog.addImage(normalDog);
  foodObject.updateFoodStock();
}


function showError(){
  console.log("ERROR");
}

function readStock(){
  foodObject.updateFoodStock();
}

function giveBath(){
  dog.addImage(bathroom);
}

function nap(){
  if(dogState === "awake"){
      dog.addImage(sleepyDog);
  }
}

function play(){
  dog.addImage(living);
}