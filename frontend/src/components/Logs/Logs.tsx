import { Paper } from "@material-ui/core";
import { LogsProps, LogStatus } from "../../interfaces/logs";
import "./Logs.scss";

export function Logs({ logs }: LogsProps) {
  return (
    <Paper variant="outlined" className="logs">
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
