import express from 'express';
import LeaderboardService from '../services/leaderboard.service';

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const service = new LeaderboardService();
    const leaderboards = await service.getLeaderboards();
    res.send(leaderboards);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const service = new LeaderboardService();
    await service.createLeaderboard(req.body);
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
