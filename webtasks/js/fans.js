const commentsSection = document.querySelector(
  '.comments-section',
);
const appealForm = document.querySelector('.appeal-form');
const appealMessage = appealForm.querySelector('textarea');
let footballFanCount =
  localStorage.getItem('footballFanCount') || 3;

const addError = (anchor, form) => {
  const errorMessage = document.createElement('span');
  errorMessage.classList.add('error-message');
  errorMessage.innerHTML =
    'Appeal must contain at least 20 symbols';

  form.before(errorMessage);
  anchor.classList.add('error');
};

const removeError = () => {
  appealMessage.classList.remove('error');
  document
    .querySelectorAll('.error-message')
    .forEach((el) => el.remove());
};

const sendAppeal = (event) => {
  event.preventDefault();

  removeError();

  const minLength = 19;
  if (appealMessage.value.length < minLength) {
    addError(appealMessage, appealForm);
    return;
  }

  const date =
    new Date().toLocaleDateString('uk-UA') +
    ', ' +
    new Date().toLocaleTimeString('uk-UA');
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
  localStorage.setItem(
    'fanComments',
    commentsSection.innerHTML,
  );
  localStorage.setItem(
    'footballFanCount',
    footballFanCount,
  );
  */
  appealForm.reset();
};

appealForm.addEventListener('submit', sendAppeal);
appealMessage.addEventListener('focus', removeError);
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('fanComments')) {
    commentsSection.innerHTML = localStorage.getItem(
      'fanComments',
    );
  }
});
