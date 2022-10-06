const xObject = document.getElementById("xVal");
const yObject = document.getElementById("yVal");
const rObject = document.getElementById("rVal");
const clearBtn = document.getElementById("clearBtn");
const checkBtn = document.getElementById("checkBtn");

xObject.addEventListener("input", validateX);
yObject.addEventListener("input", validateY);
rObject.addEventListener("input", validateR);
clearBtn.addEventListener("click", clearForm);
checkBtn.addEventListener("click", sendDataAjax);
window.onload = () => {
    validateAll();
    
    // fetch points from api
    checkBtn.disabled = true;
    fetch('php/getPoints.php', {credentials: 'include'})
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(resp.body);
            }
        })
        .then(json => renderPoints(json))
        .catch(alert)
        .finally(() => checkBtn.disabled = false);
}

function renderPoints(points) {
    const resultTableBody = document.getElementById('result-table-body');
    
    // Remove old rows
    resultTableBody.innerHTML = `<tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Текущее время</th>
        <th>Время работы</th>
        <th>Результат</th>
    </tr>`;

    // Add new rows
    points.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${p.x}</td>
            <td>${p.y}</td>
            <td>${p.r}</td>
            <td>${new Date(p.attempt_time * 1000).toLocaleString()}</td>
            <td>${p.process_time} ms</td>
            <td>${p.hit ? 'попал' : 'не попал хаха'}</td>
        `
        resultTableBody.appendChild(row);
    });
}

function sendDataAjax(){
    if (validateAll()) {
        const x = xObject.value;
        const y = yObject.value;
        const r = rObject.value;
        clearForm();
        checkBtn.disabled = true;

        fetch(`php/sendPoint.php?x=${x}&y=${y}&r=${r}`, {credentials:'include'})
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error(resp.body);
                }
            })
            .then(json => {
                renderPoints(json);
            })
            .catch(alert)
            .finally(() => checkBtn.disabled = false);
    }
}

function validateX(){
    let xVal = xObject.value;
    if (isNaN(xVal) || xVal === "") {
        xObject.style.border = "3px solid rgb(255, 0, 0)";
        return false;
    } else{
        xObject.style.border = "3px solid rgb(0, 196, 0)";
        return true;
    }
}

function validateY(){
    let yVal = yObject.value; 
    if (yVal === "" || isNaN(yVal) || yVal>5||yVal<-3){
        yObject.style.border = "3px solid rgb(255, 0, 0)";
        return false;
    } else{
        yObject.style.border = "3px solid rgb(0, 196, 0)";
        return true;
    }
}

function validateR(){
    let rVal = rObject.value; 
    if (rVal === "" || isNaN(rVal) || rVal>5||rVal<2){
        rObject.style.border = "3px solid rgb(255, 0, 0)";
        return false;
    } else{
        rObject.style.border = "3px solid rgb(0, 196, 0)";
        return true;
    }
}

function clearForm(){
    xObject.value = "";
    yObject.value = "";
    rObject.value = "";
    validateAll();
}

function validateAll(){
    return [validateX(), validateY(), validateR()].reduce((x, y) => x && y);
}




module.exports = {validateX, validateY, validateR, validateAll, clearForm, xObject, yObject, rObject, clearBtn, checkBtn}