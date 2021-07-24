const validateFeedbackForm = () => {
  const forms = document.querySelectorAll('[name="user_form"]');

  const validateInputText = (input) => {
    input.value = input.value.replace(/[^а-яё\-\s\n]/gim, '');
  };

  const firsLetterToUpperCase = (input) => {
    input.value = input.value.replace(/^[а-я]/gi, (match) => {
      return match.toUpperCase();
    });
  };

  forms.forEach((form) => {
    form.addEventListener('input', (event) => {
      const target = event.target;

      if (target.name === 'user_name') {
        validateInputText(target);
        firsLetterToUpperCase(target);
      }

      if (target.name === 'user_email') {
        target.value = target.value.replace(/[^\w@\-'~_!*.]/gi, '');
      }

      if (target.name === 'user_phone') {
        target.value = target.value.replace(/[^+\-()\d]/g, '');
      }

      if (target.name === 'user_message') {
        validateInputText(target);
      }
    });

    form.addEventListener('blur', (event) => {
      const target = event.target;

      if (target.name === 'user_email') {
        target.value = target.value.trim();
        const correctEmail = target.value.match(/(\w+(?:[._\-~!*']?\w+)*)@*(\w+(?:[._\-~!*']*\w+)*)\.(\w{2,})/i);
        if (correctEmail) {
          target.value = `${correctEmail[1]}@${correctEmail[2]}.${correctEmail[3]}`;
        } else {
          target.value = '';
        }
      }

      if (target.name === 'user_phone') {
        target.value = target.value.trim();
        const correctPhone = target.value.match(/(\+?)([78])(-?\(?)*(\d{3})(\)?-?)([-])*(\d{3})([-])*(\d{2})([-])*(\d{2})/);
        if (correctPhone) {
          target.value = `${correctPhone[1]}${correctPhone[2]}${correctPhone[4]}${correctPhone[7]}${correctPhone[9]}${correctPhone[11]}`;
        } else {
          target.value = '';
        }
      }
    }, true);
  });
};

export default validateFeedbackForm;
