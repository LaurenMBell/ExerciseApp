import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const EditExercisePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const exercise = location.state?.exercise;

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (exercise) {
            setName(exercise.name);
            setReps(exercise.reps);
            setWeight(exercise.weight);
            setUnit(exercise.unit);
            setDate(exercise.date?.split('T')[0]);
        }
    }, [exercise]);

    const editExercise = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!name || !reps || weight === '' || !unit) {
            alert('Please fill in all required fields (name, reps, weight, unit).');
            return;
        }

        if (Number(reps) <= 0) {
            alert('Reps must be greater than 0.');
            return;
        }

        if (Number(weight) < 0) {
            alert('Weight cannot be negative.');
            return;
        }

        const updatedExercise = {
            name,
            reps: Number(reps),
            weight: Number(weight),
            unit,
            date: date || exercise.date
        };

        try {
            const response = await fetch(`/exercises/${exercise._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedExercise)
            });

            if (response.status === 200) {
                alert('Exercise updated successfully!');
                navigate('/');
            } else {
                alert('Error: bad input. Try again!');
            }
        } catch (error) {
            alert('Error updating exercise: ' + error.message);
            console.error('Error:', error);
        }
    };

    if (!exercise) {
        return <div><h1>Error: No exercise selected</h1></div>;
    }

    return (
        <div>
            <h1>Edit Exercise</h1>
            <form onSubmit={editExercise}>
                <p>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter exercise name"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="reps">Reps:</label>
                    <input
                        id="reps"
                        type="number"
                        placeholder="Enter reps"
                        value={reps}
                        onChange={e => setReps(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="weight">Weight:</label>
                    <input
                        id="weight"
                        type="number"
                        placeholder="Enter weight"
                        value={weight}
                        onChange={e => setWeight(e.target.value)} />
                </p>
                <p>
                    <label htmlFor="unit">Unit:</label>
                    <select
                        id="unit"
                        value={unit}
                        onChange={e => setUnit(e.target.value)}>
                        <option value="kgs">kgs</option>
                        <option value="lbs">lbs</option>
                        <option value="miles">miles</option>
                    </select>
                </p>
                <p>
                    <label htmlFor="date">Date:</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)} />
                </p>
                <button type="submit">Update Exercise</button>
            </form>
        </div>
    );
}

export default EditExercisePage;