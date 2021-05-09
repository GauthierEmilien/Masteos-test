import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toTime from '../../utils/time.utils';
import './WinDialog.scss';
import gatsby from '../../assets/gatsby.gif';

export default function WinDialog({ open, time, onClose }: any) {
  const { t } = useTranslation('common');
  const [nickname, setNickname] = useState('');

  const handleOnClose = () => {
    onClose(nickname);
    setNickname('');
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle className="win-title" disableTypography>
        {t('dialog.title').toUpperCase()}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} className="win-text">
            <p>
              {t('dialog.content', {
                time: `${toTime(Math.floor(time / 60))}:${toTime(time % 60)}`,
              })}
            </p>
            <p>{t('dialog.register')}</p>
            <img src={gatsby} alt="Gatsby" className="gatsby" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t('dialog.username')}
              fullWidth
              variant="outlined"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose} color="primary" disabled={!nickname}>
          {t('dialog.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
