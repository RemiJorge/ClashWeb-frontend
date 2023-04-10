import {useState} from 'react'
import axios from 'axios'

const serverUrl = process.env.REACT_APP_SERVER_URL

function ForgetPassword(){
    const [email, setEmail] = useState('')
    const [wrongEmail, setWrongEmail] = useState(false)
    const [emailSend, setEmailSend] = useState(false)


    function handleSummit(e) {
        e.preventDefault()
        //regex email verification
        if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null) {
            setWrongEmail(true)
            return
        }
        const postData = {
            email: email
        }
        axios.post(`${serverUrl}/api/auth/forget-password`, postData)

        .then((response) => {
            setEmailSend(true)
        })
        .catch((error) => {
            console.error('Error:', error.response.data.raison);
            if (error.response.data.raison === 'email incorrect') {
                setWrongEmail(true)
            }
        });
    }

    return (
        <div>
            <h1>Mot de passe oublié</h1>
            <form onSubmit={handleSummit}>
                {emailSend ? <p>Email envoyé avec votre nouveau mot de passe à {email}</p> : <>
                <p>Un email vous sera envoyé pour réinitialiser votre mot de passe</p>
                <label>Email: </label>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value); setWrongEmail(false)}}/>
                {wrongEmail && <p className='incorrect'>Email incorrect</p>}
                <input type="submit" value="Envoyer" /></>}
            </form>
        </div>
    )
};

export default ForgetPassword