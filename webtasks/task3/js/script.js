const hamburger = document.querySelector('.hamburger-icon');

const openMenu = () => {
  const menu = document.querySelector('.nav-links');
  if (menu.style.display === 'block') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'block';
  }
};

hamburger.addEventListener('click', openMenu);
