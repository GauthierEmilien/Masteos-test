import { Button, Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LeaderboardTable from '../LeaderboardTable/LeaderboardTable';
import doge from '../../assets/doge.jpg';
import './HomePage.scss';

export default function HomePage({ onStart }: any) {
  const { t } = useTranslation('common');

  return (
    <Container maxWidth="md" className="homepage-container">
      <div className="title-container">
        <p className="title">{t('game.title')}</p>
        <img src={doge} alt="doge" />
      </div>
      <LeaderboardTable />
      <div className="btn-container">
        <Button variant="contained" color="primary" onClick={onStart}>
          {t('homepage.startGame')}
        </Button>
      </div>
    </Container>
  );
}
