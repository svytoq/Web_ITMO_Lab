import {Link} from "react-router-dom";
import Header from "../components/Header";
import {SignUp} from "../components/SignUp";

const RegisterPage = () => {
    return(
        <div>
            <Header/>
            <main>
                <div className="form-panel">
                    <h1>Register</h1>
                    <SignUp/>
                    <p>
                        Already have an account? <Link to={"/login"}>Sign in</Link>
                    </p>
                </div>
            </main>

        </div>
    )
}

export default RegisterPage;