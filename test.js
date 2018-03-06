var expect = chai.expect;

describe("snake game", function() {
  describe("movement", function() {
    it("direction should not change when random key is pressed", function() {
		gamerun();
		
		var e = new Event("keydown");
		e.which=e.keyCode;
		e.altKey=false;
		e.ctrlKey=true;
		e.shiftKey=false;
		e.metaKey=false;
		e.bubbles=true;
		
		e.keyCode=14;
		document.dispatchEvent(e);
		
		
		e.keyCode=170;
		document.dispatchEvent(e);
		
		e.key="b";
		e.keyCode=e.key.charCodeAt(0);
		document.dispatchEvent(e);
		
		expect(direction).to.equal(0);
		die();
    });
	
	it("should be impossible to turn twice in a tick", function() {
		gamerun();
		snake.unshift(snake[0]);
		
		var e = new Event("keydown");
		e.which=e.keyCode;
		e.altKey=false;
		e.ctrlKey=true;
		e.shiftKey=false;
		e.metaKey=false;
		e.bubbles=true;
		
		expect(direction).to.equal(0);
		
		step();
		
		e.keyCode=38;
		document.dispatchEvent(e);
		expect(direction).to.equal(1);
		
		e.keyCode=39;
		document.dispatchEvent(e);
		expect(direction).to.equal(1);
		
		step();
		
		e.keyCode=39;
		document.dispatchEvent(e);
		expect(direction).to.equal(2);
		
		expect(gameStarted).to.equal(true);
		die();
    });
  });
  
	describe("pause", function() {
		it("pauseGame should toggle pause bool", function(){
			gamerun();
			
			expect(gamePaused).to.equal(false);
			step();
			
			pauseGame();
			
			expect(gamePaused).to.equal(true);
			
			pauseGame();
			
			expect(gamePaused).to.equal(false);
			
			die();
		});
		
		it("step should do nothing while paused", function(){
			gamerun();
			
			expect(gamePaused).to.equal(false);
			
			step();
			pauseGame();
			
			expect(gamePaused).to.equal(true);
			
			for(var i=0 ; i<200 ; i++)
				step();
			
			expect(gameStarted).to.equal(true);
			
			die();
		});
	});
	
	describe("Scoreboard", function() {
		it("should go to conclusion on death", function(){
			gamerun();
		
			var e = new Event("keydown");
			e.which=e.keyCode;
			e.altKey=false;
			e.ctrlKey=true;
			e.shiftKey=false;
			e.metaKey=false;
			e.bubbles=true;
			e.keyCode=32;
			
			expect(gameStarted).to.equal(true);
			expect(conclusion).to.equal(false);
			expect(gamePaused).to.equal(false);
			
			die();
			
			expect(gameStarted).to.equal(false);
			expect(conclusion).to.equal(true);
			expect(gamePaused).to.equal(false);
		});
		
		it("should reset to 0 0 0 0 0", function(){
			Scoreboard.resetScoreboard();			
			expect(Scoreboard.getScoreboard()[0]).to.equal(0);
			expect(Scoreboard.getScoreboard()[1]).to.equal(0);
			expect(Scoreboard.getScoreboard()[2]).to.equal(0);
			expect(Scoreboard.getScoreboard()[3]).to.equal(0);
			expect(Scoreboard.getScoreboard()[4]).to.equal(0);
		});
		
		it("should add score bigger than the last", function(){
			Scoreboard.setScoreboard([0,0,0,0,0]);
			Scoreboard.newScore(1);
			
			expect(Scoreboard.getScoreboard()[0]).to.equal(1);
			expect(Scoreboard.getScoreboard()[1]).to.equal(0);
			expect(Scoreboard.getScoreboard()[2]).to.equal(0);
			expect(Scoreboard.getScoreboard()[3]).to.equal(0);
			expect(Scoreboard.getScoreboard()[4]).to.equal(0);
			
			Scoreboard.newScore(5);
			
			expect(Scoreboard.getScoreboard()[0]).to.equal(5);
			expect(Scoreboard.getScoreboard()[1]).to.equal(1);
			expect(Scoreboard.getScoreboard()[2]).to.equal(0);
			expect(Scoreboard.getScoreboard()[3]).to.equal(0);
			expect(Scoreboard.getScoreboard()[4]).to.equal(0);
			
			Scoreboard.newScore(2);
			
			expect(Scoreboard.getScoreboard()[0]).to.equal(5);
			expect(Scoreboard.getScoreboard()[1]).to.equal(2);
			expect(Scoreboard.getScoreboard()[2]).to.equal(1);
			expect(Scoreboard.getScoreboard()[3]).to.equal(0);
			expect(Scoreboard.getScoreboard()[4]).to.equal(0);
			
			Scoreboard.newScore(1);
			Scoreboard.newScore(10);
			
			expect(Scoreboard.getScoreboard()[0]).to.equal(10);
			expect(Scoreboard.getScoreboard()[1]).to.equal(5);
			expect(Scoreboard.getScoreboard()[2]).to.equal(2);
			expect(Scoreboard.getScoreboard()[3]).to.equal(1);
			expect(Scoreboard.getScoreboard()[4]).to.equal(1);
			
			Scoreboard.newScore(0);
			
			expect(Scoreboard.getScoreboard()[0]).to.equal(10);
			expect(Scoreboard.getScoreboard()[1]).to.equal(5);
			expect(Scoreboard.getScoreboard()[2]).to.equal(2);
			expect(Scoreboard.getScoreboard()[3]).to.equal(1);
			expect(Scoreboard.getScoreboard()[4]).to.equal(1);
		});
	});
	
	describe("fruit", function() {
		it("should not have fruit on snake", function(){
			document.getElementById("canvas").width=80;
			document.getElementById("canvas").height=80;
			
			for(var i=0 ; i<100 ; i++)
			{
				gamerun();
				meal(snake[0]);
				meal(snake[1]);
				expect(score).to.equal(0);
				die();
			}
		});
	});
});