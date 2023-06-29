var gamePattern = [];
var buttonColors = ["red","green","blue","yellow"];
var userPattern = [];
var level = 0
var started = false;

if (!started){
    $(document).on("keydown",function(){
        nextSequence();
        started = true;
    })

}


function nextSequence(){
    userPattern = [];
    level++;
    $("h1").text("Level "+level)
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    $("#"+randomColor).fadeOut(500).fadeIn(500);
    soundPlay(randomColor);
}

$(".btn").on("click",function(){
    var userChosenColor = this.id;
    userPattern.push(userChosenColor)
    soundPlay(userChosenColor);
    buttonAnimation(userChosenColor);
    checkAnswer(userPattern.length-1)
})


function soundPlay(name){
    var aud1 = new Audio(name+".mp3")
    aud1.play();
}

function buttonAnimation(name){
    $("#"+name).addClass("pressed");
    setTimeout(() => {
        $("#"+name).removeClass("pressed");
    }, 100);
}



function checkAnswer(currentlevel){
    if (userPattern[currentlevel]==gamePattern[currentlevel]){
        if (userPattern.length == gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        $("h1").text("Game over,press any key to restart")
        var aud3 = new Audio("wrong.mp3")
        aud3.play();

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    started = false;
    level = 0;

}
