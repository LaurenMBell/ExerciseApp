import ExerciseItem from './ExerciseItem';

function ExerciseCollection({ Exercises }) {
    return (
        <div className="collection-container">
            {Exercises.map((exercise, i) => <ExerciseItem exercise={exercise} 
                    key={i} />)}
        </div>

    );
}

export default ExerciseCollection;