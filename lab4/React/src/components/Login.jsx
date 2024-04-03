import {Form} from "./Form";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../store/slices/userSlice";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = (username, password) => {
        axios.post('http://localhost:8010/proxy/api/auth/login',{ username: username, password: password })
            .then(resp => {
                dispatch(setUser({
                username: username,
                token: resp.data.accessToken
                }));
                navigate("/");
            })
            .catch(error => {
                alert(error.response.data)
            })
    }
    return(
        <div>
            <Form title="Sign in" handleClick = {handleLogin}/>
        </div>
    )
}
function setHeaders() {

    return { headers: { 'Content-Type': 'application/json' }}

}

export {Login};