// Variables
var pauseGame = true; // Keeps track of game if paused
//var myGamePiece = []; // Array of game pieces
var floor1GamePiece = [];
var floor2GamePiece = [];
var floor3GamePiece = [];
//var clickableAreaArray = [];  // Array of clickable areas
var floor1Clickable = [];
var floor2Clickable = [];
var floor3Clickable = [];
var fences = [];
var height;
var width;
var x;
var y;
var color;
var isPaused = document.getElementById("is_paused");
var rndmNum = 0;
var globalScore = 0;  // Score of the game
var lives = 5; // Numer of lives until gameover
var gameOver = false;  // Is it gamover?
var ifClicked = false; // Was the box clicked before new randNum?
var livesP = document.getElementById('lives');  // Graps <p> with id="lives"
// Target span with ID="score"
var scoreP = document.getElementById('score');
var gOverP = document.getElementById("game-over");
var playBtn = document.getElementById("play-btn");
var toggleMusicBtn = document.getElementById("toggle-music");
var pauseBtn = document.getElementById("pause");
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Sounds: Requires sound files in repo -David
// var punch = new Audio();
// punch.src = "89769__cgeffex__fist-punch-3.mp3";
// var swoosh = new Audio();
// swoosh.src = "394876__pinball-wiz__sharp-swish.mp3";
// var backMusic = new Audio();
// backMusic.src = "Off Limits.wav";
// backMusic.addEventListener('ended', function() {
//     this.play();
// }, false);


// G: function to get image from a defined path
//    return HTMLImageElement
function getImage(path) {
  var img = new Image();
  img.src = path;
  return (img)
}
// G: Todo: Timer

// Initially print the lives #
livesP.innerHTML = " " + lives;

/*
 *    EVENT HANDLERS - Future re-implementation with jQuery:TBD? -David
 */
// Listens for user pressing P key
// If true, run togglePause()
window.addEventListener('keydown', function (e) {
  var key = e.keyCode;
  if (key === 80) { // Denotes the 'p' key
    togglePause();
  }
});
// Requires implementation
toggleMusicBtn.addEventListener("click", function(){
	console.log("output");
});
// Requires implementation
pauseBtn.addEventListener("click", function(){
	togglePause();
});
/*
 *  END EVENT HANDLERS
 */

// Handles game pause event
function togglePause() {
  if (pauseGame != true) {
    pauseGame = true;
    console.log("Game paused");
    // isPaused.innerHTML = "Game paused";
    // backMusic.pause();
    modal.style.display = "block";
  } else if (pauseGame == true) {
    pauseGame = false;
    console.log("Game not paused");
    isPaused.innerHTML = "Game not paused";
    // backMusic.play();
    modal.style.display = "none";
  }
}

// Set up initial environment
function playGame() {
  modal.style.display = "none";
  // backMusic.play();
  gOverP.innerHTML = "";
  gOverP.style.backgroundColor = "white";
  lives = 5;
  globalScore = 0;
  livesP.innerHTML = " " + lives;
  scoreP.innerHTML = "";
  pauseGame = false;
  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
}

function gameOverFunc() {
  if (lives == 0) {
    gameOver = true;
    togglePause();
    gOverP.innerHTML = "GAME OVER";
    gOverP.style.backgroundColor = "red";
    lives = 5;
  }
}
// Function to start the game
function startGame() {
  pauseBtn.style.display = "none";
  // Set up game area
  // Variable to keep track of score
  // var globalScore = 0;

  // G: Create the background from back to front (drawing order is important)
  //    might find a way to set something like z-index in css?
  bg = new component(1024, 576, './graphic/all.jpg', 0, 0);
  floor3 = new component(1024, 424, './graphic/level3.jpg', 0, 576 - 424);
  floor2 = new component(1024, 220, './graphic/level2.png', 0, 576 - 220);

  // fences for second floor
  fences[0] = new component(115, 49, './graphic/fence.png', 229, 345);
  fences[1] = new component(115, 49, './graphic/fence.png', 455, 345);
  fences[2] = new component(115, 49, './graphic/fence.png', 663, 345);


  // Use component constructor to create 4 squares
  /* G: commented out to set up all the pieces in another function
  myGamePiece[0] = new component(77, 122, './graphic/professor.png', 150, 280);
  myGamePiece[1] = new component(77, 122, './graphic/professor.png', 270, 280);
  myGamePiece[2] = new component(77, 122, './graphic/professor.png', 390, 280);
  myGamePiece[3] = new component(77, 122, './graphic/professor.png', 510, 280);
  
  // Initialize an array of clickableArea objects
  clickableAreaArray[0] = new clickableArea(60, 60, 150, 280);
  clickableAreaArray[1] = new clickableArea(60, 60, 270, 280);
  clickableAreaArray[2] = new clickableArea(60, 60, 390, 280);
  clickableAreaArray[3] = new clickableArea(60, 60, 510, 280);
  */
  initGamePiece();
  myGameArea.start();
}


// G: set up all the GamePiece and ClickableArea by floors
//    For easier randomization of appearance among floors,
//    is there a way to set up these in 2D arrays?
function initGamePiece() {
  var prof = new Object();
  prof.width = 77;
  prof.height = 122;
  prof.path = './graphic/professor.png';

  // ground floor pieces * 3
  floor1GamePiece[0] = new component(prof.width, prof.height, prof.path, 250, 400);
  floor1Clickable[0] = new clickableArea(prof.width, prof.height, 250, 400);
  floor1GamePiece[1] = new component(prof.width, prof.height, prof.path, 475, 400);
  floor1Clickable[1] = new clickableArea(prof.width, prof.height, 475, 400);
  floor1GamePiece[2] = new component(prof.width, prof.height, prof.path, 685, 400);
  floor1Clickable[2] = new clickableArea(prof.width, prof.height, 685, 400);

  // floor 2 pieces * 5
  floor2GamePiece[0] = new component(prof.width, prof.height, prof.path, 50, 200);
  floor2Clickable[0] = new clickableArea(prof.width, prof.height, 50, 200);
  floor2GamePiece[1] = new component(prof.width, prof.height, prof.path, 250, 200);
  floor2Clickable[1] = new clickableArea(prof.width, prof.height, 250, 200);
  floor2GamePiece[2] = new component(prof.width, prof.height, prof.path, 475, 200);
  floor2Clickable[2] = new clickableArea(prof.width, prof.height, 475, 200);
  floor2GamePiece[3] = new component(prof.width, prof.height, prof.path, 685, 200);
  floor2Clickable[3] = new clickableArea(prof.width, prof.height, 685, 200);
  floor2GamePiece[4] = new component(prof.width, prof.height, prof.path, 895, 200);
  floor2Clickable[4] = new clickableArea(prof.width, prof.height, 895, 200);

  // floor 3 pieces * 4
  floor3GamePiece[0] = new component(prof.width, prof.height, prof.path, 50, 0);
  floor3Clickable[0] = new clickableArea(prof.width, prof.height, 50, 0);
  floor3GamePiece[1] = new component(prof.width, prof.height, prof.path, 250, 0);
  floor3Clickable[1] = new clickableArea(prof.width, prof.height, 250, 0);
  floor3GamePiece[2] = new component(prof.width, prof.height, prof.path, 685, 0);
  floor3Clickable[2] = new clickableArea(prof.width, prof.height, 685, 0);
  floor3GamePiece[3] = new component(prof.width, prof.height, prof.path, 895, 0);
  floor3Clickable[3] = new clickableArea(prof.width, prof.height, 895, 0);
}


// This is an object
var myGameArea = {
  // Create a canvas object
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1024;    // Set canvas width
    this.canvas.height = 576;   // Set canvas height
    this.canvas.addEventListener('mousedown', onDown, false);
    this.context = this.canvas.getContext("2d");

    // inserts canvas as the first childnode of the body element
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // Updates game area every 20th millisecond (50 frames per second)
    this.interval = setInterval(updateGameArea, 20);
    this.intervalRandNum = setInterval(rndmNumFunc, 3000);
  },
  // This is a method to clear the canvas
  // It might seem unnecessary to clear the game area at every update. However, if we leave out the clear() method, all movements of the component will leave a trail of where it was positioned in the last frame:
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// G: function to get the bouncing limit for each floor
function getHeightLimit(floor) {
  var heightLimit;
  switch (floor) {
    case 1:
      heightLimit = 450;
      break;
    case 2:
      heightLimit = 250;
      break;
    case 3:
      heightLimit = 50;
      break;
  }
  return heightLimit;
}

// This allows the pieces to move
function movePiece(myGamePiece, floor) {
  heightLimit = getHeightLimit(floor);
  if (myGamePiece.y < heightLimit) {
    myGamePiece.speedY += 0.5;
  } else {
    myGamePiece.speedY -= 0.5;
  }
}
// This allows the area pieces to move
function moveAreaPiece(clickAble, floor) {
  heightLimit = getHeightLimit(floor);
  if (clickAble.y < heightLimit) {
    clickAble.speedY += 0.5;
  } else {
    clickAble.speedY -= 0.5;
  }
}

// Funtion to choose a random red box to move up then down
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// Pick a random number from 1 - 4  
function rndmNumFunc() {
  if (pauseGame == 0) {
    if (ifClicked == false)
      lives = lives - 1;
    gameOverFunc();

    // IMPORTANT!! each level's available spot is different
    // need to figure out how to get max for each floor
    rndmNum = getRandomInt(3);
    console.log("Random number is: " + rndmNum);
    livesP.innerHTML = " " + lives;
    // Reset ifClicked when new object chosen randomly
    ifClicked = false;
  }
}

// Constructor to create a red block
function component(width, height, path, x, y, type) {
  // this.maxHeight = false;
  this.width = width;           // Width of the block
  this.height = height;         // Height of block
  this.x = x;                   // x coordinate
  this.y = y;                   // y coordinate
  this.speedY = 0;
  this.type = type;             // What kind of component?
  this.pic = getImage(path);

  // If the component type is 'text', do this
  if (this.type == "text") {
    ctx.font = this.width + " " + this.height;
    //ctx.fillStyle = color;
    ctx.fillText(this.text, this.x, this.y);
  }
  // component has an update method of its own
  this.update = function () {
    ctx = myGameArea.context;
    //ctx.fillStyle = color;
    ctx.drawImage(this.pic, this.x, this.y);
    //ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function () {
    this.y += this.speedY;
  }
}

// Constructor to create clickable area
function clickableArea(width, height, x, y, type) {
  this.width = width;           // Width of the block
  this.height = height;         // Height of block
  this.x = x;                   // x coordinate
  this.y = y;                   // y coordinate
  this.speedY = 0;              // To move along y axis

  // Area has an update method of its own
  this.update = function () {
    ctx = myGameArea.context;
    //ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function () {
    this.y += this.speedY;
  }
}

// Updates game area every 20th millisecond (50 frames per second)
function updateGameArea() {
  if (pauseGame == false) {
    myGameArea.clear();     // myGame calls method to clear the canvas
    // myGamePiece.y += 1;
    // Moves pieces
    // for (var i=0; i<myGamePiece.length; i++) {
    //   movePiece(myGamePiece[i]);
    // }
    // for (var i=0; i<myGamePiece.length; i++) {
    //   myGamePiece[i].newPos();
    // }
    // // Populate the canvas with squares
    // for (var j=0; j<myGamePiece.length; j++) {
    //   myGamePiece[j].update();    // myGame calls method to update the canvas
    // }

    // G:
    // IMPORTANT:
    // update randomization of different floors and different spots
    // cannot combine all spots in 1D array because of different layers
    // layers order from bottom to surface:
    // bg -> floor3GamePiece -> floor3 -> floor2GamePiece -> floor2 -> fences -> floor1GamePiece

    bg.update();

    // floor3GamePiece
    movePiece(floor3GamePiece[rndmNum], 3);
    floor3GamePiece[rndmNum].newPos();
    floor3GamePiece[rndmNum].update();

    moveAreaPiece(floor3Clickable[rndmNum], 3);
    floor3Clickable[rndmNum].newPos();
    floor3Clickable[rndmNum].update();
    floor3.update();  // redraw floor3

    // floor2GamePiece
    movePiece(floor2GamePiece[rndmNum], 2);
    floor2GamePiece[rndmNum].newPos();
    floor2GamePiece[rndmNum].update();

    moveAreaPiece(floor2Clickable[rndmNum], 2);
    floor2Clickable[rndmNum].newPos();
    floor2Clickable[rndmNum].update();
    floor2.update();  // redraw floor2
    fences[0].update();
    fences[1].update();
    fences[2].update();

    // floor1GamePiece
    movePiece(floor1GamePiece[rndmNum], 1);
    floor1GamePiece[rndmNum].newPos();
    floor1GamePiece[rndmNum].update();

    moveAreaPiece(floor1Clickable[rndmNum], 1);
    floor1Clickable[rndmNum].newPos();
    floor1Clickable[rndmNum].update();


    // Update the score on the screen
  }
}
// It takes the mousedown event as a parameter,
// The event has proporties
// pageX is the x coordinate of the canvas clicked
// pagey is the y coordinate of the canvas clicked
function onDown(event) {
  var cx = event.pageX;
  var cy = event.pageY;
  var xBound_1 = floor1Clickable[rndmNum].x;
  var xBound_2 = floor1Clickable[rndmNum].x + floor1Clickable[rndmNum].width;
  var yBound_1 = floor1Clickable[rndmNum].y;
  var yBound_2 = floor1Clickable[rndmNum].x + floor1Clickable[rndmNum].height;
  var xBound_1 = floor2Clickable[rndmNum].x;
  var xBound_2 = floor2Clickable[rndmNum].x + floor2Clickable[rndmNum].width;
  var yBound_1 = floor2Clickable[rndmNum].y;
  var yBound_2 = floor2Clickable[rndmNum].x + floor2Clickable[rndmNum].height;
  var xBound_1 = floor3Clickable[rndmNum].x;
  var xBound_2 = floor3Clickable[rndmNum].x + floor3Clickable[rndmNum].width;
  var yBound_1 = floor3Clickable[rndmNum].y;
  var yBound_2 = floor3Clickable[rndmNum].x + floor3Clickable[rndmNum].height;
  // swoosh.play();
  // Print information in console
  console.log("X,Y = " + cx + ', ' + cy);
  // If the click is within thei x,y coordinate, update score
  if (cx <= xBound_2 && cx >= xBound_1 && cy <= yBound_2 && cy >= yBound_1 && ifClicked == false) {
    // punch.play();
    globalScore = globalScore + 1;
    ifClicked = true;
    // Clear the previous printed score
    scoreP.innerHTML = "";
    console.log("score: " + globalScore);
    // Print new score in span tag
    scoreP.innerHTML = " " + globalScore;
  }
}