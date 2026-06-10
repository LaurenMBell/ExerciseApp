import '../App.css';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function ExerciseItem({ exercise, onDelete }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`/exercises/${exercise._id}`, {
                method: 'DELETE'
            });

            if (response.status === 204) {
                alert('Deleted!');
                onDelete(exercise._id);
            } else {
                alert('Could not delete :(');
            }
        } catch (error) {
            alert('Error deleting exercise.');
            console.error('Error:', error);
        }
    };

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date?.split('T')[0]}</td>
            <td>
                <button
                    type="button"
                    aria-label={`Edit ${exercise.name}`}
                    title="Edit"
                    onClick={() => navigate('/edit-exercise', { state: { exercise } })}
                >
                    <FaEdit />
                </button>
                <button
                    type="button"
                    aria-label={`Delete ${exercise.name}`}
                    title="Delete"
                    onClick={handleDelete}
                >
                    <FaTrashAlt />
                </button>
            </td>
        </tr>
    );
}

export default ExerciseItem;
