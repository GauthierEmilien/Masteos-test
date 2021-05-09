import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import common_en from './translations/en/common.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: { en: { common: common_en } },
});

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
  document.getElementById('root'),
);
