let mouseDown = false;
document.body.onmousedown = () => {
  mouseDown = true;
};
document.body.onmouseup = () => {
  mouseDown = false;
};
const INK = "blue";
const DEFAULT_SIZE = 16;
const main_container = document.getElementById("main-container");

function addFlex(parent, num, style) {
  /*
        input:
            parent: DOM, the parent container;
            num: int, the number of flex box will be added to the parent container;
            style: string the class name of the new flex box
        function:
            add ${num} flex boxes
    */
  for (let i = 0; i < num; i++) {
    let newBox = document.createElement("div");
    newBox.classList.add(style);
    parent.appendChild(newBox);
  }
}

function changeColor(e) {
  if (e.type == "mouseover" && !mouseDown) return;
  //console.log(e);
  e.target.style.backgroundColor = INK;
}

function initBoard(size) {
  main_container.innerHTML = "";
  main_container.classList.add("content_container");
  main_container.setAttribute("style", "flex-direction: column;");

  addFlex(main_container, size, "row");
  for (let item of main_container.childNodes) {
    //console.log(item);
    addFlex(item, size, "grid");
  }

  //add pen listener
  grids = document.getElementsByClassName("grid");
  for (let item of grids) {
    item.addEventListener("mouseover", changeColor);
    item.addEventListener("mousedown", changeColor);
  }
}

function updateBoard() {
  let size = prompt("Give me the size of new board, plz");
  if (size <= 0 || size > 100) {
    alert("Invaid size. The size should be between 1 and 99");
    return;
  }
  initBoard(size);
}

initBoard(DEFAULT_SIZE);

//size setter
btn_size_setter = document.getElementById("Set_size");
btn_size_setter.onclick = () => updateBoard();
