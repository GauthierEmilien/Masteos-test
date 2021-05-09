import express from 'express';
import { exercisesSet } from '../services/exerciseSet.service';
import {
  compileCode,
  createFileFromCode,
  testCode,
} from '../services/testExercise.service';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await exercisesSet();
  res.send(result);
});

router.get('/:step', async (req, res) => {
  const { step } = req.params;
  const exercise = (await exercisesSet())[+step];
  res.send(exercise);
});

router.post('/compile', async (req, res) => {
  try {
    const { code } = req.body;
    await createFileFromCode(code);
    await compileCode();
  } catch (error) {
    res.send(error);
    return;
  }
  res.send(true);
});

router.post('/test', async (req, res) => {
  const { test } = req.body;
  const result = await testCode(test);
  res.send(result);
});

export default router;
