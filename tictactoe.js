	var gameWinner = new Array();
	var humanPickedArray = new Array();
	var cpuPickedArray = new Array();
	var cpuRepickArray = new Array();
	var humanWinArray, cpuWinArray, resetButton;
		var winningCombos = [
    							"#1.COLOR, #2.COLOR, #3.COLOR", "#3.COLOR, #2.COLOR, #1.COLOR", "#2.COLOR, #1.COLOR, #3.COLOR", "#1.COLOR, #3.COLOR, #2.COLOR",
								"#4.COLOR, #5.COLOR, #6.COLOR", "#6.COLOR, #5.COLOR, #4.COLOR", "#5.COLOR, #4.COLOR, #6.COLOR", "#6.COLOR, #4.COLOR, #5.COLOR",
								"#7.COLOR, #8.COLOR, #9.COLOR", "#9.COLOR, #8.COLOR, #7.COLOR", "#8.COLOR, #7.COLOR, #9.COLOR", "#9.COLOR, #7.COLOR, #8.COLOR",
								"#1.COLOR, #4.COLOR, #7.COLOR", "#7.COLOR, #4.COLOR, #1.COLOR", "#4.COLOR, #7.COLOR, #1.COLOR", "#1.COLOR, #7.COLOR, #4.COLOR",
								"#2.COLOR, #5.COLOR, #8.COLOR", "#8.COLOR, #5.COLOR, #2.COLOR", "#5.COLOR, #8.COLOR, #2.COLOR", "#2.COLOR, #8.COLOR, #5.COLOR",
								"#3.COLOR, #6.COLOR, #9.COLOR", "#9.COLOR, #6.COLOR, #3.COLOR", "#6.COLOR, #9.COLOR, #3.COLOR", "#3.COLOR, #9.COLOR, #6.COLOR",
								"#1.COLOR, #5.COLOR, #9.COLOR", "#9.COLOR, #5.COLOR, #1.COLOR", "#5.COLOR, #9.COLOR, #1.COLOR", "#1.COLOR, #9.COLOR, #5.COLOR",
								"#3.COLOR, #5.COLOR, #7.COLOR", "#7.COLOR, #5.COLOR, #3.COLOR", "#5.COLOR, #7.COLOR, #3.COLOR", "#3.COLOR, #7.COLOR, #5.COLOR",
  								];
		function onClick(){
			playGame();
		}
		onClick();
		
		function playGame(){
			var choice;
			humansTurn(choice);
		}
		function humansTurn(choice){
			humanPick(choice);			
			return choice;
		}
		function humanPick(){		
			var choice;
			$('.gridItem').click(function(event){
					addHuman(event,choice);
				});
		}
		function cpusTurn(humanChoice){
			var randomNum = Math.floor(Math.random() * 9 + 1)
			var cpuChoice = '#' + randomNum;
			if (humanChoice != cpuChoice && (humanPickedArray.includes(cpuChoice) == false && cpuPickedArray.includes(cpuChoice) == false)){
				cpuPick(cpuChoice);
			} else {
				cpuRepick(randomNum);
			}
		}
		function cpuRepick(randomNum){
			var cpuRepick;
			var isTaken = true;
				while(isTaken == true){
					cpuRepick = '#' + randomNum;
					cpuRepickArray.push(cpuRepick);
					if (!humanPickedArray.includes(cpuRepick) && !cpuPickedArray.includes(cpuRepick)){
						cpuPickedArray.push(cpuRepick);
							$(cpuRepick).addClass("red");
							$(cpuRepick).html("O");
							console.log("CPUs repick was successful");
						if (cpuWinArray.includes(true)){
							decideWinner(gameWinner);
							isTaken = false;
						}
						isTaken = false;
					} else {
						isTaken = true;
					}
					randomNum++;
				}
		}	
		function cpuPick(cpuChoice){
			cpuPickedArray.push(cpuChoice);
			$(cpuChoice).addClass("red");
			$(cpuChoice).html("O");
		}
		function decideWinner(winner) {
  			console.log("Do we have a winner??");
  			humanWinArray = getWinningArray(winningCombos, "blue");
  			cpuWinArray = getWinningArray(winningCombos, "red");
  			var humanWins = humanWinArray.includes(true);
  			var cpuWins = cpuWinArray.includes(true);
  			var fullGrid = getHumanCount() + getCpuCount();
  			var draw = ((fullGrid === 9) && (!humanWins && !cpuWins));
  			if (humanWins) {
    			humanWin();
    			gameWinner.push("Human");
    			return humanWins;
  			} else if (cpuWins) {
    			cpuWin();
    			gameWinner.push("CPU");
    			return cpuWins;
  			} else if (draw) {
    			catsGame();
    			gameWinner.push("Draw");
    			return draw;
  			} else {
    			console.log('game on...');
  			}
		}
		function getWinningArray(array, string) {
  			return array.map(function(combo) {
    			var eachCombo = combo.replace(/COLOR/g, string)
    			return eachCombo = $(eachCombo).length === 3
  			});
		}
		function humanWin(){
			$("#winningHeader").css("display", "block");
            $("#winningHeader").text("Human wins the game!")
            console.log("Human wins the game!");
            disableSpotsLeft();
		}
		function cpuWin(){
			$("#winningHeader").css("display", "block");
            $("#winningHeader").text("CPU wins the game!")
            console.log("CPU wins the game!");
            disableSpotsLeft();
		}
		function catsGame(){
            $("#winningHeader").css("display","block");
            $("#winningHeader").text("DRAW!");
            console.log("There has been a draw!");
            disableSpotsLeft();
		}
		function getCpuCount() {
  			var cpuCount = $('.red').length;
  			return cpuCount;
		}
		function getHumanCount() {
  			var humanCount = $('.blue').length;
  			return humanCount;
		}
		function disableSpotsLeft() {
			var notHumanOrCpu = document.querySelectorAll("div.gridItem:not(.blue):not(.red)");
  				$(notHumanOrCpu).addClass("gray");
				$(notHumanOrCpu).addClass("notClickable");
				$('#resetButton').addClass("grayButton");
				$('#resetButton').css("display","block");
  				return;
			}
		function reset(){
			$('#resetButton').click(function(){
				$('.gridItem').removeClass("blue red gray notClickable");
				$('.gridItem').html("");
				$('#winningHeader').css("display","none");
				$('#resetButton').css("display","none");
			});
			onClick();
		}
  		function addHuman(event, choice){
  			choice = '#' + event.currentTarget.id;
					if ((humanPickedArray.includes(choice) == false) && (cpuPickedArray.includes(choice) == false)){	
							if (gameWinner[0] === undefined){
								$(choice).addClass("blue");
								$(choice).html("X");
								humanPickedArray.push(choice);
							} 
							if (!gameWinner.includes("Human") || !gameWinner.includes("CPU") == false){
								cpusTurn(choice);
							}
							decideWinner(gameWinner);
					} else if (humanPickedArray.includes(choice) == true && cpuPickedArray.includes(choice) == true){
							window.alert("Your choice has already been taken, please choose another.");
					} else {	
						// console.log(choice);
					}
  		}	