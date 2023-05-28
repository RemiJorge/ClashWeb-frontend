

function Password({token, setToken, setWrongTagOrToken}) {

    return (
        <div className="input-container ic1 max-login-coc">
            <input type="text" 
                value={token}
                className = "input"
                placeholder=" "
                onChange={(e) => {setToken(e.target.value); setWrongTagOrToken(false)}} />
            <div class="cut cut"></div>
            <label className="placeholder">Token</label>
        </div>
    )
}

export default Password