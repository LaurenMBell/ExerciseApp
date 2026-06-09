import '../App.css';

function ExerciseItem({ exercise }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date?.split('T')[0]}</td>
            <td>
                <a href="/" onClick={e => e.preventDefault()}>Edit</a>&nbsp;
                <a href="/" onClick={e => e.preventDefault()}>Delete</a>
            </td>
        </tr>
    );
}

export default ExerciseItem;