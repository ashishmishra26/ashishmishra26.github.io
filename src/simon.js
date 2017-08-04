
var game= { //object which contain properties of game.
    stage: 0, //current stage of game.
    possible: ["button-1","button-2","button-3","button-4"], //array for possible value for random generator.
    currentSequence: [], //array for current sequence of game
    playerMoves: [], //array for storing player moves
    strict: false, //variable for strict mode state
    timeout: NaN,
    test:0,
};
var GameObject={};

GameObject.reset=function (){ //function for reseting the game.                  
    if (game.strict === true) {
        GameObject.setStrict();
    }
    clearTimeout(game.timeout);
    document.getElementById("count").value = "";
    GameObject.buttonDisable();
    game.currentSequence = [];
    game.playerMove = [];
    game.strict = false;
    game.stage = 0;
};

window.onload = function () { //to disable buttons when game starts.
    GameObject.buttonDisable();
};

GameObject.checkOnOff=function () { //to check status of toggle button.
    return document.getElementById("check").checked;
};

GameObject.setStrict=function() { //to set and reset strict button.
    if (GameObject.checkOnOff() === true) {
        if (game.strict === false) {
            document.getElementById("strict").style.backgroundColor = "red";
            game.strict = true;
        } else {
            document.getElementById("strict").style.backgroundColor = "black";
            game.strict = false;
        }
        return game.strict;
    } else {
        document.getElementById("strict").style.backgroundColor = "black";
    }
};
GameObject.start=function (){ //initial function, called when start button is clicked.
    game.stage = 0;
    game.currentSequence = [];
    game.playerMoves = [];
    GameObject.addCount(); //calls addcount function when game is on.
};

GameObject.addCount=function () { //to increase the count of stages.
    game.stage++;
    GameObject.displayCount();
    GameObject.generateSequence(); //call to generate sequence of random button.
};

GameObject.displayCount=function() {
    if (game.stage.toString().length == 1) {
        document.getElementById("count").value = "0" + game.stage;
    } else {
        document.getElementById("count").value = game.stage;
    }
};

GameObject.generateSequence=function() { //for generating sequence
    if (GameObject.checkOnOff() === true) {
        game.currentSequence.push(game.possible[(Math.floor(Math.random() * 4))]); //use of Math.random to generate random number.
        GameObject.showSequence(); //function call to show sequence to user by flashing buttons.
    }
};

GameObject.showSequence=function(){ //function to show the sequence by flashing the buttons.
    var i = 0,moves;
    if (GameObject.checkOnOff() === true) {
        GameObject.buttonDisable(); //disable buttons while showing sequence
        document.getElementById("button-5").setAttribute("disabled", "disabled");
        if (game.stage.toString().length == 1) {
            document.getElementById("count").value = "0" + game.stage;
        } else {
            document.getElementById("count").value = game.stage;
        }
        if (game.currentSequence.length != 0) {
            moves = setInterval(function () { //set an interval to control sequence.
                GameObject.showMove(game.currentSequence[i]); //function call to flash each buttons.
                i = i + 1;
                if (i >= game.currentSequence.length) {
                    clearInterval(moves); //if all button are shown to user,clear the interval.
                }
            },800);
            setTimeout(function () {
                GameObject.buttonEnable(); //enable the buttons once again
                document.getElementById("button-5").removeAttribute("disabled");
            }, (game.stage * 1000));
            game.playerMoves = [];
        }else{
            return 22;
        }
    }else{
        return 23;
    }
};

GameObject.showMove = function(id){ //for showing perticular button and audio play.
    if (GameObject.checkOnOff() == true) {
        document.getElementById(id).style.opacity = "0.6";
        GameObject.playAudio(id);
        setTimeout(function () {
            document.getElementById(id).style.opacity = "1";
        }, 300);
    }else{
        return 56;
    }
};

GameObject.addPlayerMove=function(id) { //called when user clicks button as a move.
    if (GameObject.checkOnOff() === true) {
        game.playerMoves.push(id); //add the button to playerMoves array.
        GameObject.playAudio(id); //play audio of perticular button.
        GameObject.playerTurn(id); //call playerTurn with button id.
    }else {
        return 5;
    }
};

GameObject.wrongBlink=function() { //to blink the wrong signal when user clicks wrong button in sequence.
    setTimeout(function () {
        document.getElementById("count").value = "!" + " " + "!";
    }, 0);
    setTimeout(function () {
        if (game.stage != 0) {
            GameObject.displayCount();
        } else {
            document.getElementById("count").value = "!" + " " + "!";
        }
    }, 200);
};

GameObject.playerTurn=function() {
    var length1 = game.playerMoves.length;
    var length2 = game.currentSequence.length;
    if (game.playerMoves[length1 - 1] !== game.currentSequence[length1 - 1]) { //check if user input is right.
        if (game.strict === true) { //check if strict mode is on
            GameObject.buttonDisable();
            GameObject.playAudio("wrong");
            GameObject.wrongBlink();
            game.currentSequence = [];
            game.playerMoves = [];
            GameObject.start();
        }else { //if strict mode is off 
            GameObject.buttonDisable();
            GameObject.playAudio("wrong");
            GameObject.wrongBlink();
            GameObject.showSequence(); //show the sequence again.
        }
    } else{
        if (length1 == length2) { //check if user has clicked all buttons of sequence correctly.
            if (game.stage === 20) { //check if current stage of game is 20 
                document.getElementById("mssg").innerHTML = "YOU WON";
                GameObject.reset();
                setTimeout(function () {
                    document.getElementById("mssg").innerHTML = "";
                }, 2000);
                document.getElementById("check").checked = false;
            } else { //if final stage is not cleared.
                GameObject.addCount(); //call addCount function to increase the level.
            }
        }
    }
};

GameObject.playAudio=function(id){
    if (id == "button-1") {
        document.getElementById("Red").play();
    } else if (id == "button-2") {
        document.getElementById("Blue").play();
    } else if (id == "button-3") {
        document.getElementById("Green").play();
    } else if (id == "button-4") {
        document.getElementById("Yellow").play();
    } else if (id == "wrong") {
        document.getElementById("Wrong").play();
    }
};

GameObject.toggle=function() { //change toggle switch
    if (GameObject.checkOnOff() === false) {
        GameObject.reset();
    } else {
        document.getElementById("count").value = "--";
    }
};

GameObject.buttonDisable=function() { //To disable button.
    document.getElementById("button-1").disabled=true;
    document.getElementById("button-2").disabled=true;
    document.getElementById("button-3").disabled=true;
    document.getElementById("button-4").disabled=true;
   
};

GameObject.buttonEnable=function(){ //to enable buttons.
    document.getElementById("button-1").disabled=false;
    document.getElementById("button-2").disabled=false;
    document.getElementById("button-3").disabled=false;
    document.getElementById("button-4").disabled=false;
    return 5;
};

