import { app } from '../../app';
import request from 'supertest';
import * as exercisesSet from '../../services/exerciseSet.service';

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
      console.log('result', result);
      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual(fakeExercises);
    });
  });
});
