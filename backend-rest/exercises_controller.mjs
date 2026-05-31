import 'dotenv/config';
import * as exercisesModel from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const ERROR_NOT_FOUND = {Error: 'Not found'}

const app = express();

app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})

/**
 * Create a new exercise
 */
app.post('/exercises', (req, res) => {
    const exercise = exercisesModel.createExercise(req.body.name,req.body.reps,req.body.weight,req.body.unit,req.body.date, req.body._id);
        res.status(201).json(exercise)
});

/**
 * Retrieve all exercises
 */
app.get('/exercises', (req, res) => {
    const exercises = exercisesModel.findExercise();
    res.json(exercises);
});


/**
 * Retrieve the exercises corresponding to the ID provided in the URL.
 */
app.get('/exercises/:exercise_id', (req, res) => {
    const exercise = exercisesModel.findexerciseById(req.params._id);
    if (exercise !== null) {
        res.json(exercise);
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its (parameters) to the values provided in the body.
 */
app.put('/exercises/:exercise_id', (req, res) => {
    const numUpdated = exercisesModel.replaceExercise(
                req.body.name,req.body.reps,req.body.weight,req.body.unit,req.body.date, req.body._id)
    if (numUpdated === 1) {
        res.json({ _id: req.params.exercise_id, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, 
            date: req.body.date
         })
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:exercise_id', (req, res) => {
    const deletedCount = exercisesModel.deleteById(req.params._id);
    if (deletedCount === 1) {
        res.status(204).send();
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
});


