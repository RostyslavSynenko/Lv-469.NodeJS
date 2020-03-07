const hamburger = document.querySelector('.hamburger-icon');
const matches = document.querySelector('.matches');
const dropDownContent = document.querySelector(
  '.dropdown-content',
);
localStorage.setItem('useLocalStorage', false);

const showDropDownContent = () => {
  dropDownContent.classList.toggle('active');
};

const openMenu = () => {
  const menu = document.querySelector('.nav-links');

  if (dropDownContent.classList.contains('active')) {
    dropDownContent.classList.remove('active');
  }

  menu.classList.toggle('toggle-hamburger');
};

/*
fetch('http://localhost:5000/api/data')
  .then((response) => response.json())
  .then((response) => console.log(response.message))
  .catch((err) => console.log(`Error: ${err.message}`));
*/

hamburger.addEventListener('click', openMenu);
matches.addEventListener('click', showDropDownContent);
