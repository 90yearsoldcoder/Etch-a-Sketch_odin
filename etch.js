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
let rainBow = false;
let shading = false;
let lighting = false;

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

function getRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}

function changeColor(e) {
  if (e.type == "mouseover" && !mouseDown) return;
  //console.log(e);
  if (rainBow) {
    e.target.style.backgroundColor = getRandomColor();
  } else {
    e.target.style.backgroundColor = INK;
  }
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

function updateSwitch() {
  rb_item = document.getElementById("rainBow");
  sd_item = document.getElementById("shading");
  lt_item = document.getElementById("lighting");

  if (rainBow) rb_item.classList.add("btn_on");
  else rb_item.classList.remove("btn_on");

  if (shading) sd_item.classList.add("btn_on");
  else sd_item.classList.remove("btn_on");

  if (lighting) lt_item.classList.add("btn_on");
  else lt_item.classList.remove("btn_on");
}

//change to rainbow ink
function switchRainbow() {
  if (rainBow) {
    rainBow = false;
  } else {
    rainBow = true;
    shading = false;
    lighting = false;
  }

  updateSwitch();
}

//change to shading ink
function switchShading() {
  if (shading) {
    shading = false;
  } else {
    rainBow = false;
    shading = true;
    lighting = false;
  }

  updateSwitch();
}

//change to lighting ink
function switchlighting() {
  if (lighting) {
    lighting = false;
  } else {
    rainBow = false;
    shading = false;
    lighting = true;
  }

  updateSwitch();
}

initBoard(DEFAULT_SIZE);

//size setter
btn_size_setter = document.getElementById("Set_size");
btn_size_setter.onclick = () => updateBoard();

//ink switch listenner
Rainbow_switch = document.getElementById("rainBow");
Rainbow_switch.onclick = () => switchRainbow();
Shading_switch = document.getElementById("shading");
Shading_switch.onclick = () => switchShading();
Lighting_switch = document.getElementById("lighting");
Lighting_switch.onclick = () => switchlighting();
