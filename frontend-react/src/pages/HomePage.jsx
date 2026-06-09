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

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseCollection Exercises={Exercises}></ExerciseCollection>
        </>
    );
}

export default HomePage;