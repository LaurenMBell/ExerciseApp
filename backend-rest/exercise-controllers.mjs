import 'dotenv/config';
import * as exercises from './exercise-models.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';

const PORT = process.env.PORT;

const ERROR_NOT_FOUND = {Error: 'Not found'}
const ERROR_INVALID_REQUEST = {Error: 'Invalid request'}

const app = express();

app.use(express.json());

await exercises.connect();

app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})

function isValidExercise({ name, reps, weight, unit, date }) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return false;
    }
    if (!Number.isInteger(Number(reps)) || Number(reps) <= 0) {
        return false;
    }
    if (!Number.isInteger(Number(weight)) || Number(weight) < 0) {
        return false;
    }
    if (unit !== 'kgs' && unit !== 'lbs' && unit !== 'miles') {
        return false;
    }
    if (date && isNaN(Date.parse(date))) {
        return false;
    }
    return true;
}

/**
 * POST
 */
app.post('/exercises', asyncHandler(async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;
    
    if (!isValidExercise(req.body)) {
        return res.status(400).json(ERROR_INVALID_REQUEST);
    }
    
    const exercise = await exercises.createExercise(name, reps, weight, unit, date);
    res.status(201).json(exercise);
}));

/**
 * GET all exercizes 
 */
app.get('/exercises', asyncHandler(async(req, res) => {
    const result = await exercises.findExercises();
    res.status(200).json(result);
}));

/**
 * GET the exercises corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', asyncHandler(async(req, res) => {
    const exercise = await exercises.findExerciseById(req.params._id);
    if (exercise !== null) {
        res.json(exercise);
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

/**
 * PUT the exercise whose id is provided in the path parameter and set
 * its (parameters) to the values provided in the body.
 */
app.put('/exercises/:_id', asyncHandler(async(req, res) => {
    const { name, reps, weight, unit, date } = req.body;

    if (!isValidExercise(req.body)) {
        return res.status(400).json(ERROR_INVALID_REQUEST);
    }

    const numUpdated = await exercises.replaceExercise(
                 req.params._id, name, reps, weight, unit, date)
    if (numUpdated !== null) {
        res.status(200).json(numUpdated);
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

/**
 * DELETE the exercise whose id is provided in the parameters
 */
app.delete('/exercises/:_id', asyncHandler(async(req, res) => {
    const deletedCount = await exercises.deleteById(req.params._id);
    if (deletedCount !== null) {
        res.status(204).send();
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));


