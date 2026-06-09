import { useState } from 'react';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const addExercise = async () => {
    
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setTitle(e.target.value)} />
            <input
                type="text"
                placeholder="Enter reps here"
                value={reps}
                onChange={e => setTitle(e.target.value)} />
            <input
                type="text"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setTitle(e.target.value)} />
            <input
                type="text"
                placeholder="Enter unit here"
                value={unit}
                onChange={e => setTitle(e.target.value)} />
            <input
                type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setTitle(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;