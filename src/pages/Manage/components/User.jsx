import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function User ({ user }) {
  const isModo = localStorage.getItem('isModo')
  const isAdmin = localStorage.getItem('isAdmin')
  const [userIsModo, setUserIsModo] = useState(false)
  const [userIsAdmin, setUserIsAdmin] = useState(false)
  const [userIsBanned, setUserIsBanned] = useState(user.banned)
  const navigate = useNavigate()

  useEffect(() => {
    setUserIsModo(user.role.includes(user.role.find((role) => role.name === 'moderator')))
    setUserIsAdmin(user.role.includes(user.role.find((role) => role.name === 'admin')))
  }, [user.role])

  function handleClick(route) {
    const token_user = localStorage.getItem('authToken')
    const postData = {
      userId: user._id
    }
    axios.put(`${serverUrl}/api/roles/${route}`, postData,{
      headers: {
        Authorization: `Bearer ${token_user}`
      }
    })
      .then((response) => {
        console.log('Response:', response.data);
        if (route === 'promote') { setUserIsModo(true) }
        else if (route === 'demote') { setUserIsModo(false) }
        else if (route === 'ban') { setUserIsBanned(true) }
        else if (route === 'unban') { setUserIsBanned(false) }
      })
      .catch((error) => {
        console.error('Error:', error.response.data);
      });
  }

  function handleClickPlayer() {
    if (user.playerId !== null){
      navigate(`/player/${user.playerId.tag.substring(1)}`)
    }
  }


  return (
    <div className="manage-user-container m0" onClick={handleClickPlayer}>
        <div className="manage-user-role">{userIsAdmin ? "Admin" : userIsModo ? "Modo" : "Utilisateur"}</div>
        <div className="manage-user-mail">{user.email}</div>
        <div className="manage-user-league">{user.playerId != null && <img className="manage-league-icon" src={user.playerId.league.icon.url} alt="league" />}</div>
        <div className="manage-user-player"> {user.playerId !== null ? user.playerId.name : 'pas de joueur'}</div>
        <div className="manage-user-promote">
          {isAdmin && !userIsAdmin && !userIsBanned && ( userIsModo ?
            <button className="clash-button blue-button" onClick={() => handleClick("demote")}>Rétrograder</button> :
            <button className="clash-button blue-button" onClick={() => handleClick("promote")}>Promouvoir</button>)
          }
        </div>
        <div className="manage-user-ban">
          {isModo && !userIsModo && ( userIsBanned ?
            <button className="clash-button red-button" onClick={() => handleClick("unban")}>Débannir</button> :
            <button className="clash-button red-button" onClick={() => handleClick("ban")}>Bannir</button>
          )}
        </div>
    </div>)
}

export default User