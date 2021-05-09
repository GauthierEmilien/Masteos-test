import ReactDOM from 'react-dom';
import './index.scss';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import commonEn from './translations/en/common.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: { en: { common: commonEn } },
});

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
  document.getElementById('root'),
);
