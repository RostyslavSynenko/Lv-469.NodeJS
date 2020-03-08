const newsContainer = document.querySelector(
  '.news-container'
);
const isOnline = () => window.navigator.onLine;
const useLocalStorage =
  localStorage.getItem('useLocalStorage') === 'true';
let wasRendered = false;

const createNews = ({ imgSrc, title, content }) => {
  return `
    <div class="news">
      <img src="${imgSrc}" alt="">
      <h3 class="news-title">${title}</h3>
      <p>${content}</p>
    </div>
  `;
};

const addNewsToThePage = allNews => {
  allNews.forEach(data => {
    const news = createNews(data);

    newsContainer.insertAdjacentHTML('beforeend', news);
  });
};

const renderNews = (online = isOnline()) => {
  if (online) {
    getData('news').then(({ data: { news } }) => {
      addNewsToThePage(news);
    });
  } else if (useLocalStorage) {
    if (localStorage.getItem('news')) {
      const news = JSON.parse(localStorage.getItem('news'));

      addNewsToThePage(news);
    }
  } else {
    // indexedDB
    database.getFromStore('news').then(news => {
      addNewsToThePage(news);
    });
  }
};

const sendDataFromStorageToServer = () => {
  if (useLocalStorage) {
    if (localStorage.getItem('news')) {
      const allNews = JSON.parse(
        localStorage.getItem('news')
      );

      allNews.forEach(news => sendData('news', news));

      if (!wasRendered) {
        renderNews(false);
      }

      localStorage.removeItem('news');
    }
  } else {
    // indexedDB
    database.getFromStore('news').then(allNews => {
      allNews.forEach(news => sendData('news', news));
    });

    if (!wasRendered) {
      renderNews(false);
    }

    database.clearStore('news');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener(
    'online',
    sendDataFromStorageToServer
  );

  setTimeout(() => {
    renderNews();

    wasRendered = true;
  }, 500);
});
