import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { httpUrls } from "../../constants";
import { Leaderboard } from "../../interfaces";
import { toTime } from "../../utils/time.utils";
import "./LeaderboardTable.scss";

export function LeaderboardTable() {
  const { t } = useTranslation("common");
  const [leaderboards, setLeaderboards] = useState<Leaderboard[]>([]);

  useEffect(() => {
    axios.get(httpUrls.leaderboard).then((res) => {
      if (res.status === 200) {
        setLeaderboards(res.data);
      }
    });
  }, []);

  return (
    <TableContainer component={Paper} className="leaderboard">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 600 }}>
              {t("leaderboard.rank")}
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              {t("leaderboard.nickname")}
            </TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              {t("leaderboard.time")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!leaderboards.length && (
            <div className="no-score">{t("leaderboard.noScore")}</div>
          )}
          {leaderboards.map((leaderboard, index) => (
            <TableRow>
              <TableCell>{`#${index + 1}`}</TableCell>
              <TableCell>{leaderboard.nickname}</TableCell>
              <TableCell>
                {`${toTime(Math.floor(leaderboard.time / 60))}:
                ${toTime(leaderboard.time % 60)}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
