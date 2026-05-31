import 'dotenv/config';
import * as exersizesModel from './exersizes_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const ERROR_NOT_FOUND = {Error: 'Not found'}

const app = express();

app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})

/**
 * Create a new exersize
 */
app.post('/exercizes', (req, res) => {
    const exercize = exersizesModel.createExersize(req.body.name,req.body.reps,req.body.weight,req.body.unit,req.body.date, req.body._id);
        res.status(201).json(exercize)
});

/**
 * Retrieve all exersizes
 */
app.get('/exercizes', (req, res) => {
    const exercizes = exercizesModel.findExercize();
    res.json(exercizes);
});


/**
 * Retrieve the exersizes corresponding to the ID provided in the URL.
 */
app.get('/exercizes/:exercize_id', (req, res) => {
    const exercize = exersizesModel.findExercizeById(req.params._id);
    if (exercize !== null) {
        res.json(exercize);
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
});

/**
 * Update the exercize whose id is provided in the path parameter and set
 * its (parameters) to the values provided in the body.
 */
app.put('/exercizes/:exercize_id', (req, res) => {
    const numUpdated = exercizesModel.replaceExercize(
                req.body.name,req.body.reps,req.body.weight,req.body.unit,req.body.date, req.body._id)
    if (numUpdated === 1) {
        res.json({ _id: req.params.exercize_id, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, 
            date: req.body.date
         })
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
});

/**
 * Delete the exercize whose id is provided in the query parameters
 */
app.delete('/exercizes/:exercize_id', (req, res) => {
    const deletedCount = exercizesModel.deleteById(req.params.exercize_id);
    if (deletedCount === 1) {
        res.status(204).send();
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
});


