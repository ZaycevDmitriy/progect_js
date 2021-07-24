const togglePopUp = () => {
  const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupContent = document.querySelector('.popup-content');
  let popupInterval;
  let counter = -50;

  const animationPopUp = () => {
    popupInterval = requestAnimationFrame(animationPopUp);

    counter += 1;
    if (counter < 50) {
      popupContent.style.left = `${counter}%`;
    } else {
      cancelAnimationFrame(popupInterval);
      counter = -50;
    }
  };

  popupBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      let width = document.documentElement.clientWidth;
      if (width < 768) {
        popup.style.display = 'block';
      } else {
        popupContent.style.left = '-50%';
        popup.style.display = 'block';
        popupInterval = requestAnimationFrame(animationPopUp);
      }
    });
  });

  popup.addEventListener('click', (event) => {
    let target = event.target;

    if (target.classList.contains('popup-close')) {
      popup.style.display = 'none';
    } else {
      target = target.closest('.popup-content');

      if (!target) {
        popup.style.display = 'none';
      }
    }
  });
};

export default togglePopUp;
