import '../App.css';

function ExerciseItem({ exercise }) {
    //LAUREN THIS IS WHERE YOU STOPPED !!! UPDATE THE PARAMETERS TO BE FOR EXCERSIZES
    return (
        <div className="collection-item">
            <h3>{exercise.name}</h3>
            <p>{exercise.reps}, {exercise.weight}, {exercise.unit}, {exercise.date}</p>
            <p>
                <a href="/" onClick={e => e.preventDefault()}>Edit</a>&nbsp;
                <a href="/" onClick={e => e.preventDefault()}>Delete </a>
            </p>
        </div>
    );
}

export default ExerciseItem;