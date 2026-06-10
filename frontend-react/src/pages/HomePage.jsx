import ExerciseCollection from '../components/ExerciseCollection';
import { useState, useEffect } from 'react';

function HomePage() {
    const [Exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch('/exercises');
                const data = await response.json();
                setExercises(data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };
        fetchExercises();
    }, []);

    const removeExercise = (_id) => {
        setExercises(Exercises.filter(exercise => exercise._id !== _id));
    };

    return (
        <>
            <h2>Exercises</h2>
            <ExerciseCollection Exercises={Exercises} onDelete={removeExercise}></ExerciseCollection>
        </>
    );
}

export default HomePage;
