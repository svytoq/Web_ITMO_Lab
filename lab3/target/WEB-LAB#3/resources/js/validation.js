

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

}

function validateY(){

}

function clearForm(){

}

function validateAll(){

}




