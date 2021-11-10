let click = new Audio("media/click.mp3");
let win = new Audio("media/win.mp3");
let turn = "X";
let flag = false;
let reset= document.getElementById("reset");


//Function to change the turn
const changeTurn = () => {
    if (turn === "X")
        return "0";
    else
        return "X";
}

//Function to check win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("text"); //boxtext now has the span element of class text
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && boxtext[e[0]].innerHTML!=="") {
            document.getElementsByClassName("info")[0].innerHTML = boxtext[e[0]].innerHTML + " " + " has won";
            flag = true;
            win.play();
            document.querySelector(".img").getElementsByTagName("img")[0].style.width="15rem";
        }
    })
}

//Game Logic
let boxes = document.getElementsByClassName("box");
let counter=0;
Array.from(boxes).forEach((element) => {    
   //forEach function will call the arrow function once for each ele in the array derived from boxes class
    let boxtext = element.querySelector(".text"); //boxtext now has the span element of class text
    element.addEventListener('click', () => {
        if (boxtext.innerHTML === "" ) {     
            counter++;        //counter is counted everytime its clicked
            boxtext.innerHTML =turn;
            turn = changeTurn();                 
            click.play();
            checkWin();                         
            if (!flag && counter!==9)
                document.getElementsByClassName("info")[0].innerHTML = "Turn for " + turn;      
        }
            // isTie();
            if(isTie()){
                win.play();
                document.getElementsByClassName("info")[0].innerHTML="Its a tie";
                document.querySelector(".img").getElementsByTagName("img")[0].style.width="15rem";}
    })
})

function isTie(){
    if(counter===9 && !flag)
        return true
    else
        return false
}
//Reset button logic
reset.addEventListener("click", ()=>{
    let boxtexts= document.querySelectorAll(".text");
    Array.from(boxtexts).forEach(element=>{
        element.innerText="";
    })
    flag=false;
    turn="X";
    document.querySelector(".img").getElementsByTagName("img")[0].style.width="0";
    document.getElementsByClassName("info")[0].innerText="X goes first";
})
