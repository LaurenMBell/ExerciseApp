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
    const { name, reps, weight, unit, date } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({"Error": "Invalid request"});
    }
    if (!reps || Number(reps) <= 0) {
        return res.status(400).json({"Error": "Invalid request"});
    }
    if (!weight || Number(weight) < 0) {
        return res.status(400).json({"Error": "Invalid request"});
    }
    if (!unit || (unit !== 'kgs' && unit !== 'lbs' && unit !== 'miles')) {
        return res.status(400).json({"Error": "Invalid request"});
    }
    if (date) {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            return res.status(400).json({"Error": "Invalid request"});
        }
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
    const { name, reps, weight, unit, date } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({"Error": "Invalid request"});
    }
    if (Number(reps) <= 0) {
        return res.status(400).json({"Error": "Invalid request"});
    }
    if (Number(weight) < 0) {
        return res.status(400).json({"Error": "Invalid request"});
    }
    if (!unit || (unit !== 'kgs' && unit !== 'lbs' && unit !== 'miles')) {
        return res.status(400).json({"Error": "Invalid request"});
    }
    if (date) {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            return res.status(400).json({"Error": "Invalid request"});
        }
    }
    
    const numUpdated = await exercises.replaceExercise(
                 req.params.exercise_id, name, reps, weight, unit, date)
    if (numUpdated !== null) {
        res.json(numUpdated);
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

/**
 * DELETE the exercise whose id is provided in the parameters
 */
app.delete('/exercises/:exercise_id', asyncHandler(async(req, res) => {
    const deletedCount = await exercises.deleteById(req.params.exercise_id);
    if (deletedCount !== null) {
        res.status(204).send();
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));


