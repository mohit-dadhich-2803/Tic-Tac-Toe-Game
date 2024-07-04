let boxes = document.querySelectorAll(".btn");
let resetBtn = document.querySelector(".reset-btn");
let msg = document.querySelector(".msg");
let newGame = document.querySelector(".new-game");
let msgDraw = document.querySelector(".msgdraw");
let drawBtn = document.querySelector(".drawbtn");
let winmsg = document.querySelector(".winmsg");
let player1 = document.querySelector("#player1");

let startBtn = document.querySelector(".entername");
let nameInstruc = document.querySelector(".namemsg");

let botPlayer = "X";
let currentPlayer = "O";

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
    box.setAttribute("title", "first start the game ");
  }
};

let enableAllBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.removeAttribute("title");
  }
};

let emptyBoxes = () => {
  for (let box of boxes) {
    box.innerText = "";
  }
};

let hideMsg = () => {
  msg.classList.add("hide");
};

let hideMsgDraw = () => {
  msgDraw.classList.add("hidedraw");
};

let showWinner = (winner) => {
  msg.classList.remove("hide");
  winmsg.innerText = `Winner is... ${winner} 🎉`;
  resetBtn.classList.add("hide");
  player1.classList.add("hide");
  nameInstruc.classList.add("hide");
};

let showDraw = () => {
  msgDraw.classList.remove("hidedraw");
  resetBtn.classList.add("hide");
  player1.classList.add("hide");
  nameInstruc.classList.add("hide");
};

let checkWin = (player) => {
  for (let pattern of winningPatterns) {
    if (
      boxes[pattern[0]].innerText === player &&
      boxes[pattern[1]].innerText === player &&
      boxes[pattern[2]].innerText === player
    ) {
      return true;
    }
  }
  return false;
};

let checkDraw = () => {
  for (let box of boxes) {
    if (box.innerText === "") {
      return false;
    }
  }
  return true;
};

disableAll();
startBtn.classList.remove("hide");
resetBtn.classList.add("hide");
player1.classList.remove("hide");
nameInstruc.classList.remove("hide");

startBtn.addEventListener("click", () => {
  enableAllBoxes();
  emptyBoxes();
  player1.disabled = true;
  startBtn.classList.add("hide");
  resetBtn.classList.remove("hide");
  currentPlayer = "O";
  botPlayer = "X";
  nameInstruc.classList.add("hide");
});

resetBtn.addEventListener("click", () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
  currentPlayer = "O";
  botPlayer = "X";
});
newGame.addEventListener("click", () => {
  hideMsg();
  startBtn.classList.remove("hide");
  emptyBoxes();
  player1.disabled = false;
  player1.value = "";
  currentPlayer = "O";
  botPlayer = "X";
  disableAll();
  player1.classList.remove("hide");
  nameInstruc.classList.remove("hide");
});
drawBtn.addEventListener("click", () => {
  hideMsgDraw();
  startBtn.classList.remove("hide");
  emptyBoxes();
  player1.disabled = false;
  player1.value = "";
  currentPlayer = "O";
  botPlayer = "X";
  disableAll();
  player1.classList.remove("hide");
  nameInstruc.classList.remove("hide");
});

let evaluateMove = (player) => {
  for (let pattern of winningPatterns) {
    let countPlayer = 0;
    let countEmpty = 0;
    let emptyIndex = -1;

    for (let index of pattern) {
      if (boxes[index].innerText === player) {
        countPlayer++;
      } else if (boxes[index].innerText === "") {
        countEmpty++;
        emptyIndex = index;
      }
    }

    if (countPlayer === 2 && countEmpty === 1) {
      return emptyIndex;
    }
  }
  return -1;
};

let forkMove = () => {
  let corners = [0, 2, 6, 8];
  let availableCorners = corners.filter(
    (index) => boxes[index].innerText === ""
  );

  if (availableCorners.length > 0) {
    let randomIndex = Math.floor(Math.random() * availableCorners.length);
    return availableCorners[randomIndex];
  }
  return -1;
};

let botMove = () => {
  setTimeout(() => {
    let winMove = evaluateMove(botPlayer);
    if (winMove !== -1) {
      boxes[winMove].innerText = botPlayer;
      boxes[winMove].disabled = true;
      if (checkWin(botPlayer)) {
        showWinner("Bot");
        disableAll();
      }
      currentPlayer = "O";
      return;
    }

    let blockMove = evaluateMove("O");
    if (blockMove !== -1) {
      boxes[blockMove].innerText = botPlayer;
      boxes[blockMove].disabled = true;
      currentPlayer = "O";
      return;
    }

    let forkMoveIndex = forkMove();
    if (forkMoveIndex !== -1) {
      boxes[forkMoveIndex].innerText = botPlayer;
      boxes[forkMoveIndex].disabled = true;
      currentPlayer = "O";
      return;
    }

    let availableMoves = [];
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].innerText === "") {
        availableMoves.push(i);
      }
    }
    if (availableMoves.length > 0) {
      let randomIndex = Math.floor(Math.random() * availableMoves.length);
      let move = availableMoves[randomIndex];
      boxes[move].innerText = botPlayer;
      boxes[move].disabled = true;
      if (checkWin(botPlayer)) {
        showWinner("Bot");
        disableAll();
      } else if (checkDraw()) {
        showDraw();
      }
      currentPlayer = "O";
    }
  }, 500);
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (currentPlayer === "O" && box.innerText === "") {
      box.innerText = currentPlayer;
      currentPlayer = "X";
      if (checkWin("O")) {
        showWinner(player1.value);
        disableAll();
      } else if (checkDraw()) {
        showDraw();
      } else {
        botMove();
      }
    }
  });
});
