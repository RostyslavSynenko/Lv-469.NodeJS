const hamburger = document.querySelector('.hamburger-icon');
const appealForm = document.querySelector('.appeal-form');
const commentsSection = document.querySelector(
  '.comments-section',
);
let footballFanCount =
  localStorage.getItem('footballFanCount') || 4;

const openMenu = () => {
  const menu = document.querySelector('.nav-links');
  menu.classList.toggle('toggle-hamburger');
};

const sendAppeal = (event) => {
  event.preventDefault();

  const appealMessage = appealForm.querySelector(
    'textarea',
  );

  if (!appealMessage.value) {
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
  localStorage.setItem(
    'fanComments',
    commentsSection.innerHTML,
  );
  localStorage.setItem(
    'footballFanCount',
    footballFanCount,
  );
  appealMessage.value = '';
};

appealForm.addEventListener('submit', sendAppeal);
hamburger.addEventListener('click', openMenu);
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('fanComments')) {
    commentsSection.innerHTML = localStorage.getItem(
      'fanComments',
    );
  }
});
