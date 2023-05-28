function Email({tag, setTag, setWrongTagOrToken}) {
    return (
        <div className="input-container ic1 max-login-coc">
            <input type="text" 
                value={tag} 
                className = "input"
                placeholder=" "
                onChange={(e) => {setTag(e.target.value); setWrongTagOrToken(false)}} />
            <div class="cut"></div>
            <label className="placeholder">Tag #</label>
        </div>
    )
}

export default Email