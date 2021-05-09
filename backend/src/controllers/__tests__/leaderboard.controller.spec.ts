import request from 'supertest';
import { app } from '../../app';
import { Leaderboard } from '../../models/leaderboard';
import LeaderboardService from '../../services/leaderboard.service';

jest.mock('../../services/leaderboard.service');

describe('Controller: leaderboard', () => {
  describe('Route: GET /leaderboard', () => {
    it('Should return all leaderboards from db', async () => {
      const leaderboards: Leaderboard[] = [{ nickname: 'test', time: 500 }];
      jest
        .spyOn(LeaderboardService.prototype, 'getLeaderboards')
        .mockResolvedValue(leaderboards);

      const result = await request(app).get('/leaderboard');
      expect(result.statusCode).toEqual(200);
      expect(result.body).toEqual(leaderboards);
    });
  });

  describe('Route: POST /leaderboard', () => {
    it('Should return add a leaderboard to db', async () => {
      const leaderboard: Leaderboard = { nickname: 'test', time: 500 };
      jest
        .spyOn(LeaderboardService.prototype, 'createLeaderboard')
        .mockImplementation(jest.fn());

      const result = await request(app).post('/leaderboard').send(leaderboard);

      expect(result.statusCode).toEqual(200);
      expect(LeaderboardService.prototype.createLeaderboard).toBeCalledWith(
        leaderboard,
      );
    });
  });
});
