import ExerciseItem from './ExerciseItem';

function ExerciseCollection({ exercise }) {
    return (
        <div className="collection-container">
            {exercises.map((exercise, i) => <ExerciseItem exercise={exercise} 
                    key={i} />)}
        </div>

    );
}

export default ExerciseCollection;