let boxes = document.querySelectorAll(".btn");

let turnO = true;
let resetBtn = document.querySelector(".reset-btn");
let msg = document.querySelector(".msg");
let newGame = document.querySelector(".new-game");

let msgDraw = document.querySelector(".msgdraw");
let drawBtn = document.querySelector(".drawbtn");

let winmsg = document.querySelector(".winmsg");
let player1 = document.querySelector("#player1");
let player2 = document.querySelector("#player2");
let startBtn = document.querySelector(".entername");
let nameConatiner=document.querySelector(".name-container")

let nameInstruc =document.querySelector(".namemsg")

let winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let disableAll = () => {
  for (let box of boxes) {
    box.disabled = true;
    box.setAttribute('title','First start the game')
  }
};
let enableAll=()=>{
  for (let box of boxes) {
    box.disabled = false;
    box.removeAttribute('title')
  }
}

let hideMsg = () => {
  msg.classList.add("hide");
};

let hideMsgDraw = () => {
  msgDraw.classList.add("hidedraw");
};
let showWinner = () => {
  msg.classList.remove("hide");
  startBtn.classList.add("hide")
  resetBtn.classList.add("hide")
  nameInstruc.classList.add("hide")
  player1.classList.add("hide")
  player2.classList.add("hide")
};

let showDraw = () => {
  msgDraw.classList.remove("hidedraw");
  startBtn.classList.add("hide");
  resetBtn.classList.add("hide");
  nameInstruc.classList.add("hide")
  player1.classList.add("hide")
  player2.classList.add("hide")
};
let empltyBoxes=()=>{
for(let box of boxes){
  box.innerText=""
}
}
disableAll();
startBtn.classList.remove("hide")
player1.classList.remove("hide")
player2.classList.remove("hide")
nameInstruc.classList.remove("hide")
startBtn.addEventListener("click",()=>{
  enableAll();
  startBtn.classList.add("hide")
  resetBtn.classList.remove("hide")
  player1.disabled=true
  player2.disabled=true
  nameInstruc.classList.add("hide")
})

resetBtn.addEventListener("click",()=>{
  empltyBoxes();
  enableAll();
})

newGame.addEventListener("click",()=>{
  hideMsg();
  startBtn.classList.remove("hide")
  empltyBoxes();
  player1.value="";
  player2.value="";
  player1.disabled=false;
  player2.disabled=false;
  nameInstruc.classList.remove("hide")
  player1.classList.remove("hide")
  player2.classList.remove("hide")
})
drawBtn.addEventListener("click",()=>{
  hideMsgDraw();
  startBtn.classList.remove("hide")
  empltyBoxes();
  player1.value="";
  player2.value="";
  player1.disabled=false;
  player2.disabled=false;
  nameInstruc.classList.remove("hide")
  player1.classList.remove("hide")
  player2.classList.remove("hide")
})

let check = () => {
  for (let pattern of winningPatterns) {
    if (
      boxes[pattern[0]].innerText == boxes[pattern[1]].innerText &&
      boxes[pattern[1]].innerText == boxes[pattern[2]].innerText &&
      boxes[pattern[0]].innerText != ""
    ) {
      console.log("winner");
      disableAll();
      if (boxes[pattern[0]].innerText == "O") {
        winmsg.innerText = "Winner is... " + player1.value + "🎉";
      } else {
        winmsg.innerText = "Winner is... " + player2.value + "🎉";
      }
      showWinner()
     
      return true;
    }
  }
  return false;
};
let checkDraw = () => {
  let allFilled = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      allFilled = false;
      break;
    }
  }
  if (allFilled) {
    console.log("draw");
    
    showDraw();
  }
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
  
    if (turnO === true) {
      box.innerText = "O";
      turnO = false;
      box.disabled = true;
    } else {
      box.innerText = "X";
      turnO = true;
      box.disabled = true;
    }
    if (!check()) {
      checkDraw();
    }
  });
});

