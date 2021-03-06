/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import exercisesController from './controllers/exercises.controller';
import healthcheckController from './controllers/healthcheck.controller';
import leaderboardController from './controllers/leaderboard.controller';
import mongo from './services/mongodb.service';

export const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/exercises', exercisesController);
app.use('/healthcheck', healthcheckController);
app.use('/leaderboard', leaderboardController);

export async function bootstrap() {
  await mongo.connect();
  console.log('Successfully connected to MongoDB');

  app.listen(4000, () => console.log('Server is now running on port 4000'));
}
