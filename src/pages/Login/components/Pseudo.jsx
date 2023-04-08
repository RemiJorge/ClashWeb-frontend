function Pseudo({pseudo, setPseudo}){
    return (
        <div>
            <label>Pseudo: </label>
                <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)}/>
        </div>
    )
}

export default Pseudo