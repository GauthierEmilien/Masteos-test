import { Button, CircularProgress, Grid } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Rainbowfy from 'react-rainbowfy';
import Ide from '../Ide/Ide';
import Logs from '../Logs/Logs';
import Clock from '../Clock/Clock';
import {
  Exercise,
  GameProps,
  GameStatus,
  Log,
  LogStatus,
} from '../../interfaces';
import './Game.scss';
import httpUrls from '../../constants';
import WinDialog from '../WinDialog/WinDialog';

export default function Game(props: GameProps) {
  const { exercises, setGameStatus } = props;

  const { t } = useTranslation('common');
  const [code, setCode] = useState('');
  const [exercise, setExercise] = useState<Exercise>();
  const [gameStep, setGameStep] = useState(0);
  const [stepIsValid, setStepIsValid] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startTime] = useState(moment());
  const [time, setTime] = useState(0);
  const isCounting = !stepIsValid || gameStep !== exercises.length - 1;

  const handleIdeChange = (e: any) => setCode(e.target.value);

  // Update exercise/baseCode/logs according to gameStep
  useEffect(() => {
    const ex = exercises[gameStep];
    setExercise(ex);
    setCode(ex.baseCode);
    setLogs(ex.description ? [{ message: ex.description }] : []);
  }, [gameStep, exercises]);

  // Timer
  useEffect(() => {
    const tick = () => {
      const now = moment();
      setTime(now.diff(startTime, 'seconds'));
    };
    if (isCounting) {
      const timer = setInterval(tick, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, isCounting]);

  // Http calls to execute all tests from exercise
  const callAllTests = async () => {
    const newLogs = logs.slice();
    let validStep = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const test of exercise!.tests) {
      const { data } = await axios.post<{ isValid: boolean; error?: string }>(
        httpUrls.testExercise,
        { test },
      );
      newLogs.push({ message: t('logs.testing', { call: test.call }) });

      if (data.isValid) {
        newLogs.push({
          message: t('logs.goodAnswer', { result: test.result }),
          status: LogStatus.SUCCESS,
        });
        validStep += 1;
      } else {
        newLogs.push({
          message: t('logs.wrongAnswer', { error: data.error }),
          status: LogStatus.ERROR,
        });
        break;
      }
    }
    if (validStep === exercise!.tests.length) {
      newLogs.push({ message: t('logs.success'), status: LogStatus.SUCCESS });
      setStepIsValid(true);
    }
    setLogs(newLogs);
  };

  // Compile and test first, then go to next exercise, finally open win dialog at the end
  const handleClick = async () => {
    if (stepIsValid && gameStep !== exercises.length - 1) {
      setGameStep(gameStep + 1);
      setStepIsValid(false);
      return;
    }
    if (stepIsValid && gameStep === exercises.length - 1) {
      setDialogIsOpen(true);
      return;
    }
    setLoading(true);
    const { data } = await axios.post(httpUrls.compileExercise, { code });
    if (!data.tscError) {
      await callAllTests();
    } else {
      setLogs(logs.concat({ message: data.tscError, status: LogStatus.ERROR }));
    }
    setLoading(false);
  };

  const onDialogClose = async (nickname: string) => {
    setGameStatus(GameStatus.HOME);
    setGameStep(0);
    setDialogIsOpen(false);
    axios.post(httpUrls.leaderboard, { nickname, time });
  };

  return (
    <>
      <div style={(props as any).style} className="game-container">
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noreferrer"
              className="title"
            >
              <Rainbowfy fontSize="30px" fontWeight="800">
                {t('game.title')}
              </Rainbowfy>
            </a>
          </Grid>
          <Grid item xs={4} className="clock-container">
            <Clock time={time} isCounting={isCounting} />
          </Grid>
          <Grid item xs={12}>
            <Ide code={code} onChange={handleIdeChange} />
          </Grid>
          <Grid className="user-interactions" item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClick()}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                t(stepIsValid ? 'game.next' : 'game.test')
              )}
            </Button>
          </Grid>
          <Grid className="user-interactions" item xs={10}>
            <Logs logs={logs} />
          </Grid>
        </Grid>
      </div>
      <WinDialog open={dialogIsOpen} time={time} onClose={onDialogClose} />
    </>
  );
}
