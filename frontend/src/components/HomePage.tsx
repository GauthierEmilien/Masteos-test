import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation("common");

  return (
    <div className="homepage-container">
      {/*TODO add leadreboard here*/}
      <Button>{t("homepage.startGame")}</Button>
    </div>
  );
}
