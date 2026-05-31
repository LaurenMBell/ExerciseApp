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
const createExercise = (title, year, language) => {
    const exercise = new Exercise(title, year, language);
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
 * Replace the title, year, language properties of the exercise with the id value provided
 * @param {String} _id 
 * @param {String} title 
 * @param {Number} year 
 * @param {String} language 
 * @returns Number of documents modified
 */
const replaceExercise = (_id, title, year, language) => {
    const result = exercises.filter( (exercise) => _id === exercise._id)
    if(result.length === 0) {
        return 0;
    } else{
        const exercise = result[0];
        exercise.title = title;
        exercise.year = year;
        exercise.language = language;
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
