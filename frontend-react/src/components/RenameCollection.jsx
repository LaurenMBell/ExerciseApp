import ExerciseItem from './ExerciseItem';

function ExerciseCollection({ movies}) {
    return (
        <div className="collection-container">
            {exercises.map((exercuse, i) => <ExerciseItem exercise={exercise} 
                    key={i} />)}
        </div>

    );
}

export default ExerciseCollection;