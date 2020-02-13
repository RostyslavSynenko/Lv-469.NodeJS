const addNewsForm = document.querySelector(
  '.admin-section form',
);
const newsImage = document.getElementById('news-image');
const newsTitle = document.getElementById('news-title');
const newsText = document.getElementById('news-text');
const imgPlaceholder = document.querySelector(
  '.img-placeholder',
);

const addError = (anchor) => {
  anchor.classList.add('error');
};

const validateForm = () => {
  addNewsForm
    .querySelectorAll('.error')
    .forEach((el) => el.classList.remove('error'));

  let isError = false;

  if (!newsImage.value.length) {
    imgPlaceholder.classList.add('error');
    isError = true;
  }

  if (!newsTitle.value) {
    isError = true;
    newsTitle.classList.add('error');
  }

  if (!newsText.value) {
    isError = true;
    newsText.classList.add('error');
  }

  return isError;
};

const showModalSuccess = () => {
  console.log('Success');
};

const addNews = (event) => {
  event.preventDefault();

  if (validateForm()) {
    return;
  }

  addNewsForm.reset();
  showModalSuccess();
};

addNewsForm.addEventListener('submit', addNews);
