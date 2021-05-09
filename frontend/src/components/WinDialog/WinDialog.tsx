import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { toTime } from "../../utils/time.utils";

export function WinDialog({ open, setOpen, time, onClose }: any) {
  const { t } = useTranslation("common");


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("dialog.title")}</DialogTitle>
      <DialogContent>
        {t("dialog.content", {
          time: `${toTime(Math.floor(time / 60))}:${toTime(time % 60)}`,
        })}
      </DialogContent>
    </Dialog>
  );
}
