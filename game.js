var gameStarted = false;
var gamePaused = false;

$( document ).ready(function() {
    showIntro();

    // Start game on spacebar press.
    this.onkeypress = function(e) {
		if (e.keyCode == 32) { // 32 = Spacebar
			if(!gameStarted)
				gamerun();
			else
				pauseGame();
		}
    }

});

function pauseGame()
{
	gamePaused=!gamePaused;
}

function gamerun() {
	if(gameStarted)
		return;
	
	gamePaused=false;
	gameStarted = true;
	init();
}

function step(){
	if(gamePaused)
		return;
	
  update();
  draw();
}

function update() {
  if (!movesnake()) {
    die();
    showConclusion(score)
  }
}

function draw() {
  if (gameStarted) {
      screenclear();
      drawsnake();
      drawfood();
  }
}

function showIntro() {
    var canvas = document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    ctx.font="30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("SNAKE", canvas.width/2, canvas.height/2);

    ctx.font="20px Arial";
    ctx.fillText("press space to start", canvas.width/2, canvas.height/2+40);
}

function showConclusion(score) {
    screenclear();
    var canvas = document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    ctx.font="30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    ctx.fillText("score: " + score, canvas.width/2, canvas.height/2-40);
    ctx.font="20px Arial";
    ctx.fillText("press space to start", canvas.width/2, canvas.height/2+80);
}