let cells = document.querySelectorAll("#field td");
let field = document.querySelector("#field");
let banner = document.querySelector(".banner");
let bannerText = banner.querySelector(".banner__text");
let restartBtn = document.querySelector("#restart-btn");
let radios = document.querySelectorAll('input[type="radio"]');

let isStarted = false;
const isDraw = (i) => i === 8;

let winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let winLinesConcat = (...arrs) => {
  let res = arrs[0].concat(...arrs);
  return res.slice(arrs[0].length);
};

console.log(winLinesConcat(...winLines));

for (let radio of radios) {
  radio.addEventListener("change", function (e) {
    if (isStarted) {
      location.reload();
    }
    if (this.value === "without") {
      startWithPlayer(cells);
    } else if (this.value === "with") {
      startWithAi(cells);
    }
    isStarted = true;
  });
}

function startWithAi(cells) {
  let i = 0;
  for (let cell of cells) {
    cell.addEventListener("click", function step() {
      this.innerHTML = ["X", "O"][i % 2];
      this.style.backgroundColor = "rgb(141, 96, 96)";
      this.style.color = "moccasin";
      this.style.fontSize = "60px";
      this.removeEventListener("click", step);
      if (isVictory(cells) || isDraw(i)) {
        setTimeout(check, 1000, cells, i);
      }

      /* const ai = (i) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(++i);
          }, 0);
        });
      };

      ai(i).then((i) => {
        stepAI(cells, i, step);
        field.style.pointerEvents = "auto";
      }); */

      function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      const ai = async (fn, ...args) => {
        field.style.pointerEvents = "none";
        await timeout(2000);
        fn(...args);
        field.style.pointerEvents = "auto";
      };

      ai(stepAI, cells, i, step);

      i = i + 2;
    });
  }
}

function stepAI(cells, i, step) {
  i++;
  if (!isVictory(cells)) {
    const clickAI = cellAI(cells);
    actionAI(cells, clickAI, i, step);
    if (isVictory(cells) || isDraw(i)) {
      setTimeout(check, 1000, cells, i);
    }
  }
}

function cellAI(cells) {
  let winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winComb = winLines.reduce((acc, curr) => {
    if (
      curr.filter((el) => cells[el].innerHTML === "O").length === 2 &&
      curr.some((el) => cells[el].innerHTML === "")
    ) {
      acc = curr.filter((el) => cells[el].innerHTML === "")[0];
    }
    return acc;
  }, 0);

  let breakComb = winLines.reduce((acc, curr) => {
    if (
      curr.filter((el) => cells[el].innerHTML === "X").length === 2 &&
      curr.some((el) => cells[el].innerHTML === "")
    ) {
      acc = curr.filter((el) => cells[el].innerHTML === "")[0];
    }
    return acc;
  }, 0);

  let preComb = winLines.reduce((acc, curr) => {
    if (
      curr.some((el) => cells[el].innerHTML === "O") &&
      !curr.some((el) => cells[el].innerHTML === "X")
    ) {
      acc = curr.filter((el) => cells[el].innerHTML === "")[0];
    }
    return acc;
  }, 0);

  if (winComb) {
    return winComb;
  }

  if (breakComb) {
    return breakComb;
  }

  if (preComb) {
    return preComb;
  }

  let corners = [0, 2, 6, 8];
  const cornerComb = (cells) => {
    let hasXInCorner = corners.some(
      (corner) => cells[corner].innerHTML === "X"
    );
    let cellsWithoutCorners = [1, 3, 4, 5, 7];
    let isCellsWithoutCornersClear = cellsWithoutCorners.every(
      (el) => cells[el].innerHTML === ""
    );

    if (hasXInCorner && isCellsWithoutCornersClear) {
      let firstCornerX = corners.reduce((acc, curr) => {
        debugger;
        if (cells[curr].innerHTML === "X") {
          acc = curr;
        }
        return acc;
      }, 0);
      debugger;
      return firstCornerX;
    }
    return -1;
  };

  if (cornerComb(cells) >= 0) {
    let res = cornerComb(cells);
    debugger;
    if (res === 0 || res === 8) {
      return [0, 8].filter((el) => cells[el].innerHTML === "")[0];
    }
    if (res === 2 || res === 6) {
      return [2, 6].filter((el) => cells[el].innerHTML === "")[0];
    }
  }

  if (cells[4].innerHTML === "") {
    return 4;
  }

  let haveEmptyCorner = corners.some(
    (corner) => cells[corner].innerHTML === ""
  );

  if (haveEmptyCorner) {
    let emptyCorners = corners.filter(
      (corner) => cells[corner].innerHTML === ""
    );
    return emptyCorners[0];
  }

  function randomClick(cells) {
    let click = Math.floor(Math.random() * 9);
    if (cells[click].innerHTML === "") {
      debugger;
      return click;
    } else {
      return randomClick(cells);
    }
  }

  return randomClick(cells);
}

function actionAI(cells, clickAI, i, step) {
  cells[clickAI].innerHTML = ["X", "O"][i % 2];
  cells[clickAI].style.backgroundColor = "rgb(141, 96, 96)";
  cells[clickAI].style.color = "moccasin";
  cells[clickAI].style.fontSize = "60px";
  cells[clickAI].removeEventListener("click", step);
  cells[clickAI].style.pointerEvents = "none";
}

function isVictory(cells) {
  let winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let winLine of winLines) {
    if (
      cells[winLine[0]].innerHTML === cells[winLine[1]].innerHTML &&
      cells[winLine[1]].innerHTML === cells[winLine[2]].innerHTML &&
      cells[winLine[0]].innerHTML !== ""
    ) {
      return true;
    }
  }
  return false;
}

function check(cells, i) {
  restartBtn.addEventListener("click", function () {
    location.reload();
  });
  banner.classList.toggle("hide");
  field.classList.toggle("hide");
  if (isVictory(cells)) {
    bannerText.innerHTML = `ПОБЕДА! ${
      i % 2 === 0 ? "Крестики" : "Нолики"
    } победили.`;
  } else if (i === 8) {
    bannerText.innerHTML = `НИЧЬЯ! Никто не победил.`;
  }
}

function startWithPlayer(cells) {
  let i = 0;
  for (let cell of cells) {
    cell.addEventListener("click", function step() {
      this.innerHTML = ["X", "O"][i % 2];
      this.style.backgroundColor = "rgb(141, 96, 96)";
      this.style.color = "moccasin";
      this.style.fontSize = "60px";
      this.removeEventListener("click", step);
      if (isVictory(cells) || i == 8) {
        setTimeout(check, 1000, cells, i);
      }
      i++;
    });
  }
}

function isVictory(cells) {
  let winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let winLine of winLines) {
    if (
      cells[winLine[0]].innerHTML === cells[winLine[1]].innerHTML &&
      cells[winLine[1]].innerHTML === cells[winLine[2]].innerHTML &&
      cells[winLine[0]].innerHTML !== ""
    ) {
      return true;
    }
  }
  return false;
}
