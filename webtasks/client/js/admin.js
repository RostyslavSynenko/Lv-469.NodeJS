const addNewsForm = document.querySelector(
  '.admin-section form'
);
const newsImage = document.getElementById('news-image');
const newsTitle = document.getElementById('news-title');
const newsText = document.getElementById('news-text');
const imgPlaceholder = document.querySelector(
  '.img-placeholder'
);
const data = {
  id: null,
  imgSrc: '',
  title: '',
  content: ''
};

const handleFiles = event => {
  const file = event.target.files[0];
  const fileReader = new FileReader();

  fileReader.onload = event => {
    if (!event.target.result) return;

    imgPlaceholder.src = event.target.result;
    data.imgSrc = event.target.result;
  };

  fileReader.readAsDataURL(file);
};

const removeError = () => {
  addNewsForm
    .querySelectorAll('.error')
    .forEach(el => el.classList.remove('error'));
  addNewsForm
    .querySelectorAll('.error-message')
    .forEach(el => el.remove());
};

const addError = (anchor, message) => {
  anchor.classList.add('error');

  const errorMessage = document.createElement('span');
  errorMessage.classList.add('error-message');
  errorMessage.innerHTML = message;

  if (anchor.type === 'file') {
    const customImgUpload = addNewsForm.querySelector(
      '.custom-img-upload'
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
        1} and maximum ${maxTitleLength + 1} symbols`
    );
  }

  const minNewsLength = 49;

  if (newsText.value < minNewsLength) {
    isError = addError(
      newsText,
      `News must contain at least ${minNewsLength +
        1} symbols`
    );
  }

  return isError;
};

const showModal = (className, message) => {
  const modal = document.createElement('div');
  modal.classList.add(className);
  modal.innerHTML = message;

  document.body.append(modal);
  setTimeout(() => {
    modal.remove();
  }, 3000);
};

const setNewsToStorage = newData => {
  if (useLocalStorage) {
    if (localStorage.getItem('news')) {
      const news = JSON.parse(localStorage.getItem('news'));
      news.push(newData);
      localStorage.setItem('news', JSON.stringify(news));
    } else {
      localStorage.setItem(
        'news',
        JSON.stringify([newData])
      );
    }
  } else {
    database.addToStore('news', newData);
  }
};

const addNews = event => {
  event.preventDefault();

  removeError();

  if (validateForm()) {
    return;
  }

  data.id = Date.now();
  data.title = newsTitle.value;
  data.content = newsText.value;

  if (isOnline()) {
    // server
    sendData('news', data);
  } else {
    if (useLocalStorage) {
      setNewsToStorage(data);
    } else {
      // indexedDB
      database.addToStore('news', data);
    }
  }

  addNewsForm.reset();
  // Set default image
  imgPlaceholder.src = 'img/img-placeholder.png';
  showModal(
    'success-message',
    'Success! News has been added!'
  );
};

document.addEventListener('DOMContentLoaded', () => {
  addNewsForm.addEventListener('submit', addNews);
  newsImage.addEventListener('change', handleFiles);
});
