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
  const response = await fetch(
    `http://localhost:5000/api/${title}`
  );
  const result = await response.json();
  return new Promise(resolve => resolve(result));
};

const sendData = async (title, data) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/${title}`,
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      }
    );

    let result = await response.json();

    return new Promise(resolve => resolve(result));
  } catch (error) {
    console.log(error);
  }
};

hamburger.addEventListener('click', openMenu);
matches.addEventListener('click', showDropDownContent);
