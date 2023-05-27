function Email({email, setEmail, setWrongEmailOrPassword}) {
    return (
        <div>
            <label>email: </label>
                <input type="text" 
                    value={email} 
                    onChange={(e) => {setEmail(e.target.value); setWrongEmailOrPassword(false)}}/>
        </div>
    )
}

export default Email