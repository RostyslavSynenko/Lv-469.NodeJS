const commentsSection = document.querySelector(
  '.comments-section',
);
const appealForm = document.querySelector('.appeal-form');
const appealMessage = appealForm.querySelector('textarea');

const isOnline = () => window.navigator.onLine;

let footballFanCount =
  localStorage.getItem('footballFanCount') || 3;

const addError = (anchor) => {
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.innerHTML =
    'Appeal must contain at least 20 symbols';

  anchor.classList.add('error');
  anchor.before(errorMessage);
};

const removeError = () => {
  appealMessage.classList.remove('error');
  document
    .querySelectorAll('.error-message')
    .forEach((el) => el.remove());
};

const showModalSuccess = () => {
  const successMessage = document.createElement('div');
  successMessage.classList.add('success-message');
  successMessage.innerHTML =
    'Success! Appeal has been added!';

  document.body.append(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 3000);
};

const sendAppeal = (event) => {
  event.preventDefault();

  removeError();

  const minAppealLength = 19;
  if (appealMessage.value.length < minAppealLength) {
    addError(appealMessage);
    return;
  }

  const date = new Date().toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  const comment = `
    <div class="comment">
      <p>${appealMessage.value}</p>
      <div class="data-name">
        <span class="comment-data">${date}</span>
        <span class="fan-name">FootballFan${footballFanCount++}</span>
      </div>
    </div>
  `;

  commentsSection.insertAdjacentHTML('beforeend', comment);
  /*
  if (isOnline) {
    // send to server
  } else {
    if (localStorage.getItem('fanComments')) {
      localStorage.setItem(
        'fanComments',
        localStorage.getItem('fanComments') + comment,
      );
    } else {
      localStorage.setItem('fanComments', comment);
    }

    localStorage.setItem(
      'footballFanCount',
      footballFanCount,
    );
  }
  */
  appealForm.reset();
  showModalSuccess();
};

appealForm.addEventListener('submit', sendAppeal);
document.addEventListener('DOMContentLoaded', () => {
  if (!isOnline && localStorage.getItem('fanComments')) {
    commentsSection.insertAdjacentHTML(
      'beforeend',
      localStorage.getItem('fanComments'),
    );
  }
});
