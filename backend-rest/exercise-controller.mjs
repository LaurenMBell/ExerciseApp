import 'dotenv/config';
import * as exercises from './exercise-model.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';

const PORT = process.env.PORT;

const ERROR_NOT_FOUND = {Error: 'Not found'}

const app = express();

app.use(express.json());

app.listen(PORT, async()=>{
    await exercises.connect();
    console.log(`Server listening on port: ${PORT}`)
})

/**
 * POST
 */
app.post('/exercises', asyncHandler(async (req, res) => {
    const { name, reps, weight, unit, date, _id } = req.body;
    const exercise = await exercises.createExercise(req.body.name,req.body.reps,req.body.weight,req.body.unit,req.body.date, req.body._id);
        res.status(201).json(exercise)
}));

/**
 * GET all exercizes 
 */
app.get('/exercises', asyncHandler(async(req, res) => {
    const result = await exercises.findExercisebyId(req.params._id);
    res.status(200).json(result);
}));

/**
 * GET the exercises corresponding to the ID provided in the URL.
 */
app.get('/exercises/:exercise_id', asyncHandler(async(req, res) => {
    const exercise = await exercises.findExerciseById(req.params.exercise_id);
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
app.put('/exercises/:exercise_id', asyncHandler(async(req, res) => {
    const numUpdated = await exercises.replaceExercise(
                 req.body.exercise_id, req.body.name,req.body.reps,req.body.weight,req.body.unit,req.body.date)
    if (numUpdated === 1) {
        res.json({ _id: req.params.exercise_id, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, 
            date: req.body.date
         })
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

/**
 * DELETE the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:exercise_id', asyncHandler(async(req, res) => {
    const deletedCount = await exercises.deleteById(req.params.exercise_id);
    if (deletedCount === 1) {
        res.status(204).send();
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));


