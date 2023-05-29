import { useState, useEffect } from "react"
import axios from "axios"
import User from "./components/User"
import Loader from "../../components/Loader"
import './style.css'

const serverUrl = process.env.REACT_APP_SERVER_URL;


function Manage(){

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const token_user = localStorage.getItem('authToken')
        axios.get(`${serverUrl}/api/auth/users`, {
            headers: {
                Authorization: `Bearer ${token_user}`
            }
        })
            .then((response) => {
                console.log('Response:', response.data);
                setUsers(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
            });
    }, [])

                
    //affiche tous les utilisateurs recupérés dans la base de données
    return (
        <div className="page-container">
            <h1 className="ic1">Gérer les utilisateurs</h1>
            <div>
                {loading ? <Loader /> :
                users.map((user) => {
                    return <User key={user._id} user={user} />
                })}
            </div>
        </div>
    )
}

export default Manage