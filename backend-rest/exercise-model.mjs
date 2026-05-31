'use strict'
import exercises from './exercises.mjs';
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
const exerciseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: Date, required: true},
    _id: {type: Object, required: true}
});

const exerciseModel = mongoose.model('Exercise', exerciseSchema, 'exercises');

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
async function createExercise(name, reps, weight, unit, date, _id){
    const exercise = new Exercise(name, reps, weight, unit, date, _id);
    return exercise.save();
}

/**
 * Retrieve all exercises
 * @returns 
 */
async function findExercises() {
    return exercises;
}

/**
 * Retrieve exercises based on the ID
 * @param {Object} exercise_id
 * @returns 
 */
async function findExerciseById(exercise_id){
    return exerciseModel.findById(exercise_id);
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
async function replaceExercise(name, reps, weight, unit, date, _id) {
    return exerciseModel.findByIDAndDelete(_id,name, reps, weight, unit, date, {new : true});
}

/**
 * Delete the exercise with provided id value
 * @param {String} _id 
 * @returns Count of deleted documents
 */
async function deleteById(_id){
    return exerciseModel.findByIDAndDelete(_id)
}

export { connect, createExercise, findExercises, findExerciseById, replaceExercise, deleteById };
