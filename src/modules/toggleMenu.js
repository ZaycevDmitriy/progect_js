const toggleMenu = () => {
  const btnMenu = document.querySelector('.menu'),
    menu = document.querySelector('menu');

  const closeMenu = (event) => {
    const target = event.target;
    const targetCloseLi = target.closest('menu>ul>li');

    if (targetCloseLi || target.classList.contains('close-btn')) handlerMenu();
    if (!target.closest('menu') && !target.closest('.menu')) handlerMenu();
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

export default toggleMenu;
