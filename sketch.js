
var monkey , monkey_running, monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup, GM,GMI;
var score = 0;
var SurvivalTime = 0;
var ground;
PLAY = 1;
END = 0;
gameState = PLAY;

function preload(){
  
  
 monkeyImage = loadAnimation("sprite_0.png");
  
              monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 GMI = loadImage("gameover.png");
}



function setup() {
  createCanvas(400,400);
  
monkey = createSprite(100,350,10,10);
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.15;
  monkey.debug = true;
  
  ground = createSprite(300,375,400,5);
  ground.velocityX =  -4;
   ground.x = ground.width /2;
  
  GM = createSprite(200,200,20,20);
  GM.addImage("running", GMI);
  GM.scale = 0.5;
  GM.visible = false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
}


function draw() {
  
  background(200);
  if(gameState=== PLAY ){
    
  
 if(keyDown("space")&& monkey.y>=320){ 
   monkey.velocityY = -8 ;
 }
  monkey.velocityY = monkey.velocityY + 0.2;
  monkey.collide(ground); 
  spawnBanana();
  spawnObstacles(); 
   if (ground.x < 200){
      ground.x = ground.width/2;
    }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score +1;
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
    
  drawSprites();
  }
  
  if(gameState === END){
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
   
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    score = 0;
    monkey.velocityY = 0;
    GM.visible = true;
    ground.velocityX = 0;
    background(0);
    
  stroke("white");
  textSize(35);
  fill("yellow");
  text("Game Over", 125,200);
    
  }
  
  
  
  stroke("black");
  textSize(17);
  fill("black");
  text("Score: "+ score, 300,50);
 
}

function spawnBanana() {
  if(frameCount % 80 === 0){
    banana = createSprite(400,250,5,5);
    banana.addImage("running", bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -4;
    banana.y = Math.round(random(80,340));
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 100 === 0){
    obstacle = createSprite(400,350,5,5);
    obstacle.addImage("running", obstacleImage);
    obstacle.scale = 0.10;
    obstacle.velocityX = -4;
   
    obstacleGroup.add(obstacle);
  }
}




