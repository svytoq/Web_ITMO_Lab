/**
 * @jest-environment jsdom
 */

document.body.innerHTML =
                    '<div class="xRect">' + 
                    '<label for="xVal">X</label>' +
                    '<select name = "xVal" id = "xVal" class = "xVal" >' +
                        '<option disabled selected></option>' +
                        '<option value="-5">-5</option>' +
                        '<option value="-4">-4</option>' +
                        '<option value="-3">-3</option>' +
                        '<option value="-2">-2</option>' +
                        '<option value="-1">-1</option>' +
                        '<option value="0">0</option>' +
                        '<option value="1">1</option>' +
                        '<option value="2">2</option>' +
                        '<option value="3">3</option>' +
                    '</select>' +
                '</div>' +
                '<div class="yRect">' +
                    '<label for="yVal">Y</label>' +
                    '<input type="number"  name = "yVal" id = "yVal" class = "yVal"  placeholder="от -3 до 5">' +
                '</div>' +
                '<div class="rRect">' +
                    '<label for="rVal">R</label>' +
                    '<input type="number" name = "rVal" id = "rVal" class = "rVal"  placeholder="от 2 до 5">' +
                '</div>' +
                '<div class="ckeckBtn">' + 
                    '<input id="checkBtn" name="checkBtn" class="button" type="submit" title="Проверить">' +
                '</div>' +
                '<div class="ckeckBtn2">' + 
                    '<input id="clearBtn" name="clearBtn" class="button" type="reset">' +
                '</div>'
                ;
                
    const {validateX, validateY, validateR, validateAll, xObject, yObject, rObject, clearBtn, checkBtn, clearForm} = require("./validation")    
     


describe("Validate functions", () =>{

    test("should validate x", () => {
        console.log(xObject)
        xObject.value = ""
        expect(validateX()).toBe(false)
    })

    test("should validate x", () => {
        xObject.value = -5
        expect(validateX()).toBe(true)
    })

    test("should validate x", () => {
        xObject.value = 3
        expect(validateX()).toBe(true)
    })

    test("should validate x", () => {
        xObject.value = 4
        expect(validateX()).toBe(false)
    })



    test("should validate y∈[-3 ; 5]", () => {
        yObject.value = -4
        expect(validateY()).toBe(false)
    })

    test("should validate y∈[-3 ; 5]", () => {
        yObject.value = -3
        expect(validateY()).toBe(true)
    })

    test("should validate y∈[-3 ; 5]", () => {
        yObject.value = 5
        expect(validateY()).toBe(true)
    })

    test("should validate y∈[-3 ; 5]", () => {
        yObject.value = 6
        expect(validateY()).toBe(false)
    })

    test("should validate r∈[2 ; 5]", () => {
        rObject.value = 1
        expect(validateR()).toBe(false)
    })

    test("should validate r∈[2 ; 5]", () => {
        rObject.value = 2
        expect(validateR()).toBe(true)
    })

    test("should validate r∈[2 ; 5]", () => {
        rObject.value = 5
        expect(validateR()).toBe(true)
    })

    test("should validate r∈[2 ; 5]", () => {
        rObject.value = 6
        expect(validateR()).toBe(false)
    })


    test("should validate all input", () =>{
        xObject.value = 3
        yObject.value = 3
        rObject.value = 3
        expect(validateAll()).toBe(true)
    })

    test("should validate all input", () =>{
        xObject.value = 3
        yObject.value = 3
        rObject.value = 1
        expect(validateAll()).toBe(false)
    })
})

describe("clear button", () =>{
    test("should clear all input form", () =>{
        clearForm()
        expect(xObject.value).toEqual("")
        expect(yObject.value).toEqual("")
        expect(rObject.value).toEqual("")
    })
})

