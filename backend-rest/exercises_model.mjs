import exercises from './data/exercises.mjs';
import Exercise from './exercise.mjs';
import mongoose from 'mongoose';
import 'dotenv/config';

let connection = undefined;

//function from assignment 7 that connects to MongoDB server 
async function connect() {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch (err) {
        console.log(err);
        throw Error('Couldnt connect to MongoDB ${err.message}')
    }
}

// exercise schema
const exerciseSchema = new.mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: Date, required: true},
    _id: {type: Object, required: true}
});

const Exercise = mongoose.model('Exercise', exerciseSchema, 'exercises');

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
    return exercise.save();
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
