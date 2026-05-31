import '../App.css';

function ExerciseItem({ exercise }) {
    //LAUREN THIS IS WHERE YOU STOPPED !!! UPDATE THE PARAMETERS TO BE FOR EXCERSIZES
    return (
        <div className="collection-item">
            <h3>{exercise.title}</h3>
            <p>{exercise.year}, {exercise.language}</p>
            <p>
                <a href="/" onClick={e => e.preventDefault()}>Edit</a>&nbsp;
                <a href="/" onClick={e => e.preventDefault()}>Delete </a>
            </p>
        </div>
    );
}

export default ExerciseItem;