import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import Select from 'react-select';
import axios from "axios";
import {setUser} from "../store/slices/userSlice";
import {setCurrentR, setPoints} from "../store/slices/pointsSlice";

export default function AreaForm() {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem("token");
    const [X, setX] = useState(-3);
    const [Y, setY] = useState('');
    const [R, setR] = useState(1);


    const dispatch = useDispatch();



    return (
        <div className="areaForm">
            <form className="send_form">
                <div className="x_block">

                    <label>X: </label>
                    <select name="x" id="xValue" className="selectField" onChange={e =>{setX(e.target.value)}}>
                        <option value="-3">-3</option>
                        <option value="-2">-2</option>
                        <option value="-1">-1</option>
                        <option id="defaultX" value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">-4</option>
                    </select>
                </div>

                <div className="r_block">
                    <label>R: </label>
                    <select name="r" id="rValue" className="selectField"
                            onChange={e =>{
                                setR(e.target.value)
                                dispatch(setCurrentR({currentR: e.target.value}))
                            }}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option id="defaultX" value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div className="y_block">
                    <label>Y: </label>
                    <input autoComplete="off" className="inputY" id="y" maxLength="8" name="y"
                           placeholder="Введите число от -3 до 3"
                           title="Введите число" type="text"
                           onChange={
                                e =>{
                                    if(yValidate()){setY(e.target.value)}
                                }

                            }
                    />
                    <a id={"yError"} style={{color: "red", display:"none"}}> Введите число от -3 до 3 </a>
                </div>
            </form>
            <div className="send_button_block">
                <button
                    onClick={() => sendPoint()}
                    id="send_button"
                >Отправить</button>
            </div>
        </div>
    )


    function yValidate(){
        let yField = document.getElementById("y");
        let yError = document.getElementById("yError");
        let submit = document.getElementById("send_button");
        const FLOAT_REGEX = /^-?\d+(?:\.\d+)?$/;
        let inputY = parseFloat(yField.value);
        if (inputY>=3 || inputY<=-3 || Number.isNaN(inputY) || !FLOAT_REGEX.test(yField.value)){
            yError.style.display = "block";
            submit.disabled = true;
            return false;
        } else {
            yError.style.display = "none";
            submit.disabled = false;
            return true;
        }
    }

    function sendPoint(){

        axios.post('http://localhost:8010/proxy/api/points',{ x: X, y: Y, r: R })
            .then(resp => {
                dispatch(setPoints({points: resp.data}))
            })
            .catch(error => {
                alert(error)
            })
    }

}