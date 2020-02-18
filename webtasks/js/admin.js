const addNewsForm = document.querySelector(
  '.admin-section form',
);
const newsImage = document.getElementById('news-image');
const newsTitle = document.getElementById('news-title');
const newsText = document.getElementById('news-text');
const imgPlaceholder = document.querySelector(
  '.img-placeholder',
);

const handleFiles = (files) => {
  for (let i = 0; i < files.length; i++) {
    imgPlaceholder.src = URL.createObjectURL(files[i]);
    imgPlaceholder.onload = () => {
      URL.revokeObjectURL(this.src);
    };
  }
};

const removeError = () => {
  addNewsForm
    .querySelectorAll('.error')
    .forEach((el) => el.classList.remove('error'));
  addNewsForm
    .querySelectorAll('.error-message')
    .forEach((el) => el.remove());
};

const addError = (anchor, message) => {
  anchor.classList.add('error');

  const errorMessage = document.createElement('span');
  errorMessage.classList.add('error-message');
  errorMessage.innerHTML = message;

  if (anchor.type === 'file') {
    const customImgUpload = addNewsForm.querySelector(
      '.custom-img-upload',
    );

    customImgUpload.after(errorMessage);
  } else {
    anchor.before(errorMessage);
  }

  return errorMessage;
};

const validateForm = () => {
  let isError = null;

  if (!newsImage.value) {
    imgPlaceholder.classList.add('error');
    isError = addError(newsImage, 'Image is required!');
  }

  const minTitleLength = 9;
  const maxTitleLength = 49;

  if (
    newsTitle.value.length < minTitleLength ||
    newsTitle.value.length > maxTitleLength
  ) {
    isError = addError(
      newsTitle,
      `Title must contain at least ${minTitleLength +
        1} and maximum ${maxTitleLength + 1} symbols`,
    );
  }

  const minNewsLength = 49;

  if (newsText.value < minNewsLength) {
    isError = addError(
      newsText,
      `News must contain at least ${minNewsLength +
        1} symbols`,
    );
  }

  return isError;
};

const showModalSuccess = () => {
  const successMessage = document.createElement('div');
  successMessage.classList.add('success-message');
  successMessage.innerHTML =
    'Success! News has been added!';

  document.body.append(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 3000);
};

const addNews = (event) => {
  event.preventDefault();

  removeError();

  if (validateForm()) {
    return;
  }

  addNewsForm.reset();
  // Set default image
  imgPlaceholder.src = 'img/img-placeholder.png';
  showModalSuccess();
};

addNewsForm.addEventListener('submit', addNews);
newsImage.addEventListener('change', (event) => {
  handleFiles(event.target.files);
});
