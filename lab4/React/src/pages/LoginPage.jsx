
import {Link} from "react-router-dom";
import Header from "../components/Header";
import {Login} from "../components/Login";
const LoginPage = () => {
    return(
        <div>
            <Header/>
            <main>
                <div className="form-panel">
                    <h1>Login</h1>
                    <Login/>
                    <p>
                        Or <Link to={"/register"}>register</Link>
                    </p>
                </div>
            </main>

        </div>
    )
}

export default LoginPage;