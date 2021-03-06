const commentsSection = document.querySelector(
  '.comments-section'
);
const appealForm = document.querySelector('.appeal-form');
const appealMessage = appealForm.querySelector('textarea');

let footballFanCount =
  localStorage.getItem('footballFanCount') || 3;

const addError = anchor => {
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
    .forEach(el => el.remove());
};

const setCommentToStorage = comment => {
  if (localStorage.getItem('fanComments')) {
    const comments = JSON.parse(
      localStorage.getItem('fanComments')
    );
    comments.push(comment);
    localStorage.setItem(
      'fanComments',
      JSON.stringify(comments)
    );
  } else {
    localStorage.setItem(
      'fanComments',
      JSON.stringify([comment])
    );
  }
};

const createComment = ({ comment, author, date }) => {
  return `
  <div class="comment new-comment">
    <p>${comment}</p>
    <div class="data-name">
      <span class="comment-data">${date}</span>
      <span class="fan-name">${author}</span>
    </div>
  </div>
`;
};

const addCommentsToThePage = comments => {
  comments.forEach(data => {
    const comment = createComment(data);

    commentsSection.insertAdjacentHTML(
      'beforeend',
      comment
    );
  });
};

// Render comments from MongoDB
const renderComments = () => {
  getData('comments')
    .then(({ data: { comments } }) => {
      addCommentsToThePage(comments);
    })
    .catch(error => {
      console.log('Error: ', error);
    });
};

const sendAppeal = event => {
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
    minute: '2-digit'
  });

  const comment = {
    id: Date.now(),
    comment: appealMessage.value,
    author: `FootballFan${footballFanCount++}`,
    date
  };

  localStorage.setItem(
    'footballFanCount',
    footballFanCount
  );

  if (isOnline()) {
    // send to server
    sendData('comments', comment);
    addCommentsToThePage([comment]);
  } else {
    if (useLocalStorage) {
      setCommentToStorage(comment);
    } else {
      // indexedDB
      database.addToStore('fanComments', comment);
    }
  }

  appealForm.reset();

  if (isOnline()) {
    showModal(
      'success-message',
      'Success! Comment has been added!'
    );
  } else {
    showModal(
      'warning-message',
      'You are offline! Comment will be added later!'
    );
  }
};

const sendDataFromStorageToServer = () => {
  if (useLocalStorage) {
    if (localStorage.getItem('fanComments')) {
      const comments = JSON.parse(
        localStorage.getItem('fanComments')
      );

      comments.forEach(comment => {
        sendData('comments', comment);
        addCommentsToThePage([comment]);
      });

      localStorage.removeItem('fanComments');
    }
  } else {
    // indexedDB
    database.getFromStore('fanComments').then(comments => {
      if (comments.length) {
        comments.forEach(comment => {
          sendData('comments', comment);
          addCommentsToThePage([comment]);
        });
        database.clearStore('fanComments');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  appealForm.addEventListener('submit', sendAppeal);
  window.addEventListener(
    'online',
    sendDataFromStorageToServer
  );

  // indexedDB may not be connected yet
  setTimeout(() => {
    if (isOnline()) {
      renderComments();
      sendDataFromStorageToServer();
    }
  }, 500);
});
