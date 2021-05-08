export enum LogStatus {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
}

export interface Log {
  message: string;
  status?: LogStatus;
}

export interface LogsProps {
  logs: Log[];
}
