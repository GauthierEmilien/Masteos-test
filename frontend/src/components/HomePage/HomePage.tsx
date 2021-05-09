import React from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LeaderboardTable } from "../LeaderboardTable/LeaderboardTable";

export default function HomePage({ onStart }: any) {
  const { t } = useTranslation("common");

  return (
    <div className="homepage-container">
      <LeaderboardTable />
      <Button variant="contained" color="primary" onClick={onStart}>
        {t("homepage.startGame")}
      </Button>
    </div>
  );
}
