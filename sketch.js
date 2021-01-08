var play = 1;
var end = 0;
var gameState = play;
var count = 0;
var trex, ground, invisibleGround;
var gameOver, restart;
var runTrex,groundImg,miniClouds;
var obstacleImg1,obstacleImg2,obstacleImg3,obstacleImg4,obstacleImg5,obstacleImg6;
var stopTrex;
var rand;

function preload() {
	runTrex = loadAnimation("trex1.png","trex3.png","trex4.png");
	groundImg = loadImage("ground2.png");
	miniClouds = loadImage("cloud.png");
	obstacleImg1 = loadImage("obstacle1.png");
	obstacleImg2 = loadImage("obstacle2.png");
	obstacleImg3 = loadImage("obstacle3.png");
	obstacleImg4 = loadImage("obstacle4.png");
	obstacleImg5 = loadImage("obstacle5.png");
	obstacleImg6 = loadImage("obstacle6.png");
	stopTrex = loadImage("trex_collided.png");
}

function setup() {
	createCanvas(800, 800);

	ObstaclesGroup = createGroup();
	CloudsGroup = createGroup();

	trex = createSprite(50,360,20,20);
	trex.addAnimation("running",runTrex);
	trex.addImage(stopTrex);
	trex.scale = 0.4;

	ground = createSprite(200,380,400,10);
	ground.velocityX = -9;
	ground.addImage(groundImg);

	invisibleGround = createSprite(200,390,400,10);
	invisibleGround.visible = false;
 }

function draw() {
  rectMode(CENTER);
  background(0);
  
  trex.collide(invisibleGround);

  text("Score: "+ count, 300, 50);
  console.log(gameState);
  
  camera.position.x = trex.x+250;
  camera.position.y = trex.y-250;

  if(gameState === play){
	spawnClouds();
	spawnObstacles();
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
	
	count = count + Math.round(getFrameRate()/60);

    if(keyDown("space") && trex.y >= 359){
	  trex.velocityY = -12;
	}
	
	trex.velocityY = trex.velocityY + 0.8;
	
    if(ObstaclesGroup.isTouching(trex)){
      gameState = end;
	}
	
  }
  else if(gameState === end) {
	trex.addImage(stopTrex);
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
	CloudsGroup.setVelocityXEach(0);
	
//    trex.addImage(stopTrex);
  }
  
  drawSprites();
} 
  

function spawnObstacles() {
	if(World.frameCount % 60 === 0) {
	  obstacle = createSprite(400,365,20,20);
	  obstacle.velocityX = -5;
	  
	  rand = Math.round(random(1,6));
	  switch(rand){
		case 1: obstacle.addImage(obstacleImg1);
		break;
		case 2: obstacle.addImage(obstacleImg2);
				break;    
		case 3: obstacle.addImage(obstacleImg3);
				break;
		case 4: obstacle.addImage(obstacleImg4);
				break;
		case 5: obstacle.addImage(obstacleImg5);
				break;
		case 6: obstacle.addImage(obstacleImg6);
				break;  
				default:break;
	  }

	  obstacle.scale = 0.4;
	  ObstaclesGroup.add(obstacle);
	}
}

function spawnClouds() {
	if (World.frameCount % 60 === 0) {
	  cloud = createSprite(400,200,20,20);
	  cloud.y = Math.round(random(80,300));
	  cloud.addImage(miniClouds);
	  cloud.scale = 0.8;
	  cloud.velocityX = -6;
	  cloud.lifetime = 150;
	  CloudsGroup.add(cloud);
	}
}
 