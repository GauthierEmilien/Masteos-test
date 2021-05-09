import { Paper } from "@material-ui/core";
import { useEffect, useRef } from "react";
import { LogsProps, LogStatus } from "../../interfaces/logs";
import "./Logs.scss";

export function Logs({ logs }: LogsProps) {
  const paperRef = useRef();
  useEffect(
    () => (paperRef.current! as any).scrollIntoView({ behavior: "smooth" }),
    [logs]
  );

  return (
    <Paper ref={paperRef} className="logs" variant="outlined">
      {logs.map((log, index) => (
        <p
          key={`log-${index}`}
          className={`log-${log.status || LogStatus.INFO}`}
        >
          {log.message}
        </p>
      ))}
    </Paper>
  );
}
