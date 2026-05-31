import exercises from './data/exercises.mjs';
import Exercise from './exercise.mjs';


/**
 * Create an exercize
 * @param {string} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {Date} date
 * @param {Object} _id
 * @returns
 */
const createExercise = (name, reps, weight, unit, date, _id) => {
    const exercise = new Exercise(name, reps, weight, unit, date, _id);
    exercises.push(exercise)
    return exercise;
}

/**
 * Retrieve all exercises
 * @returns 
 */
const findExercises = () => {
    return exercises;
}

/**
 * Retrieve exercises based on the ID
 * @param {Object} exercise_id
 * @returns 
 */
const findExerciseById = (exercise_id) => {
    const result = exercises.filter( (exercise) => exercise_id === exercise._id)
    return result.length === 0 ? null : result[0]
}

/**
 * Replace the properties of the exercise with the id value provided
 * @param {string} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {Date} date
 * @param {Object} _id
 * @returns Number of documents modified
 */
const replaceExercise = (name, reps, weight, unit, date, _id) => {
    const result = exercises.filter( (exercise) => _id === exercise._id)
    if(result.length === 0) {
        return 0;
    } else{
        const exercise = result[0];
        exercise.name = name;
        exercise.reps = reps;
        exercise.weight = weight;
        exercise.unit = unit;
        exercise.date = date;
        exercise._id = _id;
        return 1;
    }
}


/**
 * Delete the exercise with provided id value
 * @param {String} _id 
 * @returns Count of deleted documents
 */
const deleteById = (_id) => {
    for(let i = 0; i < exercises.length; i++){
        if(exercises[i]._id === _id){
            exercises.splice(i, 1)
            return 1;
        }
    }
    return 0;
}

export { createExercise, findExercises, findExerciseById, replaceExercise, deleteById };
