//object which contain some properties of game.
var game={
stage:0,
possible:['button-1','button-2','button-3','button-4'],
currentSequence:[],
playerMoves:[],
strict:false,
};

//To return game to its initial configuration.
function buttonDisable(){
document.getElementById("button-1").setAttribute("disabled","disabled");
document.getElementById("button-2").setAttribute("disabled","disabled");
document.getElementById("button-3").setAttribute("disabled","disabled");
document.getElementById("button-4").setAttribute("disabled","disabled");
}

//To enable buttons
function buttonEnable(){
document.getElementById("button-1").removeAttribute("disabled");
document.getElementById("button-2").removeAttribute("disabled");
document.getElementById("button-3").removeAttribute("disabled");
document.getElementById("button-4").removeAttribute("disabled");
}


function reset(){                                       
            setStrict();
            document.getElementById("count").value="--";
            buttonDisable();
            game.currentSequence=[];
            game.playerMove=[];
            game.strict=false;
            game.stage=0;

        
}


//to disable buttons when game starts.
window.onload=function(){
    buttonDisable();
    
};

//to check status of toggle button.
function checkOnOff(){
         return (document.getElementById('check').checked);
}



//to set and reset strict button.
function setStrict(){
    if(checkOnOff()===true)
        {
          if(game.strict===false)
           {
            document.getElementById('strict').style.backgroundColor = "red";
            game.strict=true;
           }
          else
           {
           document.getElementById('strict').style.backgroundColor = "black";
           game.strict=false;
           }    

         return game.strict;
        }
    else
        {
         document.getElementById('strict').style.backgroundColor = "black"; 
        }

}

//initial function, called when start button is clicked.
function start(){
   
    if(checkOnOff()===true) //checking for toggle button,if it is true then proceed.
        {
          gameStart();
        }
    else
        {
          return;
        }    
}

function gameStart(){
    game.stage=0;
    game.currentSequence=[];
    game.playerMoves=[];
         addCount();
}

function addCount(){        //to increase the count of stages.
   
    game.stage++;
    document.getElementById('count').value=game.stage;

    generateSequence();
}


//for generating random sequence
function generateSequence(){   
    if(checkOnOff()===true)
        {
        game.currentSequence.push(game.possible[(Math.floor(Math.random()*4))]);  //use of Math.random to generate random number.
        showSequence();
        }
}
    
//function to show the sequence by flashing the buttons.
function showSequence(){
    if(checkOnOff()===true)
       {
         buttonDisable();       //disable the button while showing sequence.
         document.getElementById("button-5").setAttribute("disabled","disabled");
         document.getElementById('count').value=game.stage;
         var i=0;
         if(game.currentSequence.length!=0)
        {
           var moves=setInterval(function(){
           showMove(game.currentSequence[i]);
            i++;
           if(i>=game.currentSequence.length)
             {
            clearInterval(moves);
            }},800);

         setTimeout(function(){
             buttonEnable();         //enable the buttons once again.
             document.getElementById("button-5").removeAttribute("disabled");
         },(game.stage*1000));
         clearPlayer();              
         }
    }
}

//clear player moves
function clearPlayer(){
game.playerMoves=[];


}

//for showing perticular button and audio play.
function showMove(id){

if(checkOnOff()==true){
    document.getElementById(id).style.opacity="0.6";
    playAudio(id);

setTimeout(function(){
   document.getElementById(id).style.opacity="1";
   console.log(id); 
},300);


}

}

//called when user clicks button as a move.
function addPlayerMove(id){
    if(checkOnOff()===true)
        {
         
        
         game.playerMoves.push(id);
         playAudio(id);
         console.log(game.currentSequence);
         console.log(game.playerMoves);
         playerTurn(id);
        
    }
else{
    return;
}
}

    function wrongBlink(){
        setTimeout(function(){
           document.getElementById("count").value="!"+" "+"!";
        },0);
        setTimeout(function(){
           document.getElementById("count").value=game.stage;
           
        },200);
    }

function playerTurn(input){
    var length1=game.playerMoves.length;
    var length2=game.currentSequence.length;
if(game.playerMoves[length1-1]!==game.currentSequence[length1-1])
    {
       

       if(game.strict===true)
        {
           
            document.getElementById('count').value=0;
            playAudio('wrong');
            wrongBlink();
            game.currentSequence=[];
            game.playerMoves=[];
            start();
        }
        else
            {
                  buttonDisable();
                  playAudio('wrong');
                  wrongBlink();
                  showSequence();
                  
            }
    }
 else
    {
      if(length1==length2)
        {
            if(game.stage===20)
                {
                reset();
                alert("YOU WON!!!!");
                
                }
             else
                {
           nextStage();
                }
        
        }
     
       
    }       

}


function nextStage(){
    addCount();
}

//for playing sounds.
function playAudio(id)
{
    var x;
    if(id=='button-1')
        {
            x=document.getElementById("Red");
            x.play();
        }
        else if(id=='button-2')
            {
            x=document.getElementById("Blue");
            x.play();
            }
        else if(id=='button-3')
            {
            x=document.getElementById("Green");
            x.play();
            }
        else if(id=='button-4')
            {
            x=document.getElementById("Yellow");
            x.play();
            }
        else if(id=='wrong')
            {
            x=document.getElementById("Wrong");
            x.play(); 
            }
}

//change toggle swith
function toggle(){
    if(checkOnOff()===false)
        {
            reset();
        }
        
}

//TO disable buttons
