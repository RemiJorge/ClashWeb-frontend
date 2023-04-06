import { Link, useParams } from 'react-router-dom'

function Survey() {
    const { num } = useParams()
    const n = parseInt(num)
    return (
        <div>
            <h1>Questionnaire 🧮</h1>
            <h2>Question {num}</h2>
            {n > 1 ? <Link to={`/survey/${num-1}`}>Precedent</Link> : null}
            {n === 10 ? ( 
                <Link to={`/results`}>Résultats</Link>
            ) : (
                <Link to={`/survey/${parseInt(n)+1}`}>Suivant</Link>
            )}
        </div>
    )
}

export default Survey