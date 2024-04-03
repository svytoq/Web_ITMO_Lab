import {Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAuth} from "../hooks/use-auth";
import {removeUser} from "../store/slices/userSlice";
import Header from "../components/Header";
import AreaForm from "../components/AreaForm";
import Graph from "../components/Graph/Graph";
import ResultTable from "../components/ResultTable";
import {useEffect} from "react";
import axios from "axios";
import {setPoints} from "../store/slices/pointsSlice";

const HomePage = () => {
    const dispatch = useDispatch();

    const {isAuth, username} = useAuth();
    useEffect(() => {
        axios.get('http://localhost:8010/proxy/api/points')
            .then(resp => {
                dispatch(setPoints({points: resp.data}))
            })
            .catch(error => {
                alert(error)
            })
    })

    return isAuth ? (
        <div>
            <Header/>
            <main>
                <div>
                    <button
                        id={"logOutButton"}
                        onClick={
                            ()=> {dispatch(removeUser())
                                localStorage.clear()
                            }

                        }
                    >Log out from {username}</button>
                </div>
                <Graph/>

                <AreaForm/>
            </main>
            <ResultTable/>
        </div>
    ) : (
        <Navigate to="/login" />
    )
}
export default HomePage;