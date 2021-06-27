window.addEventListener('DOMContentLoaded', () => {
  'use strict';

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

      timer.hours < 10 ? timerHours.textContent = `0${timer.hours}` : timerHours.textContent = timer.hours;
      timer.minutes < 10 ? timerMinutes.textContent = `0${timer.minutes}` : timerMinutes.textContent = timer.minutes;
      timer.seconds < 10 ? timerSeconds.textContent = `0${timer.seconds}` : timerSeconds.textContent = timer.seconds;
      // console.log(timer.timeRemaining);
    }

    const idSetInterval = setInterval(updateClock, 1000);
  }

  countTimer('18:40 27 June 2021');
});