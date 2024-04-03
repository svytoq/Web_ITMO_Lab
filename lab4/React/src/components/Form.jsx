import {useState} from "react";
import axios from "axios";
import validator from "validator";

const Form = ({title, handleClick}) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    return (
        <div>
            <input
                type={"text"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={"username"}
            />
            <input
                type={"password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder={"password"}
            />
            <hr/>
            <button
                onClick={()=>handleClick(username, pass)}
            >
                {title}
            </button>
        </div>
    )
}
export {Form};