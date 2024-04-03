import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setPoints} from "../../store/slices/pointsSlice";




const Graph = (props) => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    let canvas;
    let ctx;
    let canvasWidth;
    let canvasHeight;
    let xCenter;
    let yCenter;


    const scaleX = 41.6;
    const scaleY = 41.6;

    const points = useSelector(state => state.points.points);
    const currentR = useSelector(state => state.points.currentR);
    useEffect(() => {

        canvas = canvasRef.current;
        ctx = canvas.getContext('2d');
        canvasWidth = canvas.clientWidth;
        canvasHeight = canvas.clientHeight;
        xCenter = Math.round(canvasWidth/scaleX/2)*scaleX;
        yCenter = Math.round(canvasHeight/scaleY/2)*scaleY;
        redrawGraph();
    }, [points, currentR])
    return (
        <div className="GraphPanel">
            <canvas id="graph" width="500" height="500" ref={canvasRef}>graph</canvas>
        </div>
    );


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
        ctx.arc(xCenter,yCenter,166.4,0,-Math.PI/2,true);
        ctx.lineTo(xCenter,yCenter);
        ctx.lineTo(xCenter-166.4,yCenter);
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();
    }
    function drawRectangle(){
        ctx.beginPath();
        ctx.moveTo(xCenter,yCenter);
        ctx.lineTo(xCenter-83.2,yCenter);
        ctx.lineTo(xCenter-83.2,yCenter-166.4);
        ctx.lineTo(xCenter,yCenter-166.4);
        ctx.lineTo(xCenter,yCenter);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    function drawTriangle(){
        ctx.beginPath();
        ctx.moveTo(xCenter,yCenter);;
        ctx.lineTo(xCenter+166.4,yCenter);
        ctx.lineTo(xCenter,yCenter+166.4);
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
            ctx.moveTo(i*canvasWidth/6, canvasHeight/2-5);
            ctx.lineTo(i*canvasWidth/6, canvasHeight/2+5);
            ctx.moveTo(canvasWidth/2-5, i*canvasHeight/6);
            ctx.lineTo(canvasWidth/2+5, i*canvasHeight/6);
            ctx.stroke();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(labels[i-1], i*canvasWidth/6, canvasHeight/2-7);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(labels[i-1], canvasWidth/2+7, canvasHeight - i*canvasHeight/6);
            ctx.closePath();
        }
    }
    function redrawGraph(){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawGraph();
        drawPoints();
    }
    function drawPoint(x, y, r, fill) {
        let cx = x / r * canvasWidth / 3 + canvasWidth / 2;
        let cy = -y / r * canvasHeight / 3 + canvasHeight / 2;
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }

    function drawPoints() {

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawGraph();

        points.map(v => {
            let x = parseFloat(v.x);
            let y = parseFloat(v.y);
            let r = parseFloat(v.r);
            let hit = v.success;

            if (!isNaN(x) && !isNaN(y)) {
                if (currentR == r) {
                    if (hit) {
                        drawPoint(x, y, currentR, "#26ffdf");
                    } else {
                        drawPoint(x, y, currentR, "#f26a1b");
                    }
                } else {
                    drawPoint(x, y, currentR, "#025159");
                }
            }
        });
        canvas.onclick = (e) => {
            let X =  Math.round((2 * e.offsetX / canvasWidth - 1) * currentR * 1.5 * 100) / 100;
            let Y = Math.round((-2 * e.offsetY / canvasHeight + 1) * currentR * 1.5 * 100) / 100;
            axios.post('http://localhost:8010/proxy/api/points',{ x: X, y: Y, r: currentR })
                .then(resp => {
                    dispatch(setPoints({points: resp.data}))
                })
                .catch(error => {
                    alert(error)
                })
        }
    }


}




export default Graph;
