'use strict';

const smoothScroll = () => {
  const scrollBtn = document.querySelector('[href^="#service-block"]');
  const SPEED = 1;

  const scrolled = e => {
    e.preventDefault();

    let start = 0;
    const pageY = window.pageYOffset;

    const coordinateElem = scrollBtn.getBoundingClientRect().top;

    const step = time => {
      if (!start) start = time;
      const progress = time - start;

      const r = (coordinateElem < 0 ?
        Math.max(pageY - progress / SPEED, pageY + coordinateElem) :
        Math.min(pageY + progress / SPEED, pageY + coordinateElem));

      window.scrollTo(0, r);

      if (r < pageY + coordinateElem) requestAnimationFrame(step);

    };

    requestAnimationFrame(step);
  };

  scrollBtn.addEventListener('click', scrolled);
}

export default smoothScroll;
