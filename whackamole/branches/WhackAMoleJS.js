function loadAll() {
	let prev; // Used to keep track of last professor's position.
	let scoreCount = 0; // Score for each prof hit
	var scoreBoard = document.getElementById('score'); // Get score HTML element
	var hiscore1 = document.getElementById('hiscore1'); // Get first high score HTML element
	var hiscore2 = document.getElementById('hiscore2'); // Get 2nd high score HTML element
	var hiscore3 = document.getElementById('hiscore3'); // Get 3rd high score HTML element
	var liveGame = 1; // 0 = game is live, 1 = game is dead
	var timeleft = 30; // game timer
	var countdown; // used to assing a time interval to
	const hand = document.querySelector('.hand'); //grabs hand div
	var profs = $('.prof');

	// Function to start game
	function startGame() {
		var splashScreen = $('#splash');
		$(splashScreen).hide();
		liveGame = 0;
		const index = randomizeProf(profs); // Get a random prof
		countdown = setInterval(timer, 1000);
		move(profs, index, randomizeTrustee()); // Pass profs and index into move function
	}

	// *******************
	// RANDOMIZE FUNCTIONS
	// *******************
	// Randomizes which prof is moving
	function randomizeProf(profs) {
		const index = Math.floor(Math.random() * profs.length); // Calculate random prof
		if (index == prev) { // Minimizes repeating profs
			return randomizeProf(profs);
		}
		prev = index; // Sets prev to current prof to compare in next method call
		return index;
	}
	// Randomizes chance of trustee to show up
	// MAY NEED BETTER IMPLEMENTATION
	function randomizeTrustee() {
		const trusteePop = Math.floor(Math.random() * 100) + 1;
		return trusteePop;
	}

	//fucntion to move proffesors
	function move(profs, index, trustpop) {
		// jQuery method that moves blocks by incrementing
		// the 'bottom' property at speed 400
		const trust = trustpop;
		var iProf = $(profs[index]); // Get individual professor
		if (liveGame == 0) {
			if (trust <= 50) { // If true, switch to trustee
				$(iProf).addClass("trustee");
			}
			$(iProf).click(function () {
				scoreUp(trust);
				$(this).finish();
			})
			$(iProf).animate({ bottom: '-2px' }, 900).animate({ bottom: '-128px' }, 900, function () {
				if (trust <= 50)
					$(this).removeClass("trustee");
				move(profs, randomizeProf(profs), randomizeTrustee());
				$(this).off("click");
			});
		}
	}

	// Function to increase score per successful click
	function scoreUp(trust) {
		if (trust <= 50)
			scoreCount += 5;
		else scoreCount++;
		console.log(scoreCount);
		scoreBoard.textContent = scoreCount;
	}

	//Function to reset the game.
	function restart() {
		liveGame = 1;
		scoreCount = 0;
		scoreBoard.innerHTML = scoreCount;
		timeleft = 30;
		hand.style.transform = `rotate(${90}deg)`;
		clearInterval(countdown);
	}


	//function to control and modift the time left in the game.
	function timer() {
		const handegree = (12 * (30 - timeleft)) + 102;
		console.log("timer: " + timeleft);
		if (timeleft == 1) {
			$(profs).finish();
			if (scoreCount > hiscore1.textContent) {
				hiscore3.textContent = hiscore2.textContent;
				hiscore2.textContent = hiscore1.textContent;
				hiscore1.textContent = scoreCount;
				endScore = scoreCount;
			}
			else if (scoreCount > hiscore2.textContent) {
				hiscore3.textContent = hiscore2.textContent;
				hiscore2.textContent = scoreCount;
				endScore = scoreCount;
			}
			else if (scoreCount > hiscore3.textContent) {
				hiscore3.textContent = scoreCount;
				endScore = scoreCount;
			}
			else
				endScore = scoreCount;
			$('#goScore').text(endScore);
			toggleModal();
			$('#gameover').show();
			restart();
		}
		else {
			hand.style.transform = `rotate(${handegree}deg)`;
			timeleft--;
		}
	}

	//**********************
	// MODAL LOGIC
	//**********************

	// Get the modal
	var modal = $('#pauseScreen');

	// --GAME PAUSE HANDLING--
	function resumeGame() {
		liveGame = 0;
		startGame();
		toggleModal();
	}

	// Specifically for toggle pause buttons
	function togglePause() {
		liveGame = 1;
		console.log("game is paused");
		clearInterval(countdown);
		$(profs).finish();
	}

	// Listens for user pressing P key
	// If true, run togglePause()
	window.addEventListener('keydown', function (e) {
		var key = e.keyCode;
		if (key === 80 && $(modal).is(':hidden')) { // Denotes the 'p' key
			togglePause();
			toggleModal();
			$('#pauseMenu').show();
		} else if (key == 80 & $(modal).is(':visible')) {
			resumeGame();
		}
	});

	// Toggles display of modal
	function toggleModal() {
		if ($(modal).is(':visible')) {
			$('#gameover').hide();
			$('#pauseMenu').hide();
			$(modal).hide();
			console.log("Modal closed");
		}
		else {
			$(modal).show();
			console.log("Modal open");
		}
	}
	// **************************
	// CLICK HANDLERS FOR BUTTONS
	// **************************
	// Adds click handler for pause menu's restart button
	$('#restart').click(function () {
		restart();
		toggleModal();
		startGame();
	});
	// Adds click handler for splash screen's start button
	$('#newstart').click(function () {
		startGame();
	});
	// Adds click handler for pause menu's resume button
	$('#resume').click(function() {
		resumeGame();
	});
	// Adds click handler for game over's restart button
	$('#gameoverbtn').click(function () {
		restart();
		toggleModal();
		startGame();
		// $('#gameover').hide();
	});
	// Adds click handler for pause menu's music button
	// NEEDS IMPLEMENTATION
	$('#music').click(function() {

	})
}
