
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0
var ground,ground1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,600)
  
  var survivalTime = 0;
  
  //creating monkey.
 monkey=createSprite(80,315,20,20);                  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  ground1=createSprite(400,350,900,10);
  ground1.x=ground1.width/2;
  
  foodGroup=new Group();
  obstacleGroup=new Group();
  
  score=0;
  
}


function draw() {
  background("white");
  
  //creating a scrolling ground.
 if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  //add gravity to the ground.
   monkey.velocityY = monkey.velocityY + 0.8;
  
  
  monkey.collide(ground);
  spawnFood();
  spawnObstacles();
  
  
   drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
    
  stroke("black");
  textSize(20);
   fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survival Time : "+ survivalTime,100,50);
  
  
   if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        monkey.velocityX = 0;
        obstacleGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
    
        }
  
  if (foodGroup.isTouching(monkey)){
  foodGroup.destroyEach();
  }
   }
  
function spawnObstacles(){

 //creating obstacles after every 300 frames. 
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
}

  
}

function spawnFood(){
  
// writing code for spawning the food.
if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
  
  //add each banana to the group
   foodGroup.add(banana);


}
}