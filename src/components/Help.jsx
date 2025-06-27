import React, { useEffect, useState } from 'react';
import Spinner from '../containers/Spinner';

const Help = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    jqueryScript.async = true;
    document.body.appendChild(jqueryScript);

    jqueryScript.onload = () => {
      const zammadScript = document.createElement('script');
      zammadScript.id = 'zammad_form_script';
      zammadScript.src = 'https://help.urfu.online/assets/form/form.js';
      zammadScript.async = true;
      document.body.appendChild(zammadScript);

      zammadScript.onload = () => {
        if (window.$?.fn?.ZammadForm) {
          window.$('#zammad-feedback-form').ZammadForm({
            messageTitle: 'Форма обратной связи',
            messageSubmit: 'Отправить',
            messageThankYou: '…',
            noCSS: true,
            attachmentSupport: true,
          });

          // Привязываем UI Kit-классы
          const $form = window.$('#zammad-feedback-form').find('form.zammad-form');
          $form.find('.form-group').addClass('u-margin');
          $form
            .find('input[type="text"], input[type="email"]')
            .addClass('u-input u-input-required');
          $form.find('textarea').addClass('u-expand-input u-expand-input-required');
          $form.find('input[type="file"]').each(function () {
            const $file = window.$(this);
            $file.wrap('<div u-form-custom="true"></div>');
          });
          $form.find('button[type="submit"]').addClass('u-button u-button-primary umt24');
        }
        setLoading(false);
      };

      zammadScript.onerror = () => {
        console.error('Не удалось загрузить скрипт формы Zammad.');
        setError(true);
        setLoading(false);
      };
    };

    jqueryScript.onerror = () => {
      console.error(
        'Не удалось загрузить jQuery. Форма Zammad не будет инициализирована.'
      );
      setError(true);
      setLoading(false);
    };

    return () => {
      if (document.body.contains(jqueryScript)) {
        document.body.removeChild(jqueryScript);
      }
      const zScript = document.getElementById('zammad_form_script');
      if (zScript) document.body.removeChild(zScript);
    };
  }, []);

  return (
    <div className="container umt24">
      <div className="u-bc-sec umy24">
        <a className="u-bc-sec-first-link" href="/">
          Назад к каталогу
        </a>
      </div>
      <h3 className="u-heading-line helpform">Обратная связь</h3>
      {loading && (
        <div className="help-spinner">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="u-alert-danger" u-alert="true">
          <p>Ошибка загрузки формы. Попробуйте обновить страницу.</p>
        </div>
      )}
      <div id="zammad-feedback-form"></div>
    </div>
  );
};

export default Help;
