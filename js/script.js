let cells = document.querySelectorAll("#field td");
let field = document.querySelector("#field");
let banner = document.querySelector(".banner");

start(cells);

function start(cells) {
  let i = 0;
  for (let cell of cells) {
    cell.addEventListener("click", function step() {
      this.innerHTML = ["X", "O"][i % 2];
      this.style.backgroundColor = "rgb(141, 96, 96)";
      this.style.color = "moccasin";
      this.removeEventListener("click", step);

      if (isVictory(cells)) {
        banner.innerHTML = `ПОБЕДА! ${
          this.innerHTML === "X" ? "Крестики" : "Нолики"
        } победили.`;
        banner.classList.toggle("unhide");
        field.classList.toggle("hide");
      } else if (i === 8) {
        banner.innerHTML = `НИЧЬЯ! Никто не победил.`;
          banner.classList.toggle("unhide");
          field.classList.toggle("hide");
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
