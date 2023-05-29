function Email({email, setEmail, setWrongEmailOrPassword}) {
    return (
        <div className="input-container ic1">
                <input type="email" 
                    value={email}
                    id="login-email"
                    className="input"
                    placeholder=" "
                    onChange={(e) => {setEmail(e.target.value); setWrongEmailOrPassword(false)}}/>
                <div className="cut"></div>
                <label className="placeholder">Email</label>
        </div>
    )
}
export default Email