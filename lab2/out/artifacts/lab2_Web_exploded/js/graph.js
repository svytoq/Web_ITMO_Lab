const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;

const scaleX = 25;
const scaleY = 25;

const canvasStepX = canvasWidth / 2 / 12;
const canvasStepY = canvasHeight / 2 / 12;

const rField = document.getElementsByName("rContact");
var rField_value;

for(var i = 0; i < rField.length; i++){
    if(rField[i].checked){
        rField_value = rField[i].value;
    }
}
for(var i = 0; i < rField.length; i++){
    rField[i].onclick = function() {
        redrawGraph();
    }
}



function redrawGraph(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGraph();
    drawPoints();
    console.log("redraw");

}

function drawGraph() {
    ctx.beginPath();
    ctx.strokeStyle = '#f5f0e8';

    for (let i = 0; i <= canvasWidth; i = i + scaleX) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasHeight);

    }
    ctx.stroke();
    for (let i = 0; i <= canvasHeight; i = i + scaleY) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvasWidth, i);

    }
    ctx.stroke();
    ctx.closePath();

    const xCenter = Math.round(canvasWidth / scaleX / 2) * scaleX;
    const yCenter = Math.round(canvasHeight / scaleY / 2) * scaleY;


    ctx.beginPath();
    ctx.arc(xCenter, yCenter, 100, 0, -Math.PI / 2, true);
    ctx.fillStyle = "red";
    ctx.globalCompositeOperation = 'difference';
    ctx.drawImage(document.getElementById('batmanImage'), 40, 40, canvasWidth*0.8, canvasHeight*0.8);
    ctx.globalCompositeOperation = 'source-over';


    // axes
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.moveTo(xCenter, 0);
    ctx.lineTo(xCenter, canvasHeight);
    ctx.moveTo(0, yCenter);
    ctx.lineTo(canvasWidth, yCenter);
    ctx.stroke();
    ctx.closePath();

    // axis arrows
    ctx.beginPath();
    const arrowIndent = 8;
    ctx.moveTo(xCenter - arrowIndent, arrowIndent);
    ctx.lineTo(xCenter, 0);
    ctx.lineTo(xCenter + arrowIndent, arrowIndent);
    ctx.moveTo(canvasWidth - arrowIndent, yCenter - arrowIndent);
    ctx.lineTo(canvasWidth, yCenter);
    ctx.lineTo(canvasWidth - arrowIndent, yCenter + arrowIndent);
    ctx.stroke();
    ctx.closePath();

    // tick marks
    const labels = ['-R', '-R/2', '', 'R/2', 'R'];
    ctx.fillStyle = "black";

    for (let i = 1; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(i * canvasWidth / 6, canvasHeight / 2 - 5);
        ctx.lineTo(i * canvasWidth / 6, canvasHeight / 2 + 5);
        ctx.moveTo(canvasWidth / 2 - 5, i * canvasHeight / 6);
        ctx.lineTo(canvasWidth / 2 + 5, i * canvasHeight / 6);
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(labels[i - 1], i * canvasWidth / 6, canvasHeight / 2 - 7);

        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i - 1], canvasWidth / 2 + 7, canvasHeight - i * canvasHeight / 6);
        ctx.closePath();
    }
}

function drawPoints(){
    POINTS.forEach(point => {
        var rField_value;
        for(var i = 0; i < rField.length; i++){
            if(rField[i].checked){
                rField_value = rField[i].value;
            }
        }
        let x = point.x / rField_value * canvasWidth / 3 + canvasWidth / 2;
        let y = -point.y / rField_value * canvasHeight / 3 + canvasHeight / 2;
        ctx.fillStyle = '#ff5482';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    });
}


canvas.onclick = (e) => {
    var rField_value;
    for(var i = 0; i < rField.length; i++){
        if(rField[i].checked){
            rField_value = rField[i].value;
        }
    }
    let r = rField_value;
    let x = Math.round((2 * e.offsetX / canvasWidth - 1) * r * 1.5 * 100) / 100;
    let y = Math.round((-2 * e.offsetY / canvasHeight + 1) * r * 1.5 * 100) / 100;
    if (x>3 || x<-5 ||y>5 || y < -3){
        window.location.replace("error.jsp");
    }else {
        sendDataAjaxWithArgs(x, y, r);
    }

}