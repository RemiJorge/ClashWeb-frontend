import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import OldPassword from './components/OldPassword'
import ConfirmPassword from './components/ConfirmPassword'
import NewPassword from './components/NewPassword'


const serverUrl = process.env.REACT_APP_SERVER_URL

function ChangePassword() {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [newPasswordError, setNewPasswordError] = useState(true)
    const [confirmPasswordError, setConfirmPasswordError] = useState(true)
    const [wrongPassword, setWrongPassword] = useState(false)

    const [changeSuccess, setChangeSuccess] = useState(false)

    const navigate = useNavigate()

    function handleSummit(e) {
        e.preventDefault()
        if (newPasswordError || confirmPasswordError) {
            console.log('error')
        } else {
            const postData = {
                password: password,
                newPassword: newPassword,
            }
            
            const token = localStorage.getItem('authToken')
            if (!token) {
                navigate('/login')
            }

            axios.post(`${serverUrl}/api/auth/change-password`, postData, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
                .then((response) => {
                    setChangeSuccess(true)
                })
                .catch((error) => {
                    console.error('Error:', error.response.data.raison);
                    if (error.response.data.raison === 'password incorrect') {
                        setWrongPassword(true)
                    }
                });
        }
    }

    return (
        <div>
            <h1>Changer de mot de passe</h1>
            <form onSubmit={handleSummit}>
                {changeSuccess ? <p>Mot de passe changé avec succès</p> :
                <>
                    <OldPassword password={password} setPassword={setPassword} setWrongPassword={setWrongPassword} />
                    {wrongPassword && <p className='incorrect'>Mot de passe incorrect</p>}
                    <NewPassword password={newPassword} setPassword={setNewPassword} setPasswordError={setNewPasswordError} />
                    <ConfirmPassword password={newPassword} setConfirmPasswordError={setConfirmPasswordError} />
                    <input type="submit" value="Changer de mot de passe" />
                </>}
            </form>
        </div>
    )
}

export default ChangePassword