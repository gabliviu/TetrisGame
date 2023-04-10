const gameGridWrapper = document.querySelector("#game-grid");
//main grid of 21 rows x 10 columns grid will be generated inside game-grid
for (let i = 0; i < 210; i++) {
  const gGrid = document.createElement("div");
  if (i >= 200) {
    gGrid.classList.add("occupied");
  } else {
    gGrid.classList.add("game-cell");
  }
  gameGridWrapper.append(gGrid);
}

//mini grid of 4 rows x 4 columns for first-next will be generated inside first-next

let firstNext = document.querySelector(".first-next");
for (let i = 0; i < 16; i++) {
  const mGrid = document.createElement("div");
  firstNext.append(mGrid);
}
//mini grid of 4 rows x 4 columns for first-next will be generated inside second-next
let secondNext = document.querySelector(".second-next");
for (let i = 0; i < 16; i++) {
  const mGrid = document.createElement("div");
  secondNext.append(mGrid);
}

//elements on game-interface page
let gameGrids = Array.from(document.querySelectorAll("#game-grid div")); //it will create a array containing all div
let firstNextGrids = Array.from(document.querySelectorAll(".first-next div"));
let secondNextGrids = Array.from(document.querySelectorAll(".second-next div"));
const scoreInfo = document.querySelector("#score");
const countRows = document.querySelector("#rows-count");
const countLevel = document.querySelector("#level-count");
const highScoreInfo = document.querySelector("#high-score");
let score = 0;
let rowCompleted = 0;
let heighScore = 0;
let levelCnt = 1;
let levelOneMax = 50;
scoreInfo.innerHTML = score;
countRows.innerHTML = rowCompleted;
highScoreInfo.innerHTML = heighScore;
countLevel.innerHTML = levelCnt;

//other variables
const gameGridColumns = 10;
const nextGridColumns = 4;
const tetroColors = [
  "#F94A29",
  "#D61355",
  "#6F1AB6",
  "#183A1D",
  "#060047",
  "#537FE7",
  "#9A1663",
  "#F0A04B",
  "#EA8FEA",
];

//The Tetrominoes
const lTetromino = [
  [0, 1, gameGridColumns, gameGridColumns * 2],
  [0, 1, 2, gameGridColumns + 2],
  [1, gameGridColumns + 1, gameGridColumns * 2 + 1, gameGridColumns * 2],
  [0, gameGridColumns, gameGridColumns + 1, gameGridColumns + 2],
];
const lMirrorTetromino = [
  [0, 1, gameGridColumns + 1, gameGridColumns * 2 + 1],
  [2, gameGridColumns + 2, gameGridColumns + 1, gameGridColumns],
  [gameGridColumns * 2 + 1, gameGridColumns * 2, gameGridColumns, 0],
  [gameGridColumns, 0, 1, 2],
];
const zTetromino = [
  [0, gameGridColumns, gameGridColumns + 1, gameGridColumns * 2 + 1],
  [
    gameGridColumns + 1,
    gameGridColumns + 2,
    gameGridColumns * 2,
    gameGridColumns * 2 + 1,
  ],
  [0, gameGridColumns, gameGridColumns + 1, gameGridColumns * 2 + 1],
  [
    gameGridColumns + 1,
    gameGridColumns + 2,
    gameGridColumns * 2,
    gameGridColumns * 2 + 1,
  ],
];
const zMirrorTetromino = [
  [1, gameGridColumns + 1, gameGridColumns, gameGridColumns * 2],
  [0, 1, gameGridColumns + 1, gameGridColumns + 2],
  [1, gameGridColumns + 1, gameGridColumns, gameGridColumns * 2],
  [0, 1, gameGridColumns + 1, gameGridColumns + 2],
];
const tTetromino = [
  [0, 1, 2, gameGridColumns + 1],
  [1, gameGridColumns, gameGridColumns + 1, gameGridColumns * 2 + 1],
  [1, gameGridColumns, gameGridColumns + 1, gameGridColumns + 2],
  [0, gameGridColumns, gameGridColumns + 1, gameGridColumns * 2],
];
const oTetromino = [
  [0, 1, gameGridColumns, gameGridColumns + 1],
  [0, 1, gameGridColumns, gameGridColumns + 1],
  [0, 1, gameGridColumns, gameGridColumns + 1],
  [0, 1, gameGridColumns, gameGridColumns + 1],
];
const iTetromino = [
  [0, gameGridColumns, gameGridColumns * 2, gameGridColumns * 3],
  [0, 1, 2, 3],
  [0, gameGridColumns, gameGridColumns * 2, gameGridColumns * 3],
  [0, 1, 2, 3],
];
const uTetromino = [
  [0, gameGridColumns, gameGridColumns + 1, gameGridColumns + 2, 2],
  [0, 1, gameGridColumns, gameGridColumns * 2, gameGridColumns * 2 + 1],
  [0, 1, 2, gameGridColumns, gameGridColumns + 2],
  [0, 1, gameGridColumns + 1, gameGridColumns * 2 + 1, gameGridColumns * 2],
];
const plusTetromino = [
  [
    1,
    gameGridColumns,
    gameGridColumns + 1,
    gameGridColumns + 2,
    gameGridColumns * 2 + 1,
  ],
  [
    1,
    gameGridColumns,
    gameGridColumns + 1,
    gameGridColumns + 2,
    gameGridColumns * 2 + 1,
  ],
  [
    1,
    gameGridColumns,
    gameGridColumns + 1,
    gameGridColumns + 2,
    gameGridColumns * 2 + 1,
  ],
  [
    1,
    gameGridColumns,
    gameGridColumns + 1,
    gameGridColumns + 2,
    gameGridColumns * 2 + 1,
  ],
];
const theTetrominoes = [
  lTetromino,
  lMirrorTetromino,
  zTetromino,
  zMirrorTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
  uTetromino,
];

let curPosition = 4;
let curRotation = 0;
let random = Math.floor(Math.random() * theTetrominoes.length);
let curTetro = theTetrominoes[random][curRotation];
let firstNextRandom = random;
let secondNextRandom;
random = firstNextRandom;
secondNextRandom = Math.floor(Math.random() * theTetrominoes.length);
firstNextRandom = secondNextRandom;

// function to draw and clear tetromino on game-grids
function drawTetro() {
  for (let i = 0; i < curTetro.length; i++) {
    // to create a random tetromino at curTetro position applying class tetro (tetromio)
    gameGrids[curPosition + curTetro[i]].classList.add("tetro");
    // to apply a random backgroud color to each cell of tetro
    gameGrids[curPosition + curTetro[i]].style.backgroundColor =
      tetroColors[random];
  }
}

function clearTetro() {
  for (let i = 0; i < curTetro.length; i++) {
    gameGrids[curPosition + curTetro[i]].classList.remove("tetro");
    gameGrids[curPosition + curTetro[i]].style.backgroundColor = "";
  }
}

//functions assigned to keyboard keys
function control(e) {
  if (e.keyCode === 37 || e.keyCode === 65 || e.target.id === "left-button") {
    moveLeft(); //Arrow Left, letter a or pressing on L
  } else if (
    e.keyCode === 38 ||
    e.keyCode === 87 ||
    e.target.id === "rotate-button"
  ) {
    rotate(); //Arrow up, letter w
  } else if (
    e.keyCode === 39 ||
    e.keyCode === 68 ||
    e.target.id === "right-button"
  ) {
    moveRight(); //Arrow right, letter d or by pressing R
  } else if (
    e.keyCode === 40 ||
    e.keyCode === 83 ||
    e.target.id === "down-button"
  ) {
    moveDown(); //Arrow down, letter s
  }
}
document.addEventListener("keydown", control);

// necessary for clicking the gamepad buttons ////////////////
const leftButton = document.querySelector("#left-button");
leftButton.addEventListener("click", moveLeft);

const rightButton = document.querySelector("#right-button");
rightButton.addEventListener("click", moveRight);

const rotateButton = document.querySelector("#rotate-button");
rotateButton.addEventListener("click", rotate);

const downButton = document.querySelector("#down-button");
downButton.addEventListener("click", moveDown);
///////////////////////////////////////////////////////////////

function freeze() {
  if (
    curTetro.some((index) =>
      gameGrids[curPosition + index + gameGridColumns].classList.contains(
        "occupied"
      )
    )
  ) {
    curTetro.forEach((index) =>
      gameGrids[curPosition + index].classList.add("occupied")
    );
    //start a new tetromino falling
    curPosition = 4;
    random = firstNextRandom;
    curTetro = theTetrominoes[random][curRotation];
    drawTetro();
    clearAllNextTetro();
    firstNextRandom = secondNextRandom;
    drawFirstNextTetro();
    secondNextRandom = Math.floor(Math.random() * theTetrominoes.length);
    drawSecondNextTetro();
    countScore();
    gameOver();
  }
}

//Edge and Occupancy testing functions
function isAtLeftEdge() {
  return curTetro.some(
    (index) => (curPosition + index) % gameGridColumns === 0
  );
}
function isAtRightEdge() {
  return curTetro.some(
    (index) => (curPosition + index) % gameGridColumns === gameGridColumns - 1
  );
}
function isSelfOccupied() {
  return curTetro.some((index) =>
    gameGrids[curPosition + index].classList.contains("occupied")
  );
}
function isLeftOccupied() {
  return curTetro.some((index) =>
    gameGrids[curPosition - 1 + index].classList.contains("occupied")
  );
}
function isRightOccupied() {
  return curTetro.some((index) =>
    gameGrids[curPosition + 1 + index].classList.contains("occupied")
  );
}
function isButtomOccupied() {
  return curTetro.some((index) =>
    gameGrids[curPosition + gameGridColumns + index].classList.contains(
      "occupied"
    )
  );
}

//move down function
function moveDown() {
  if (!isSelfOccupied() && !isButtomOccupied()) {
    clearTetro();
    curPosition += gameGridColumns;
    drawTetro();
    freeze();
  } else {
    for (let i = 0; i < curTetro.length; i++) {
      gameGrids[curPosition + curTetro[i]].classList.add("occupied");
    }
    gameOver();
  }
}

//move left function
function moveLeft() {
  if (!isSelfOccupied() && !isAtLeftEdge() && !isLeftOccupied()) {
    clearTetro();
    curPosition -= 1;
    drawTetro();
  }
}
//move right function
function moveRight() {
  if (!isSelfOccupied() && !isAtRightEdge() && !isRightOccupied()) {
    clearTetro();
    curPosition += 1;
    drawTetro();
  }
}
function isNextRotationOccupied() {
  var nextRotation;
  var nextTetro;
  curRotation === 3 ? (nextRotation = 0) : (nextRotation = curRotation + 1);
  nextTetro = theTetrominoes[random][nextRotation];
  return nextTetro.some((index) =>
    gameGrids[curPosition + index].classList.contains("occupied")
  );
}
// functions for rotation
function isBreakingOnRotation() {
  var nextRotation;
  var nextTetro;
  curRotation === 3 ? (nextRotation = 0) : (nextRotation = curRotation + 1);
  nextTetro = theTetrominoes[random][nextRotation];
  let newPositions = [];
  let j;
  for (let i = 0; i < nextTetro.length; i++) {
    j = (nextTetro[i] + curPosition) % gameGridColumns;
    newPositions.push(j);
  }
  return Math.max(...newPositions) - Math.min(...newPositions) > 3;
}

function moveIfBrakingOnRotation() {
  //move one step if rotation possible
  if (curPosition % gameGridColumns < 4) {
    moveRight();
    if (isBreakingOnRotation() || isNextRotationOccupied()) {
      //even after movement cannot rotate revert movement
      moveLeft();
    }
  }
  if (curPosition % gameGridColumns > 5) {
    moveLeft();
    if (isBreakingOnRotation() || isNextRotationOccupied()) {
      //even after movement cannot rotate revert movement
      moveRight();
    }
  }
}

function rotate() {
  if (isBreakingOnRotation()) {
    moveIfBrakingOnRotation();
  }
  if (!isNextRotationOccupied() && !isBreakingOnRotation()) {
    clearTetro();
    curRotation === 3 ? (curRotation = 0) : curRotation++;
    curTetro = theTetrominoes[random][curRotation];
    drawTetro();
  }
}

//Upcoming tetromino to be displayed in mini-grid
const miniGridColumns = 4;
const miniIndex = 0;

const nextTetrominoes = [
  [0, 1, miniGridColumns, miniGridColumns * 2], //lTetromino,
  [0, 1, miniGridColumns + 1, miniGridColumns * 2 + 1], //lMirrorTetromino
  [0, miniGridColumns, miniGridColumns + 1, miniGridColumns * 2 + 1], //zTetromino
  [1, miniGridColumns + 1, miniGridColumns, miniGridColumns * 2], //zMirrorTetromino
  [0, 1, 2, miniGridColumns + 1], //tTetromino
  [0, 1, miniGridColumns, miniGridColumns + 1], //oTetromino
  [0, miniGridColumns, miniGridColumns * 2, miniGridColumns * 3], //iTetromino
  [0, miniGridColumns, miniGridColumns + 1, miniGridColumns + 2, 2], //uTetromino
];

// function to clear and draw tetromino on up-coming teromino on mini-grids
function clearAllNextTetro() {
  for (let i = 0; i < secondNextGrids.length; i++) {
    secondNextGrids[i].style.backgroundColor = "";
    secondNextGrids[i].classList.remove("tetro");
  }
  for (let i = 0; i < firstNextGrids.length; i++) {
    firstNextGrids[i].style.backgroundColor = "";
    firstNextGrids[i].classList.remove("tetro");
  }
}

function drawFirstNextTetro() {
  for (let i = 0; i < nextTetrominoes[firstNextRandom].length; i++) {
    firstNextGrids[
      miniIndex + nextTetrominoes[firstNextRandom][i]
    ].style.backgroundColor = tetroColors[firstNextRandom];
    firstNextGrids[
      miniIndex + nextTetrominoes[firstNextRandom][i]
    ].classList.add("tetro");
  }
}

function drawSecondNextTetro() {
  for (let i = 0; i < nextTetrominoes[secondNextRandom].length; i++) {
    secondNextGrids[
      miniIndex + nextTetrominoes[secondNextRandom][i]
    ].style.backgroundColor = tetroColors[secondNextRandom];
    secondNextGrids[
      miniIndex + nextTetrominoes[secondNextRandom][i]
    ].classList.add("tetro");
  }
}

//Calculate score
function countScore() {
  rowCnt = 0;
  for (let i = 0; i < 199; i += gameGridColumns) {
    const rowCells = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];

    if (
      rowCells.every((index) => gameGrids[index].classList.contains("occupied"))
    ) {
      rowCnt++;
      rowCells.forEach((index) => {
        gameGrids[index].classList.remove("occupied");
        gameGrids[index].classList.remove("tetro");
        gameGrids[index].style.backgroundColor = "";
      });
      const rowRemoved = gameGrids.splice(i, gameGridColumns);
      gameGrids = rowRemoved.concat(gameGrids);
      gameGrids.forEach((cell) => gameGridWrapper.appendChild(cell));
    }
  }
  if (rowCnt > 0) {
    rowCnt === 1
      ? (score += 10)
      : rowCnt === 2
      ? (score += 30)
      : rowCnt === 3
      ? (score += 50)
      : (score += 70);
    scoreInfo.innerHTML = score;
    rowCompleted += rowCnt;
    countRows.innerHTML = rowCompleted;
    if (score > heighScore) {
      highScoreInfo.innerHTML = score;
    }
    if (score > levelOneMax && levelCnt === 1) {
      levelCnt++;
      countLevel.innerHTML = levelCnt;
      onLevelup();
    }
  }
}

function onLevelup() {
  theTetrominoes.push(plusTetromino);
  nextTetrominoes.push([
    1,
    miniGridColumns,
    miniGridColumns + 1,
    miniGridColumns + 2,
    miniGridColumns * 2 + 1,
  ]);
  alert("Congratulation you completed this level !");
}

let timerId;
let isGameOver = 0;

function restartGame() {
  if (isGameOver === 1) {
    // Reset
    for (let i = 0; i < 200; i++) {
      gameGrids[i].classList.remove("tetro");
      gameGrids[i].classList.remove("occupied");
      gameGrids[i].style.backgroundColor = "";
      gameGrids[i].innerHTML = "";
    }
    score = 0;
    rowCompleted = 0;
    scoreInfo.innerHTML = score;
    countRows.innerHTML = rowCompleted;
    curPosition = 4;
    random = firstNextRandom;
    curTetro = theTetrominoes[random][curRotation];
    drawTetro();
    clearAllNextTetro();
    firstNextRandom = secondNextRandom;
    drawFirstNextTetro();
    secondNextRandom = Math.floor(Math.random() * theTetrominoes.length);
    drawSecondNextTetro();
    timerId = setInterval(moveDown, 500);
    isGameOver = 0;
  } else {
    if (timerId) {
      alert("Current game is not over");
    } else {
      curPosition = 4;
      random = Math.floor(Math.random() * theTetrominoes.length);
      curTetro = theTetrominoes[random][curRotation];
      drawTetro();
      timerId = setInterval(moveDown, 500);
      clearAllNextTetro();
      firstNextRandom = secondNextRandom;
      drawFirstNextTetro();
      secondNextRandom = Math.floor(Math.random() * theTetrominoes.length);
      drawSecondNextTetro();
      isGameOver = 0;
    }
  }
}

function pauseResume() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    timerId = setInterval(moveDown, 500);
  }
}

function gameOver() {
  if (
    curTetro.some((index) =>
      gameGrids[curPosition + index].classList.contains("occupied")
    )
  ) {
    isGameOver = 1;
    writeGameOver();
    clearInterval(timerId);
  }
}

function writeGameOver() {
  for (let i = 90; i < 130; i++) {
    gameGrids[i].classList.remove("tetro");
    gameGrids[i].classList.remove("occupied");
    gameGrids[i].style.backgroundColor = "#eb455f";
    gameGrids[i].style.color = "white";
    //gameGrids[i].style.fontSize = "x-large";
    gameGrids[i].style.fontWeight = "600";
  }
  gameGrids[103].innerHTML = "G";
  gameGrids[104].innerHTML = "A";
  gameGrids[105].innerHTML = "M";
  gameGrids[106].innerHTML = "E";
  gameGrids[113].innerHTML = "O";
  gameGrids[114].innerHTML = "V";
  gameGrids[115].innerHTML = "E";
  gameGrids[116].innerHTML = "R";
}
