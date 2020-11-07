
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage ,ground
var FoodGroup, obstacleGroup
var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(140,480,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(550,545,1200,10);
  ground.velocityX = -3;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  survivalTime = 0;
}


function draw() {
background("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime,100,50);
  
  
  if (keyDown("space")) {
    monkey.velocityY = -17;
  }
  
 
  
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  
  if (ground.x < 0){
    ground.x = ground.x/2;
  }
  
  Food();
  Obstacles();
  
  if (obstaclesGroup.isTouching(monkey)) {
   ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
 }
  
  drawSprites();
}

function Food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,160,5,5);
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -10;
    banana.y = Math.round(random(120,200));
    banana.lifetime = 70;
    
    FoodGroup.add(banana);
  }
}

function Obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600,490,5,5);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3;
    obstacle.velocityX = -10;
    
    obstaclesGroup.add(obstacle);
  }
}