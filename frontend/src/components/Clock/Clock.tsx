import moment from "moment";
import { useEffect, useState } from "react";
import "./Clock.scss";

export function Clock() {
  const [startTime, setStartTime] = useState(moment());
  const [time, setTime] = useState(0);

  const toTime = new Intl.NumberFormat("fr-FR", {
    minimumIntegerDigits: 2,
    maximumFractionDigits: 0,
  }).format;

  useEffect(() => {
    const tick = () => {
      const t = moment();
      setTime(t.diff(startTime, "seconds"));
    };
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  return (
    <div className="clock">
      clock: {`${toTime(time / 60)}:${toTime(time % 60)}`} seconds
    </div>
  );
}
