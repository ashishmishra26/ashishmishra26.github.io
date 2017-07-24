
var game={                                 //object which contain properties of game.
     stage:0,                              //current stage of game.
     possible:['button-1','button-2','button-3','button-4'],    //array for possible value for random generator.
     currentSequence:[],                                        //array for current sequence of game
     playerMoves:[],                                            //array for storing player moves
     strict:false,                                              //variable for strict mode state
     timeout:NaN,                                               
};

function reset(){                                   //function for reseting the game.                  
    if(game.strict===true){
        setStrict();
    }
    clearTimeout(game.timeout);
    document.getElementById("count").value="";
    buttonDisable();
    game.currentSequence=[];
    game.playerMove=[];
    game.strict=false;
    game.stage=0;
}

window.onload=function(){                  //to disable buttons when game starts.
    buttonDisable();
};

function checkOnOff(){                         //to check status of toggle button.
    return (document.getElementById('check').checked);
}

function setStrict(){                          //to set and reset strict button.
    if(checkOnOff()===true)
        {
            if(game.strict===false){
                document.getElementById('strict').style.backgroundColor = "red";
                game.strict=true;
            }
            else{
                document.getElementById('strict').style.backgroundColor = "black";
                game.strict=false;
            }
            return game.strict;
        }
        else{
            document.getElementById('strict').style.backgroundColor = "black";
        }
}

function start(){            //initial function, called when start button is clicked.
    if(checkOnOff()===true)
        {
            game.stage=0;
            game.currentSequence=[];
            game.playerMoves=[];
            addCount();              //calls addcount function when game is on.
        }
        else{
            return;                  //if game is off return.
        }
}

function addCount(){                      //to increase the count of stages.
    game.stage++;
    document.getElementById('count').value=game.stage;
    generateSequence();                   //call to generate sequence of random button.
}

function generateSequence(){              //for generating sequence
    if(checkOnOff()===true){
        game.currentSequence.push(game.possible[(Math.floor(Math.random()*4))]);  //use of Math.random to generate random number.
        showSequence();                   //function call to show sequence to user by flashing buttons.
    }
}
function showSequence(){                    //function to show the sequence by flashing the buttons.
    var i=0,moves;
    if(checkOnOff()===true){
        buttonDisable();                                                           //disable buttons while showing sequence
        document.getElementById("button-5").setAttribute("disabled","disabled");
        document.getElementById('count').value=game.stage;
        if(game.currentSequence.length!=0){
            moves=setInterval(function(){                     //set an interval to control sequence.
            showMove(game.currentSequence[i]);                //function call to flash each buttons.
            i=i+1;
            if(i>=game.currentSequence.length){
                clearInterval(moves);                         //if all button are shown to user,clear the interval.
            }
        },800);
        setTimeout(function(){                                 
            buttonEnable();                                                 //enable the buttons once again
            document.getElementById("button-5").removeAttribute("disabled");
        },(game.stage*1000));
        game.playerMoves=[];
    }
    game.timeout=setTimeout(function(){
        wrongBlink();
        playAudio('wrong');
        if(game.strict){
            start();
        }
        else{
            showSequence();
        }
    },10000);
}
}

function showMove(id){                                       //for showing perticular button and audio play.
    if(checkOnOff()==true){
        document.getElementById(id).style.opacity="0.6";
        playAudio(id);
        setTimeout(function(){
        document.getElementById(id).style.opacity="1";
    },300);
}
}

function addPlayerMove(id){                        //called when user clicks button as a move.
    if(game.timeout){                              //if a user click the button under the time then clear it.
        clearTimeout(game.timeout); 
    }
    if(checkOnOff()===true){
        game.playerMoves.push(id);                 //add the button to playerMoves array.
        playAudio(id);                             //play audio of perticular button.
        playerTurn(id);                            //call playerTurn with button id.
    }
    else{
    return;
}
}

function wrongBlink(){                             //to blink the wrong signal when user clicks wrong button in sequence.
    setTimeout(function(){
        document.getElementById("count").value="!"+" "+"!";
    },0);
    setTimeout(function(){
        if(game.stage!=0){
        document.getElementById("count").value=game.stage;
    }
    else{
        document.getElementById("count").value="!"+" "+"!"; 
    }
},200);
}

function playerTurn(input){
    var length1=game.playerMoves.length;                                
    var length2=game.currentSequence.length;                            
    if(game.playerMoves[length1-1]!==game.currentSequence[length1-1]){      //check if user input is right.
        if(game.strict===true){                       //check if strict mode is on
            buttonDisable();                           
            playAudio('wrong');                       
            wrongBlink();                             
            game.currentSequence=[];                  
            game.playerMoves=[];                     
            start();                                  
        } 
        else{                                         //if strict mode is off 
            buttonDisable();                            
            playAudio('wrong');                       
            wrongBlink();
            showSequence();                           //show the sequence again.
        } 
    }
    else{
     if(length1==length2){                            //check if user has clicked all buttons of sequence correctly.
         if(game.stage===20){                         //check if current stage of game is 20 
            document.getElementById("mssg").innerHTML="YOU WON";
            reset();
            setTimeout(function(){
            document.getElementById("mssg").innerHTML="";   
        },2000);
        document.getElementById("check").checked=false;
    }
    else{                                                //if final stage is not cleared.
       addCount();                                       //call addCount function to increase the level.
    }
}
}
}
function playAudio(id)                    //for playing sounds.
{
    var x;
    if(id=='button-1'){
        x=document.getElementById("Red");
        x.play();
    }
    else if(id=='button-2'){
        x=document.getElementById("Blue");
        x.play();
    }
    else if(id=='button-3'){
        x=document.getElementById("Green");
        x.play();
    }
    else if(id=='button-4'){
        x=document.getElementById("Yellow");
        x.play();
    }
    else if(id=='wrong'){
        x=document.getElementById("Wrong");
        x.play(); 
    } 
}
function toggle(){                          //change toggle switch
    if(checkOnOff()===false){
        reset();
    }
    else{
        document.getElementById("count").value="--";
    }
}
function buttonDisable(){                 //To return game to its initial configuration. 
     document.getElementById("button-1").setAttribute("disabled","disabled");
     document.getElementById("button-2").setAttribute("disabled","disabled");
     document.getElementById("button-3").setAttribute("disabled","disabled");
     document.getElementById("button-4").setAttribute("disabled","disabled");
}

function buttonEnable(){                     //to enable buttons.
     document.getElementById("button-1").removeAttribute("disabled");
     document.getElementById("button-2").removeAttribute("disabled");
     document.getElementById("button-3").removeAttribute("disabled");
     document.getElementById("button-4").removeAttribute("disabled");
}