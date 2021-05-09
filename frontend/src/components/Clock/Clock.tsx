import { useTranslation } from 'react-i18next';
import { ClockProps } from '../../interfaces/clock';
import toTime from '../../utils/time.utils';
import './Clock.scss';

export default function Clock({ time, isCounting }: ClockProps) {
  const { t } = useTranslation('common');
  return (
    <div className="clock">
      {`${!isCounting ? `${t('clock.finish')} ` : ''}
      ${toTime(Math.floor(time / 60))}:${toTime(time % 60)}`}
    </div>
  );
}
