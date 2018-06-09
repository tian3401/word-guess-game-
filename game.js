//Variables================================================================================================ 
var winsCounter;
var numberOfGuesses;
var computerWordBank;
var computerRanNum;
var computerGenWord;
var computerGenWordLowCase;
var userWrongLetters;
var userCorrectLetters;
var blanks;
var k;
var correctLetters;
var repeatedLetterWord;
var correctLetAlreadyGuessed;
var vid;
var video;
var source;
var v;
var cover;


//Global Variables==========================================================================================     
winsCounter=0;
computerWordBank= ["BadWolves", "JohnLegend","CnBlue","ShipwreckAndZookeepers","Heize"];
blanks=[];
correctLetAlreadyGuessed=[];
v= new Array();
    v[0]= ["Ark.mp4"];
    v[1]= ["All Of Me.mp4"];
    v[2]= ["Zombie.mp4"];
    v[3]= ["Between Us.mp4"];
    v[4]= ["Star.mp4"];
cover= new Array();
    cover[0]= ["shipwreck&zookeepers.jpg"];
    cover[1]= ["john.jpg"];
    cover[2]= ["badwolves.jpg"];
    cover[3]= ["cnblue.jpg"];
    cover[4]= ["heize.png"];
 
//Functions=================================================================================================


function startGame(){
    //Starts the game by generating random word 
    computerRanNum= Math.floor(Math.random()*(computerWordBank.length));
    computerGenWord= computerWordBank[computerRanNum];
    computerGenWordLowCase= computerGenWord.toLowerCase();
    //Sets up number of guesses
    numberOfGuesses=10;
    //Sets arrays to default 
    correctLetters=0;
    userCorrectLetters=[];
    document.querySelector("#guessesRemaining").innerText= numberOfGuesses;
    userWrongLetters=[]
    document.querySelector("#lettersGuessed").innerText= userWrongLetters;
    blanks=[];
    document.querySelector("#secretWord").innerText= blanks.join(" ");
    
    //Puts blanks for each letter of the computer generated word
    for(i=0;i<computerGenWord.length;i++){
        if(correctLetters<computerGenWordLowCase.length){
        blanks.push('_ ');
        //Gets rid of the commas in the array by joining the indices    
        document.querySelector("#secretWord").innerText= blanks.join(" ");
        }
    }
}

//The function runs based on what keys the user presses
function userAction(){
    k=event.key; 

    //Checks to see if the user has guessed the wrong letter before
    if(computerGenWordLowCase.indexOf(k)===-1){
        //Updates wrong selections and puts in the wrongLetters array
        if(userWrongLetters.indexOf(k)===-1){
        //If wrong letter is unique run the following 
        userWrongLetters.push(k);
        document.querySelector("#lettersGuessed").innerText= userWrongLetters;
        numberOfGuesses = numberOfGuesses-1;
            //Restarts the game if guesses hit 0
            if(numberOfGuesses===0){
            startGame();
            }
            else{
            document.querySelector("#guessesRemaining").innerText= numberOfGuesses;
            }
        }
    }
    //Contains the for loop to replace the letters of the blanks
    else{
        for(j=0;j<computerGenWordLowCase.length;j++){
            if(computerGenWordLowCase[j]===k){
            blanks[j]=k;
            document.querySelector("#secretWord").innerText= blanks.join(" ");
            //Correct letters will increment by 1 if found in the array 
            correctLetters++;
            //Ensures that repeated correct letters are not stored in userCorrectLetters array
            if(userCorrectLetters.indexOf(k)>-1){
            }
            else{
            userCorrectLetters.push(k);
            } 
            }
        }
        //Increment wins counter and restarts game 
        if(correctLetters===computerGenWordLowCase.length){
        winsCounter++; 
        document.querySelector("#numberOfWins").innerText =winsCounter;    
        changeVid();
        playVideo();
        startGame();
        } 
    }
}

function changeVid(){
    if(computerGenWord==="ShipwreckAndZookeepers"){
        document.querySelector("video").setAttribute("src", v[0]);
        document.querySelector("#backgroundImage").setAttribute("style","background-image: url("+ cover[0]+")");
    }
    else if(computerGenWord==="JohnLegend"){
        document.querySelector("video").setAttribute("src",v[1]);
        document.querySelector("#backgroundImage").setAttribute("style","background-image: url("+ cover[1]+")");

    }
    else if(computerGenWord==="BadWolves"){
        document.querySelector("video").setAttribute("src",v[2]);
        document.querySelector("#backgroundImage").setAttribute("style","background-image: url("+ cover[2]+")");
    }
    else if(computerGenWord==="CnBlue"){
        document.querySelector("video").setAttribute("src",v[3]);
        document.querySelector("#backgroundImage").setAttribute("style","background-image: url("+ cover[3]+")");
    }
    else if(computerGenWord==="Heize"){
        document.querySelector("video").setAttribute("src",v[4]);
        document.querySelector("#backgroundImage").setAttribute("style","background-image: url("+ cover[4]+")");
    }
}

function playVideo(){
    vid= document.getElementById("videoPlayer"); 
    vid.play();
}

window.onload= startGame;
document.onkeyup= userAction;