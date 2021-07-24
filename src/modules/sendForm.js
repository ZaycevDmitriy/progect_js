const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
  const forms = document.querySelectorAll('form');
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `font-size: 2rem; color: #19b5fe`;

  const postData = (formData) => {
    return fetch('./server.php', {
      method: 'POST',
      body: formData,
    });
  };

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target;
      if (target.matches('form')) {
        target.append(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(target);
        postData(formData)
          .then((response) => {
            console.log(formData);
            if (!response.ok) {
              throw new Error('Status network not 200');
            }
            statusMessage.textContent = successMessage;
            [...target.elements].forEach((elem) => {
              if (elem.tagName.toLowerCase() === 'input' || elem.tagName.toLowerCase() === 'textarea') {
                elem.value = '';
              }
            });
          })
          .catch((error) => {
            statusMessage.textContent = errorMessage;
            console.error(error)
          });
      }
    });
  });
};

export default sendForm;
