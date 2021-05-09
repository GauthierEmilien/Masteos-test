import { Button, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Ide } from "../Ide/Ide";
import { Logs } from "../Logs/Logs";
import { Clock } from "../Clock/Clock";
import { Exercise, GameProps, Log, LogStatus } from "../../interfaces";
import "./Game.scss";
import { httpUrls } from "../../constants";

export default function Game(props: GameProps) {
  const { t } = useTranslation("common");
  const [code, setCode] = useState("");
  const [exercise, setExercise] = useState<Exercise>();
  const [gameStep, setGameStep] = useState(0);
  const [stepIsValid, setStepIsValid] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);

  const handleIdeChange = (e: any) => setCode(e.target.value);

  useEffect(() => {
    const ex = props.exercises[gameStep];
    setExercise(ex);
    setCode(ex.baseCode);
    setLogs(ex.description ? [{ message: ex.description }] : []);
  }, [gameStep, props.exercises]);

  const callAllTests = async () => {
    const newLogs = logs.slice();
    let validStep = 0;
    for (const test of exercise!.tests) {
      const { data } = await axios.post<{ isValid: boolean; error?: string }>(
        httpUrls.testExercise,
        { test }
      );
      newLogs.push({ message: t("logs.testing", { call: test.call }) });

      if (data.isValid) {
        newLogs.push({
          message: t("logs.goodAnswer", { result: test.result }),
          status: LogStatus.SUCCESS,
        });
        validStep += 1;
      } else {
        newLogs.push({
          message: t("logs.wrongAnswer", { error: data.error }),
          status: LogStatus.ERROR,
        });
        break;
      }
    }
    if (validStep === exercise!.tests.length) {
      newLogs.push({ message: t("logs.success"), status: LogStatus.SUCCESS });
      setStepIsValid(true);
    }
    setLogs(newLogs);
  };

  const handleClick = async () => {
    if (stepIsValid && gameStep < props.exercises.length) {
      setGameStep(gameStep + 1);
      setStepIsValid(false);
      return;
    }
    const { data } = await axios.post(httpUrls.compileExercise, { code });
    if (!data.tscError) {
      await callAllTests();
    } else {
      setLogs(logs.concat({ message: data.tscError, status: LogStatus.ERROR }));
    }
  };

  return (
    <div {...props} className="game-container">
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <div className="title">{t("game.title")}</div>
        </Grid>
        <Grid item xs={4} className="clock-container">
          <Clock />
        </Grid>
        <Grid item xs={12}>
          <Ide code={code} onChange={handleIdeChange} />
        </Grid>
        <Grid className="user-interactions" item xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClick()}
          >
            {t(stepIsValid ? "game.next" : "game.test")}
          </Button>
        </Grid>
        <Grid className="user-interactions" item xs={10}>
          <Logs logs={logs} />
        </Grid>
      </Grid>
    </div>
  );
}
