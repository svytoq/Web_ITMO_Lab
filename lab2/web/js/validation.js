const xObject = document.getElementById("xVal");
const yObject = document.getElementById("yVal");
const clearBtn = document.getElementById("clearBtn");
const checkBtn = document.getElementById("checkBtn");

xObject.addEventListener("input", validateX);
yObject.addEventListener("input", validateY);

clearBtn.addEventListener("click", clearForm);
checkBtn.addEventListener("click", sendDataAjax);




window.onload = () => {
    validateAll();
    redrawGraph();
}

function sendDataAjax(){
    if (validateAll()) {
        const x = xObject.value;
        const y = yObject.value;

        var rField_value;
        for(var i = 0; i < rField.length; i++){
            if(rField[i].checked){
                rField_value = rField[i].value;
            }
        }
        const r = rField_value;
        clearForm();
        checkBtn.disabled = true;
        fetch(`./controller?x=${x}&y=${y}&r=${r}`, {credentials:'include'})
            .then(resp => {
                if (resp.ok) {
                    window.location.replace("table.jsp");
                } else {
                    window.location.replace("error.jsp");
                }
            })
            .catch(alert)
            .finally(() => checkBtn.disabled = false);
    }
}

function sendDataAjaxWithArgs(x, y, r){
        checkBtn.disabled = true;
        console.log(`./controller?x=${x}&y=${y}&r=${r}`);
        fetch(`./controller?x=${x}&y=${y}&r=${r}`, {credentials:'include'})
            .then(resp => {
                if (resp.ok) {
                    window.location.replace("table.jsp");
                } else {
                    window.location.replace("error.jsp");
                }
            })
            .catch(alert)
            .finally(() => checkBtn.disabled = false);
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

function clearForm(){
    xObject.value = "";
    yObject.value = "";
    validateAll();
}

function validateAll(){
    return [validateX(), validateY()].reduce((x, y) => x && y);
}




