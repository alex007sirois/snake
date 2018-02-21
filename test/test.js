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
		
		
		e.keyCode=17;
		document.dispatchEvent(e);
		
		e.key="b";    // just enter the char you want to send 
		e.keyCode=e.key.charCodeAt(0);
		document.dispatchEvent(e);
		
		expect(direction).to.equal(0);
    });
  });
});