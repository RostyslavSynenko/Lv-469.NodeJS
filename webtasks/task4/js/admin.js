const addNewsForm = document.querySelector(
  '.admin-section form',
);
const newsImage = document.getElementById('news-image');
const newsTitle = document.getElementById('news-title');
const newsText = document.getElementById('news-text');

const clearForm = () => {
  newsImage.value = '';
  newsTitle.value = '';
  newsText.value = '';
};

const validateForm = (inputs) => {
  let isError = false;

  inputs.forEach((input) => {
    if (!input.value) {
      input.classList.add('error');
      isError = true;
    }
  });

  return isError;
};

const showModalSuccess = () => {
  console.log('Success');
};

const addNews = (event) => {
  event.preventDefault();

  if (validateForm([newsImage, newsText, newsTitle])) {
    return;
  }

  clearForm();
  showModalSuccess();
};

addNewsForm.addEventListener('submit', addNews);
