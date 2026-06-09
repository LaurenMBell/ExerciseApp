import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddExercisePage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');

    const addExercise = async (e) => {
        e.preventDefault();
        
        const newExercise = {
            name,
            reps: Number(reps),
            weight: Number(weight),
            unit,
            date: date || new Date().toISOString().split('T')[0]
        };

        try {
            const response = await fetch('/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newExercise)
            });

            if (response.status === 201) {
                alert('Exercise added successfully!');
                navigate('/');
            } else {
                alert('Failed to add exercise. Please check your input.');
            }
        } catch (error) {
            alert('Error adding exercise: ' + error.message);
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <form onSubmit={addExercise}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter exercise name"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="reps">Reps:</label>
                    <input
                        id="reps"
                        type="number"
                        placeholder="Enter reps"
                        value={reps}
                        onChange={e => setReps(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="weight">Weight:</label>
                    <input
                        id="weight"
                        type="number"
                        placeholder="Enter weight"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="unit">Unit:</label>
                    <select
                        id="unit"
                        value={unit}
                        onChange={e => setUnit(e.target.value)}>
                        <option value="kgs">kgs</option>
                        <option value="lbs">lbs</option>
                        <option value="miles">miles</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)} />
                </div>
                <button type="submit">Add Exercise</button>
            </form>
        </div>
    );
}

export default AddExercisePage;