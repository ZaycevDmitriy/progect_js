'use strict';

const smoothScroll = () => {
  const SPEED = 0.5;
  const scrolled = e => {
    e.preventDefault();

    const target = e.target;

    if (target.matches('[href^="#"]')) {
      let start = 0;

      const pageY = window.pageYOffset;

      const hash = target.getAttribute('href');

      if (hash === '#') return

      const elem = document.querySelector(hash);

      const coordinateElem = elem.getBoundingClientRect().top;

      const step = time => {
        if (!start) start = time;
        const progress = time - start;

        const r = (coordinateElem < 0 ?
          Math.max(pageY - progress / SPEED, pageY + coordinateElem) :
          Math.min(pageY + progress / SPEED, pageY + coordinateElem))

        window.scrollTo(0, r);

        if (r < pageY + coordinateElem) requestAnimationFrame(step);

      }

      requestAnimationFrame(step)
    }
  };

  document.body.addEventListener('click', scrolled);
}

export default smoothScroll;

