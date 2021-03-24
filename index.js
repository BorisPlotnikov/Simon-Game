//                          Modules

// Credits Style Game Description

function rules() {

  $("#text-container").css("top", "100%");

  if (innerWidth <= 480) {

    $("#text-container").animate({
      top: "-54%"
    }, 20000, rules);

  } else if (innerWidth <= 768) {

    $("#text-container").animate({
      top: "-51%"
    }, 20000, rules);

  } else if (innerWidth <= 1280) {

    $("#text-container").animate({
      top: "-55%"
    }, 20000, rules);

  } else {

    $("#text-container").animate({
      top: "-52%"
    }, 20000, rules);

  }

}
rules();



// Level Change

function levelChangeStep1() {
  $("#level-title").text("Level " + level);
}

function levelChange() {
  level++;
  $("#level-title").fadeOut("fast");
  setTimeout(levelChangeStep1, 200);
  $("#level-title").fadeIn("fast");
}



// Game Over

function gameOverStep1() {
  $("#level-title").text("Game Over");
}

function gameOverStep2() {
  $("#reload-message").fadeTo(200, 1);
}

function gameOver() {
  $("#level-title").fadeOut("fast");
  setTimeout(gameOverStep1, 200);
  $("#level-title").fadeIn("fast");
  setTimeout(gameOverStep2, 800);
}



// Sound

function activateSound(buttonColor) {

  var audio = new Audio("sounds/" + buttonColor + ".mp3");
  audio.play();

}



// Animation

function activateAnimation(buttonColor) {

  $("#" + buttonColor).fadeOut(100).fadeIn(100);

}



//                      Variable and Array Components

var buttons = ["green", "red", "yellow", "blue"];
var computerSequence = [];
var playerSequence = [];
var level = 0;
var started = false;



//                             Game Assembly



// Start


$(document).on("click keypress touchstart", function() {

  $("#text-container").stop().fadeOut("slow");
  $(".btn").fadeTo(1000, 1);

  if (!started) {

    setTimeout(computerChosingColor, 1000);
    started = true;

  }

});



// Move by computer

function computerChosingColor() {

  playerSequence = [];
  levelChange()
  var randomNumber = Math.floor(Math.random() * 4);
  var computersChoice = buttons[randomNumber];
  activateSound(computersChoice);
  activateAnimation(computersChoice);
  computerSequence.push(computersChoice);
  playerChoosingColor();

}



// Move by player

function playerChoosingColor() {

  $(".btn").off().click(function() {

    var playersChoice = $(this).attr("id");
    activateSound(playersChoice);
    activateAnimation(playersChoice);
    playerSequence.push(playersChoice);



    // Evaluation

    if (playerSequence[(playerSequence.length - 1)] === computerSequence[(playerSequence.length - 1)]) {

      if (playerSequence.length === computerSequence.length) {

        setTimeout(computerChosingColor, 1000);

      } else {

        playerChoosingColor();

      }

    } else {



      // Game end

      $(".btn").fadeTo(1000, 0.1);
      $(".btn").off();
      gameOver()
      setTimeout(location.reload.bind(location), 3000);

    }

  })

}
