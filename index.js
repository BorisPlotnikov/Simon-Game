var buttonColors = ["green", "red", "yellow", "blue"];
var sequence = [];
var playerSequence = [];
var level = 0;

rules();
gameReady();

function gameReady() {
  $(document).off("click");
  $(document).click(gameStart);
}

function gameStart() {
  $(document).off("click");
  $("#text-container").stop(rules).fadeOut("slow");
  $(".btn").fadeTo(1000, 1);
  setTimeout(newMove, 1000);
}

function newMove() {
  nextLevel();
  var randomNumber = Math.floor(Math.random() * 4);
  var color = buttonColors[randomNumber];
  animation(color, "pop");
  sound(color);
  sequence.push(color);
  playerReady();
}

function playerReady() {
  $(".btn").click(playerMove);
}

function playerMove() {
  $(".btn").off("click");
  var playerColor = $(this).attr("id");
  sound(playerColor);
  animation(playerColor, "press");
  playerSequence.push(playerColor);
  evaluation();
}

function evaluation() {
  if (playerSequence[(playerSequence.length - 1)] === sequence[(playerSequence.length - 1)]) {
    if (playerSequence.length === sequence.length) {
      setTimeout(newMove, 1000);
    } else {
      playerReady();
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  sound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200)
  $(".btn").fadeTo(1000, 0.1);
  level = 0;
  sequence = [];
  gameRestart();
}

function gameRestart() {
  level = 0;
  $("#level-title").fadeOut("fast");
  setTimeout(function() {
    $("#level-title").text("Game over. Click Anywhere To Start.");
  }, 200);
  $("#level-title").fadeIn("fast");
  $(document).click(gameReady);
}

function animation(color, animation) {
  $("#" + color).addClass(animation);
  setTimeout(function() {
    $("#" + color).removeClass(animation);
  }, 200)
}

function sound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function nextLevel() {
  playerSequence = [];
  level++;
  $("#level-title").fadeOut("fast");
  setTimeout(function() {
    $("#level-title").text("Level " + level);
  }, 200);
  $("#level-title").fadeIn("fast");
}

function rules() {
  $("#text-container").css("top", "100%");
  if ($(document).width() <= 480) {
    $("#text-container").animate({
      top: "-54%"
    }, 20000, rules);

  } else if ($(document).width() <= 768) {
    $("#text-container").animate({
      top: "-51%"
    }, 20000, rules);

  } else if ($(document).width() <= 1280) {
    $("#text-container").animate({
      top: "-55%"
    }, 20000, rules);

  } else {
    $("#text-container").animate({
      top: "-52%"
    }, 20000, rules);
  }
}
