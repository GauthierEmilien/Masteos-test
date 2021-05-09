import express from 'express';
import mongo from '../services/mongodb.service';

const router = express.Router();

router.get('/', async (_req, res) => {
  // optional: add further things to check (e.g. connecting to dababase)

  const healthcheck: any = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    await mongo.client.db('masteos').command({ ping: 1 });
    healthcheck.mongoConnection = 'OK';
    res.send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
});

export default router;
