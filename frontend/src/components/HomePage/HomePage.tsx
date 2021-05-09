import React from 'react';
import { Button, Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LeaderboardTable } from '../LeaderboardTable/LeaderboardTable';
import './HomePage.scss';

export default function HomePage({ onStart }: any) {
  const { t } = useTranslation('common');

  return (
    <Container maxWidth="md" className="homepage-container">
      <p className="title">{t('game.title')}</p>
      <LeaderboardTable />
      <div className="btn-container">
        <Button variant="contained" color="primary" onClick={onStart}>
          {t('homepage.startGame')}
        </Button>
      </div>
    </Container>
  );
}
