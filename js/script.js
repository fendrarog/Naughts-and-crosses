let cells = document.querySelectorAll("#field td");
let field = document.querySelector("#field");
let banner = document.querySelector(".banner");
let bannerText = banner.querySelector(".banner__text");
let restartBtn = document.querySelector("#restart-btn");

restartBtn.addEventListener("click", function () {
  location.reload();
});

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
        banner.classList.toggle("hide");
        field.classList.toggle("hide");
        if (isVictory(cells)) {
          bannerText.innerHTML = `ПОБЕДА! ${
            this.innerHTML === "X" ? "Крестики" : "Нолики"
          } победили.`;
        } else if (i === 8) {
          bannerText.innerHTML = `НИЧЬЯ! Никто не победил.`;
        }
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

