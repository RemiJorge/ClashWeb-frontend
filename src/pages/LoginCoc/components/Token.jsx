

function Password({token, setToken}) {

    return (
        <div>
            <label>Token: </label>
            <input type="text" 
                value={token} 
                onChange={(e) => setToken(e.target.value)} />
        </div>
    )
}

export default Password