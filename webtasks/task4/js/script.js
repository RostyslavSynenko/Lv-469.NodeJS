const hamburger = document.querySelector('.hamburger-icon');

const openMenu = () => {
  const menu = document.querySelector('.nav-links');
  menu.classList.toggle('toggle-hamburger');
};

hamburger.addEventListener('click', openMenu);
