import {Form} from "./Form";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const navigate = useNavigate();


    const handleSignUp = (username, password) => {
        axios.post('http://localhost:8080/api/auth/register',{ username: username, password: password })
            .then(resp => {
                alert("Success!!");
                navigate("/login");
            })
            .catch(error => {
                alert(error.response.data+", password should have 3-10 symbols (a-zA-Z0-9)")
            })
    }
    return(
        <div>
            <Form title="Sign up" handleClick = {handleSignUp}/>
        </div>
    )
}
export {SignUp};