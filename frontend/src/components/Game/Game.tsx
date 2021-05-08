import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Ide } from "../Ide/Ide";
import { Logs } from "../Logs/Logs";
import { Clock } from "../Clock/Clock";
import { Exercise } from "../../interfaces/exercise";
import { Log, LogStatus } from "../../interfaces/logs";
import "./Game.scss";

export default function Game() {
  const { t } = useTranslation("common");
  const [code, setCode] = useState("");
  const [exercise, setExercise] = useState<Exercise>();
  const [gameStep, setGameStep] = useState(0);
  const [stepIsValid, setStepIsValid] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);

  const handleIdeChange = (e: any) => setCode(e.target.value);

  useEffect(() => {
    axios
      .get<Exercise>(`http://localhost:4000/exercises/${gameStep}`)
      .then((res) => {
        if (res.status === 200) {
          setExercise(res.data);
          setCode(res.data.baseCode);
          setLogs(
            res.data.description ? [{ message: res.data.description }] : []
          );
        }
      });
  }, [gameStep]);

  const callAllTests = async () => {
    const newLogs = logs.slice();
    let validStep = 0;
    for (const test of exercise!.tests) {
      const { data } = await axios.post<{ isValid: boolean; error?: string }>(
        "http://localhost:4000/exercises/test",
        { test }
      );
      newLogs.push({ message: `Testing ${test.call}...` });

      console.log("logs", logs);
      if (data.isValid) {
        newLogs.push({
          message: `RIGHT: ${test.result} is the right answer !`,
          status: LogStatus.SUCCESS,
        });
        validStep += 1;
      } else {
        newLogs.push({
          message: `WRONG: ${data.error}`,
          status: LogStatus.ERROR,
        });
        break;
      }
    }
    if (validStep === exercise!.tests.length) {
      newLogs.push({ message: `Success !!`, status: LogStatus.SUCCESS });
      setStepIsValid(true);
    }
    setLogs(newLogs);
  };

  const handleClick = async () => {
    if (stepIsValid) {
      setGameStep(gameStep + 1);
      return;
    }
    const { data } = await axios.post(
      "http://localhost:4000/exercises/compile",
      { code }
    );
    if (!data.tscError) {
      await callAllTests();
    } else {
      setLogs(logs.concat({ message: data.tscError, status: LogStatus.ERROR }));
    }
  };

  return (
    <div className="game-container">
      <Clock />
      <Ide code={code} onChange={handleIdeChange} />
      <Button variant="contained" color="primary" onClick={() => handleClick()}>
        {t(stepIsValid ? "game.next" : "game.test")}
      </Button>
      <Logs logs={logs} />
    </div>
  );
}
