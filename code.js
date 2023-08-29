var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["d37202e9-2bc6-4c06-a02f-79db709d94c4","bbb6a9b0-3bfa-47c5-9219-af6ce3da2b69","0de944c0-2222-4108-ba19-f764ed04309e"],"propsByKey":{"d37202e9-2bc6-4c06-a02f-79db709d94c4":{"name":"robot_02_1","sourceUrl":"assets/api/v1/animation-library/gamelab/JwtCeTHgy85COA5cC0sPa_VIOH2nMlSE/category_robots/robot_02.png","frameSize":{"x":262,"y":388},"frameCount":1,"looping":true,"frameDelay":2,"version":"JwtCeTHgy85COA5cC0sPa_VIOH2nMlSE","categories":["robots"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":262,"y":388},"rootRelativePath":"assets/api/v1/animation-library/gamelab/JwtCeTHgy85COA5cC0sPa_VIOH2nMlSE/category_robots/robot_02.png"},"bbb6a9b0-3bfa-47c5-9219-af6ce3da2b69":{"name":"volleyball2_1","sourceUrl":"assets/api/v1/animation-library/gamelab/Yr547P.Zjz5iZluXcGpzwKpozGcMO7CM/category_sports/volleyball2.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"Yr547P.Zjz5iZluXcGpzwKpozGcMO7CM","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/Yr547P.Zjz5iZluXcGpzwKpozGcMO7CM/category_sports/volleyball2.png"},"0de944c0-2222-4108-ba19-f764ed04309e":{"name":"kid_15_walking_1","sourceUrl":"assets/api/v1/animation-library/gamelab/qlB4XRMjWhG4H3chPaxZHMsKo.lkG4KD/category_people/kid_15_walking.png","frameSize":{"x":217,"y":380},"frameCount":1,"looping":true,"frameDelay":2,"version":"qlB4XRMjWhG4H3chPaxZHMsKo.lkG4KD","categories":["people"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":217,"y":380},"rootRelativePath":"assets/api/v1/animation-library/gamelab/qlB4XRMjWhG4H3chPaxZHMsKo.lkG4KD/category_people/kid_15_walking.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//create player paddle sprite
var playerPaddle = createSprite(380,200,10,70);
playerPaddle.setAnimation("kid_15_walking_1");
playerPaddle.scale= 0.2;

//create computer paddle sprite
var computerPaddle = createSprite(10,200,10,70);
computerPaddle.setAnimation("robot_02_1");
computerPaddle.scale=0.2;

//create ball sprite
var ball = createSprite(200,200,10,10);
ball.setAnimation("volleyball2_1");
ball.scale=0.07;

//variable to store the gamestate
var gamestate= 'serve';
var computerscore=0;
var playerscore=0;

function draw() {
  //set background clear
  background("white");
  
  text(computerscore,100, 30);
  text(playerscore, 300, 30);
  
  if(gamestate==='serve'){
    fill('red');
    text("Press SPACE to start", 140, 180);
  }
  
  //make the player paddle move along with the mouse
  // playerPaddle.y = World.mouseY;
  
  //AI for the player paddle
  //make it move with the ball's y position
  // playerPaddle.y=ball.y;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  // computerPaddle.y=ball.y;
  
  if(keyDown("up")){
    playerPaddle.y=playerPaddle.y-5;
  }
  
  if(keyDown("down")){
    playerPaddle.y=playerPaddle.y+5;
  }
  
    if(keyDown("W")){
    computerPaddle.y=computerPaddle.y-5;
  }
  
  if(keyDown("Z")){
    computerPaddle.y=computerPaddle.y+5;
  }
  
 //condition to move the ball when SPACE key is pressed
  if(keyDown("space")&& gamestate==='serve'){
   serve();
   gamestate='play';
  }
  
  if(ball.isTouching(computerPaddle) || ball.isTouching(playerPaddle)){
    playSound("assets/category_hits/retro_game_hit_block_4.mp3");
  }
  
  if(ball.x > 400){
    computerscore= computerscore+1;
    playSound("assets/category_hits/vibrant_game_frozen_break_hit_1.mp3");
  }
  
  if(ball.x < 0){
    playerscore= playerscore+1;
    playSound("assets/category_hits/vibrant_game_frozen_break_hit_1.mp3");
  }
  
  if(playerscore===5 || computerscore===5){
    gamestate='over';
    text("GAME OVER", 170, 220);
    text("Press R to retsart", 160, 235);
  }
  
  if(keyDown('R') && gamestate==='over'){
    gamestate='serve';
    computerscore=0;
    playerscore=0;
  }
  
  //condition to reset the ball to the centre if it goes out of the screen
  // || is 'OR' operator also called as pipe symbol: used as a comparision operator 
  if(ball.x>400 || ball.x<0){
    reset();
    gamestate='serve';
  }
  
  //create edges to the playground
  createEdgeSprites();
  
  //ball bounce off the edges
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  
  //ball bounce off the paddles
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
   
  //function call to drawnet()
   drawnet();
   
  drawSprites();
}

//function to draw the net
function drawnet(){
  for(var num=0; num<400; num=num+20){
    line(200, num, 200,num+10);
  }
}

//function to serve the ball
function serve() {
  ball.velocityX = 6;
  ball.velocityY = 6;
}

//function to reset the ball in the center if it goes out of the screen
function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
