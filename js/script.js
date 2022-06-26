let cells = document.querySelectorAll("#field td");
let field = document.querySelector("#field");
let banner = document.querySelector(".banner");
let bannerText = banner.querySelector(".banner__text");
let restartBtn = document.querySelector("#restart-btn");
let radios = document.querySelectorAll('input[type="radio"]');

let isStarted = false;
const isDraw = (i) => i === 8;

for (let radio of radios) {
  radio.addEventListener("click", function (e) {
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

console.log();

function startWithAi(cells) {
  let i = 0;
  for (let cell of cells) {
    cell.addEventListener("click", function step() {
      field.style.pointerEvents = "none";

      this.innerHTML = ["X", "O"][i % 2];
      this.style.backgroundColor = "rgb(141, 96, 96)";
      this.style.color = "moccasin";
      this.style.fontSize = "60px";
      this.removeEventListener("click", step);
      if (isVictory(cells) || isDraw(i)) {
        setTimeout(check, 1000, cells, i);
        debugger;
      }

      /*       const ai = (i) => {
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
        await timeout(1000);
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
    debugger;
    actionAI(cells, clickAI, i, step);
    if (isVictory(cells) || isDraw(i)) {
      setTimeout(check, 1000, cells, i);
    }
  }
}

/* function cellAI(cells) {
  let click = Math.floor(Math.random() * 9);
  if (cells[click].innerHTML === "") {
    return click;
  } else {
    return cellAI(cells);
  }
} */

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

  let breakComb = winLines.reduce((acc, curr) => {
    debugger;

    if (
      curr.filter((el) => cells[el].innerHTML === "X").length === 2 &&
      curr.some((el) => cells[el].innerHTML === "")
    ) {
      acc = curr.filter((el) => cells[el].innerHTML === "")[0];
      debugger;
    }
    return acc;
  }, 0);

  if (breakComb) {
    return breakComb;
  }

  if (cells[4].innerHTML === "") {
    return 4;
  }

  let corners = [0, 2, 6, 8];
  let haveEmptyCorner = corners.some(
    (corner) => cells[corner].innerHTML === ""
  );

  if (haveEmptyCorner) {
    let emptyCorners = corners.filter(
      (corner) => cells[corner].innerHTML === ""
    );
    return emptyCorners[0];
  }
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
