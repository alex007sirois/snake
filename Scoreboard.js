const Scoreboard = function(){
	
	var localStorageAvalaible=typeof(Storage) !== "undefined";
	var scoreboard;
	
	function resetScoreboard(){
		scoreboard=[];
		scoreboard.push(0);
		scoreboard.push(0);
		scoreboard.push(0);
		scoreboard.push(0);
		scoreboard.push(0);
		saveScoreboard();
	}
	
	function loadScoreboard(){
		if(!localStorageAvalaible || !localStorage.scoreboard)
			resetScoreboard();
		else
			scoreboard=JSON.parse(localStorage.scoreboard);
	}
	
	function saveScoreboard(){
		if(localStorageAvalaible)
		{
			localStorage.scoreboard=JSON.stringify(scoreboard);
		}
	}
	
	loadScoreboard();
	
	return{
		/* comment line to test
		resetScoreboard:function(){resetScoreboard();},
		
		loadScoreboard:function(){loadScoreboard();},
		
		saveScoreboard:function(){saveScoreboard();},
		
		getScoreboard:function(){return scoreboard;},
		
		setScoreboard:function(s){scoreboard=s;},
		
		localStorageAvalaible:localStorageAvalaible,
		//*/
		
		newScore:function(score){
			if(score > scoreboard[scoreboard.length-1])
			{
				scoreboard.pop();
				
				for(var position=0 ; position < scoreboard.length ; position++){
					console.log()
					
					if(score > scoreboard[position])
						break;
				}
				
				scoreboard.splice(position, 0, score);
				saveScoreboard();
			}
		},
		
		show:function(){
			screenclear();
			
			var canvas = document.getElementById("canvas");
			var ctx=canvas.getContext("2d");
			
			ctx.font="30px Arial";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.fillText("Scoreboard", canvas.width/2, canvas.height/7);
			
			ctx.textAlign = "left";
			
			ctx.fillText("1. "+scoreboard[0], canvas.width*0.4, 2*canvas.height/7);
			ctx.fillText("2. "+scoreboard[1], canvas.width*0.4, 3*canvas.height/7);
			ctx.fillText("3. "+scoreboard[2], canvas.width*0.4, 4*canvas.height/7);
			ctx.fillText("4. "+scoreboard[3], canvas.width*0.4, 5*canvas.height/7);
			ctx.fillText("5. "+scoreboard[4], canvas.width*0.4, 6*canvas.height/7);
			
			ctx.textAlign = "center";
			ctx.font="20px Arial";
			
			ctx.fillText("press space to start", canvas.width/2, canvas.height-20);
		}
	};
}();