function Email({tag, setTag}) {
    return (
        <div>
            <label>Tag: </label>
                <input type="text" 
                    value={tag} 
                    onChange={(e) => setTag(e.target.value)}/>
        </div>
    )
}

export default Email