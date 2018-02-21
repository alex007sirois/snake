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
			
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			step();
			
			expect(gameStarted).to.equal(true);
			
			die();
		});
	});
});