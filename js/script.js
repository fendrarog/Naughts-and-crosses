let cells = document.querySelectorAll("#field td");
let field = document.querySelector("#field");
let banner = document.querySelector(".banner");
let bannerText = banner.querySelector(".banner__text");
let restartBtn = document.querySelector("#restart-btn");

console.log();

start(cells);

function start(cells) {
  let i = 0;
  for (let cell of cells) {
    cell.addEventListener("click", function step() {
      this.innerHTML = ["X", "O"][i % 2];
      this.style.backgroundColor = "rgb(141, 96, 96)";
      this.style.color = "moccasin";
      this.style.fontSize = "60px";
      this.removeEventListener("click", step);
      if (isVictory(cells) || i == 8) {
        setTimeout(check, 500, cells, i);
      }
      i++;
      setTimeout(stepAI, 2000, cells, i, step);

      i++;
      debugger;
    });
  }
}

function stepAI(cells, i, step) {
  /* i++; */
  if (!isVictory(cells)) {
    /* console.log(i); */
    const clickAI = cellAI(cells);
    actionAI(cells, clickAI, i, step);
    if (isVictory(cells) || i == 8) {
      setTimeout(check, 500, cells, i);
    }
  }

  /* return i; */
}

function cellAI(cells) {
  let click = Math.floor(Math.random() * 9);
  if (cells[click].innerHTML === "") {
    return click;
  } else {
    return cellAI(cells);
  }
}

function actionAI(cells, clickAI, i, step) {
  cells[clickAI].innerHTML = ["X", "O"][i % 2];
  cells[clickAI].style.backgroundColor = "rgb(141, 96, 96)";
  cells[clickAI].style.color = "moccasin";
  cells[clickAI].style.fontSize = "60px";
  cells[clickAI].removeEventListener("click", step);
  cells[clickAI].style.pointerEvents = "none";
  debugger;
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

/* async function stepNumberAI(cells, i, step) {
  const res = await setTimeout(stepAI, 500, cells, i, step);

  return res;
}
 */
