import request from 'supertest';
import { app } from '../../app';
import * as exercisesSet from '../../services/exerciseSet.service';
import * as testExercise from '../../services/testExercise.service';

const fakeExercises: exercisesSet.Exercise[] = [
  {
    name: 'Test function',
    description: 'test description',
    baseCode: 'const test = (i) => return i;',
    solution: 'const test = (i) => return i * 2;',
    tests: [{ call: 'test(1)', result: 2 }],
  },
];

describe('Controller: exercises', () => {
  describe('Route: GET /exercises', () => {
    it('Should return all exercises', async () => {
      jest
        .spyOn(exercisesSet, 'exercisesSet')
        .mockImplementation(async () => fakeExercises);
      const result = await request(app).get('/exercises');
      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual(fakeExercises);
    });
  });

  describe('Route: GET /exercises/:step', () => {
    it('Should return one exercises', async () => {
      jest
        .spyOn(exercisesSet, 'exercisesSet')
        .mockImplementation(async () => fakeExercises);
      const result = await request(app).get('/exercises/0');
      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual(fakeExercises[0]);
    });
  });

  describe('Route: POST /exercises/compile', () => {
    beforeAll(() => {
      jest
        .spyOn(testExercise, 'createFileFromCode')
        .mockImplementation(jest.fn());
      jest
        .spyOn(testExercise, 'compileCode')
        .mockResolvedValueOnce()
        .mockRejectedValueOnce({ tscError: 'some error' });
    });

    it('Should return true if compilation went well', async () => {
      const code = 'some code';
      const result = await request(app)
        .post('/exercises/compile')
        .send({ code });

      expect(result.statusCode).toEqual(200);
      expect(result.body).toBe(true);
      expect(testExercise.createFileFromCode).toBeCalledWith(code);
    });

    it('Should return an error if compilation failed', async () => {
      const code = 'some code';
      const result = await request(app)
        .post('/exercises/compile')
        .send({ code });

      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual({ tscError: 'some error' });
      expect(testExercise.createFileFromCode).toBeCalledWith(code);
    });
  });

  describe('Route: POST /exercises/test', () => {
    beforeAll(() => {
      jest
        .spyOn(testExercise, 'testCode')
        .mockResolvedValueOnce({ isValid: true })
        .mockResolvedValueOnce({ isValid: false, error: 'some error' });
    });

    it('Should return isValid to true', async () => {
      const test: exercisesSet.ExerciseTest = { call: 'test()', result: 1 };
      const result = await request(app).post('/exercises/test').send({ test });
      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual({ isValid: true });
    });

    it('Should return isValid to true', async () => {
      const test: exercisesSet.ExerciseTest = { call: 'test()', result: 1 };
      const result = await request(app).post('/exercises/test').send({ test });
      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual({ isValid: false, error: 'some error' });
    });
  });
});
