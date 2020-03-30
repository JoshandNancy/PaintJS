const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const ranges = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const CANVAS_SIZE = 700;
const DEFAULT_COLOR = "#2c2c2c";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
canvas.fillRect = (0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let fillMode = false;

function stopPainting(event){
    painting = false;
}

function startPainting(event){
    painting = true;
}

function onMouseMove(event){
    
    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(x, y);
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        
        
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    //console.log(event);
    painting = true;
}

function onMouseUp(event){
    stopPainting();
}

function onMouseLeave(event){
    stopPainting();
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    console.log(color);
    //ctx.strokeStyle = color;
    if (!fillMode) {
        ctx.strokeStyle = color;
    }
    else {
        ctx.fillStyle = color;
        //ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
    

}

function handleRangeInput(event){
    const lineWidth = event.target.value;
    console.log(lineWidth);
    ctx.lineWidth = lineWidth;
}

function handleFillMode(event){
    if (!fillMode) {
        //console.log(fillMode);
        mode.innerText = "PAINT";
        fillMode = true;
    }
    else {
        //console.log(fillMode);
        mode.innerText = "FILL";
        fillMode = false;
    }
}

function handleCanvasClick(event){
    if (!fillMode){
        //do nothing
    }
    else {
        //console.log(event);
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    //console.log(event);
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL('image/jpeg', 1.0);
    //console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
    //console.log(link);
    
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);


}


Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
//Array.from(color)

//console.log(strokes.value);

ranges.addEventListener("input", handleRangeInput);

if (mode){
    mode.addEventListener("click", handleFillMode);
}

if (save){
    save.addEventListener("click", handleSaveClick);
}
