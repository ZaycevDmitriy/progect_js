document.addEventListener('DOMContentLoaded', () => {
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
    };

    const idSetInterval = setInterval(() => {
      let timer = getTimeRemaining();
      if (timer.timeRemaining <= 0) {
        clearInterval(idSetInterval);
      }

      timerHours.textContent = timer.hours < 10 ? `0${timer.hours}` : timer.hours;
      timerMinutes.textContent = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
      timerSeconds.textContent = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
    }, 1000);
  };

  countTimer('18:40 5 July 2021');

  // Меню

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu');
    
    const closeMenu = (event) => {
      const target = event.target;
      const targetCloseLi = target.closest('menu>ul>li');

      if (targetCloseLi || target.classList.contains('close-btn')) handlerMenu();
      if(!target.closest('menu') && !target.closest('.menu')) handlerMenu();
    }

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
      if (menu.classList.contains('active-menu')) {
        document.body.addEventListener('click', closeMenu);
      } else {
        document.body.removeEventListener('click', closeMenu);
      }
    };

    btnMenu.addEventListener('click', handlerMenu);

  };

  toggleMenu();

  // popup

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

  togglePopUp();

  // Табы

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;

      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  // slider


  const slider = () => {
    const createDot = () => {
      let dot = document.createElement('li');
      dot.classList.add('dot');
      return dot;
    };

    const slide = document.querySelectorAll('.portfolio-item'),
      btn = document.querySelectorAll('.portfolio-btn'),
      slider = document.querySelector('.portfolio-content');
    
    let currentSlide = 0;
    let interval;

    const addDotList = () => {
      const elemList = document.querySelector('.portfolio-dots');      
      for (let i = 0; i < slide.length; i++) {
        const li = createDot();
        if (i === 0) li.classList.add('dot-active');
        elemList.append(li);
      }
    };

    addDotList();

    const dot = document.querySelectorAll('.dot');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) currentSlide = 0;
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    
    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slide.length - 1;

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    startSlide(1500);

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide(1500);
      }
    });
  };

  slider();
  
    // validation

  const validateCalculated = () => {
    const calcElems = document.querySelectorAll('.calc-item'),
      calcSelect = document.querySelector('.calc-type');

    calcElems.forEach((input) => {
      if (input !== calcSelect) {
        input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '');
      });
      }      
    });
  };

  validateCalculated();

  const validateFeedbackForm = () => {
    const inputName2 = document.getElementById('form2-name'),
      inputName1 = document.getElementById('form1-name'),
      inputMessage = document.getElementById('form2-message'),
      inputsEmail = document.querySelectorAll('.form-email'),
      inputsPhone = document.querySelectorAll('.form-phone');

    const validateInputText = (input) => {
      input.value = input.value.replace(/[^а-я\-\s\n]/gim, '');
    };

    const firsLetterToUpperCase = (input) => {
      input.value = input.value.replace(/^[а-я]/gi, (match) => {
        return match.toUpperCase();
      });
    }

    inputName2.addEventListener('input', () => {
      validateInputText(inputName2);
      firsLetterToUpperCase(inputName2);
    });

    inputName1.addEventListener('input', () => {
      validateInputText(inputName1);
      firsLetterToUpperCase(inputName1);
    });

    inputMessage.addEventListener('input', () => {
      validateInputText(inputMessage);
    });

    const validateEmail = () => {
      inputsEmail.forEach((input) => {
        input.addEventListener('input', () => {
          input.value = input.value.replace(/[^\w@\-'~_!*.]/gi, '');
        });

        input.addEventListener('blur', () => {
          input.value = input.value.trim();
          const correctEmail = input.value.match(/(\w+(?:[._\-~!*']?\w+)*)@*(\w+(?:[._\-~!*']*\w+)*)\.(\w{2,})/i);
          if (correctEmail) {
            input.value = `${correctEmail[1]}@${correctEmail[2]}.${correctEmail[3]}`;
          } else {
            input.value = '';
          }
        });
      });
    };

    validateEmail();

    const validatePhone = () => {
      inputsPhone.forEach((input) => {
        input.addEventListener('input', () => {
          input.value = input.value.replace(/[^+\-()\d]/g, '')
        });

        input.addEventListener('blur', () => {
          input.value = input.value.trim();
          const correctPhone = input.value.match(/(\+?)([78])(-?\(?)*(\d{3})(\)?-?)([-])*(\d{3})([-])*(\d{2})([-])*(\d{2})/);
          if (correctPhone) {
            input.value = `${correctPhone[1]}${correctPhone[2]}(${correctPhone[4]})-${correctPhone[7]}-${correctPhone[9]}-${correctPhone[11]}`;
          } else {
            input.value = '';
          }
        });
      });
    };

    validatePhone();

  };

  validateFeedbackForm();

});