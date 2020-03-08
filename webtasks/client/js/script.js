const hamburger = document.querySelector('.hamburger-icon');
const matches = document.querySelector('.matches');
const dropDownContent = document.querySelector(
  '.dropdown-content'
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

const getData = async title => {
  try {
    return await axios.get(
      `http://localhost:5000/api/${title}`
    );
  } catch (error) {
    console.log(error);
  }
};

const sendData = async (title, data) => {
  try {
    return await axios.post(
      `http://localhost:5000/api/${title}`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};

hamburger.addEventListener('click', openMenu);
matches.addEventListener('click', showDropDownContent);
