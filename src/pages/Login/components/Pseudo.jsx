function Pseudo({pseudo, setPseudo, setWrongPseudoOrPassword}) {
    return (
        <div>
            <label>Pseudo: </label>
                <input type="text" 
                    value={pseudo} 
                    onChange={(e) => {setPseudo(e.target.value); setWrongPseudoOrPassword(false)}}/>
        </div>
    )
}

export default Pseudo