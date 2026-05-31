import { Link } from 'react-router-dom';
import ExerciseCollection from '../components/ExerciseCollection';
import { useState} from 'react';

function HomePage() {
    const [Exercises, setExercises] = useState([]);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseCollection Exercises={Exercises}></ExerciseCollection>
            <Link to="/add-exercise">Add a Exercise</Link>
        </>
    );
}

export default HomePage;