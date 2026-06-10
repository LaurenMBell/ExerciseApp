import ExerciseItem from './ExerciseItem';

function ExerciseCollection({ Exercises, onDelete }) {
    return (
        <table className="exercises-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {Exercises.map((exercise, i) => <ExerciseItem exercise={exercise} 
                        key={exercise._id || i} onDelete={onDelete} />)}
            </tbody>
        </table>
    );
}

export default ExerciseCollection;
