const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;

const scaleX = 20;
const scaleY = 20;

const xCenter = Math.round(canvasWidth/scaleX/2)*scaleX;
const yCenter = Math.round(canvasHeight/scaleY/2)*scaleY;

function getR() {
    let r = document.getElementById("form:r").value;
    let regex = /^[+-]?[0-9]{1,10}([.]?[0-9]{1,10})?$/;
    if (r.match(regex)) {
        return parseFloat(r);
    } else {
        return NaN;
    }
}

window.onload = () => {
    redrawGraph();
}

function redrawGraph(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGraph();
    drawPoints();
    console.log("redraw");

}

function drawGraph(){
    drawGrid();
    drawQuadrant();
    drawRectangle();
    drawTriangle();
    drawAxes();
}
function drawGrid(){
    ctx.beginPath();
    ctx.strokeStyle = '#f5f0e8';
    for (let i = 0; i<= canvasWidth; i = i + scaleX){
        ctx.moveTo(i,0);
        ctx.lineTo(i,canvasHeight);
    }
    ctx.stroke();
    for (let i = 0; i<= canvasHeight; i = i + scaleY){
        ctx.moveTo(0,i);
        ctx.lineTo(canvasWidth,i);
    }
    ctx.stroke();
    ctx.closePath();
}

function drawQuadrant(){
    ctx.beginPath();
    ctx.arc(xCenter,yCenter,80,3*Math.PI/2,Math.PI,true);
    ctx.lineTo(xCenter,yCenter);
    ctx.lineTo(xCenter,yCenter-80);
    ctx.stroke();
    ctx.fillStyle = "violet";
    ctx.fill();
    ctx.closePath();
}

function drawRectangle(){
    ctx.beginPath();
    ctx.moveTo(xCenter,yCenter);
    ctx.lineTo(xCenter,yCenter+80);
    ctx.lineTo(xCenter+160,yCenter+80);
    ctx.lineTo(xCenter+160,yCenter);
    ctx.lineTo(xCenter,yCenter);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function drawTriangle(){
    ctx.beginPath();
    ctx.moveTo(xCenter,yCenter);;
    ctx.lineTo(xCenter-160,yCenter);
    ctx.lineTo(xCenter,yCenter+160);
    ctx.lineTo(xCenter,yCenter);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function drawAxes(){
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.moveTo(xCenter,0);
    ctx.lineTo(xCenter,canvasHeight);
    ctx.moveTo(0,yCenter);
    ctx.lineTo(canvasWidth,yCenter);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    const arrowIndent = 8;
    ctx.moveTo(xCenter-arrowIndent,arrowIndent);
    ctx.lineTo(xCenter,0);
    ctx.lineTo(xCenter+arrowIndent,arrowIndent);
    ctx.moveTo(canvasWidth-arrowIndent,yCenter-arrowIndent);
    ctx.lineTo(canvasWidth,yCenter);
    ctx.lineTo(canvasWidth-arrowIndent,yCenter+arrowIndent);
    ctx.stroke();
    ctx.closePath();
    // tick marks
    const labels = ['-R', '-R/2', '', 'R/2', 'R'];
    ctx.fillStyle = "black";
    for (let i=1; i<6; i++) {
        ctx.beginPath();
        ctx.moveTo(-40+i*canvasWidth/5, canvasHeight/2-5);
        ctx.lineTo(-40+i*canvasWidth/5, canvasHeight/2+5);
        ctx.moveTo(canvasWidth/2-5, i*canvasHeight/5-40);
        ctx.lineTo(canvasWidth/2+5, i*canvasHeight/5-40);
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(labels[i-1], i*canvasWidth/5-40, canvasHeight/2-7);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i-1], canvasWidth/2+7, canvasHeight - i*canvasHeight/5+40);
        ctx.closePath();
    }
}

function drawPoint(x, y, r, fill){
    let cx = x / r * canvasWidth / 2.5 + canvasWidth / 2;
    let cy = -y / r * canvasHeight / 2.5 + canvasHeight / 2;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

function drawPoints() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGraph();
    document.querySelectorAll(".point").forEach(point => point.remove());
    $(".data-table tbody tr").each(function () {
        let x = parseFloat($(this).find("td:nth-child(1)").text());
        let y = parseFloat($(this).find("td:nth-child(2)").text());
        let r = parseFloat($(this).find("td:nth-child(3)").text());
        let hit = $(this).find("td:nth-child(6)").text();
        if (!isNaN(x) && !isNaN(y)) {
            if (getR() === r) {
                if (hit.includes("true")) {
                    drawPoint(x, y, getR(), "#009900");
                } else {
                    drawPoint(x, y, getR(), "#CC0000");
                }
            } else {
                drawPoint(x, y, getR(), "#333333");
            }
        }
    })
}


canvas.onclick = (e) => {
    let r = document.getElementById("form:r").value;
    document.getElementById("form:x").value =  Math.round((2 * e.offsetX / canvasWidth - 1) * r * 1.25 * 100) / 100;
    document.getElementById("form:y").value = Math.round((-2 * e.offsetY / canvasHeight + 1) * r * 1.25  * 100) / 100;
    document.getElementById("form:submit").click();
}

