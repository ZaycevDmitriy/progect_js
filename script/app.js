window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Таймер

  const countTimer = (deadline) => {
    const timerHours = document.getElementById('timer-hours'),
      timerMinutes = document.getElementById('timer-minutes'),
      timerSeconds = document.getElementById('timer-seconds'),
      dateStop = new Date(deadline).getTime();

    const getTimeRemaining = () => {
      let dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000;

      if (timeRemaining < 0) {
        timeRemaining = 0;
      }
      const seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60)) % 60,
        hours = Math.floor(timeRemaining / 60 / 60);

      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    }

    const updateClock = () => {
      let timer = getTimeRemaining();
      if (timer.timeRemaining <= 0) {
        clearInterval(idSetInterval);
      }

      timerHours.textContent = timer.hours < 10 ? `0${timer.hours}` : timer.hours;
      timerMinutes.textContent = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
      timerSeconds.textContent = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
    }

    const idSetInterval = setInterval(updateClock, 1000);
  }

  countTimer('18:40 27 June 2021');

  // Меню

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      // if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
      //   menu.style.transform = `translate(0)`;
      // } else {
      //   menu.style.transform = `translate(-100%)`;
      // }

      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);

    closeBtn.addEventListener('click', handlerMenu);

    menuItems.forEach((item) => item.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  // popup

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
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

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };

  togglePopUp();
});