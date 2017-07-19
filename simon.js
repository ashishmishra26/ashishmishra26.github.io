//object which contain some properties of game.
var game={
stage:0,
possible:['button-1','button-2','button-3','button-4'],
currentSequence:[],
playerMoves:[],
strict:false,



};
//To return game to its initial configuration.
function reset(){                                       
            setStrict();
            document.getElementById("count").value="--";
            buttonDisable();
            game.currentSequence=[];
            game.playerMove=[];
            game.strict=false;
            game.stage=0;

        
}



window.onload=function(){
    buttonDisable();
    
};

function checkOnOff(){
         return (document.getElementById('check').checked);
}

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

function start(){
   // buttonDisable();
  /* game.stage=0;
    game.currentSequence=[];
    game.playerMoves=[];*/

    if(checkOnOff()===true)
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
function addCount(){
   // buttonDisable();
    game.stage++;
    document.getElementById('count').value=game.stage;

    generateSequence();
}


function generateSequence(){
    if(checkOnOff()===true)
        {
        game.currentSequence.push(game.possible[(Math.floor(Math.random()*4))]);
        showSequence();
        }
}
     
function showSequence(){
    if(checkOnOff()===true)
       {
         buttonDisable();
        
         
         document.getElementById('count').value=game.stage;
         var i=0;
         if(game.currentSequence.length!=0){
         var moves=setInterval(function(){
         showMove(game.currentSequence[i]);
          i++;
         if(i>=game.currentSequence.length)
         {
            clearInterval(moves);
         }},800);
         setTimeout(function(){
             buttonEnable();
           
        },(game.stage*1000));
         clearPlayer();
         }
    }
}

function clearPlayer(){
game.playerMoves=[];


}

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
               
                  playAudio('wrong');
                  wrongBlink();
                  
                  showSequence();
                  buttonEnable();
            }
    }
 else
    {
      if(length1==length2)
        {
            if(game.stage===20)
                {
                reset();
                console.log("YOU WON!!!!");
                
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


function toggle(){
    if(checkOnOff()===false)
        {
            reset();
        }
        
}

function buttonDisable(){
document.getElementById("button-1").setAttribute("disabled","disabled");
document.getElementById("button-2").setAttribute("disabled","disabled");
document.getElementById("button-3").setAttribute("disabled","disabled");
document.getElementById("button-4").setAttribute("disabled","disabled");
}
function buttonEnable(){
document.getElementById("button-1").removeAttribute("disabled");
document.getElementById("button-2").removeAttribute("disabled");
document.getElementById("button-3").removeAttribute("disabled");
document.getElementById("button-4").removeAttribute("disabled");
}