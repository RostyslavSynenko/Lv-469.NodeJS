const newsContainer = document.querySelector(
  '.news-container',
);
const isOnline = () => window.navigator.onLine;
const useLocalStorage = localStorage.getItem(
  'useLocalStorage',
);
let wasRendered = false;

const renderNews = (online = isOnline()) => {
  if (online) {
    // get data from server and render
  } else if (useLocalStorage) {
    if (localStorage.getItem('news')) {
      const allNews = JSON.parse(
        localStorage.getItem('news'),
      );

      allNews.forEach((news) => {
        const data = `
            <div class="news">
                <img src="${news.imgSrc}" alt="">
                <h3 class="news-title">${news.title}</h3>
                <p>${news.news}</p>
            </div>`;

        newsContainer.insertAdjacentHTML('beforeend', data);
      });
    }
  } else {
    // indexedDB
    database.getFromStore('news').then((allNews) => {
      allNews.forEach((news) => {
        const data = `
              <div class="news">
                  <img src="${news.imgSrc}" alt="">
                  <h3 class="news-title">${news.title}</h3>
                  <p>${news.news}</p>
              </div>`;

        newsContainer.insertAdjacentHTML('beforeend', data);
      });
    });
  }
};

const sendDataFromStorageToServer = () => {
  if (useLocalStorage) {
    if (localStorage.getItem('news')) {
      const news = JSON.parse(localStorage.getItem('news'));

      /*
      
      SEND DATA TO THE SERVER
      
      */

      if (!wasRendered) {
        renderNews(false);
      }

      localStorage.removeItem('news');
    }
  } else {
    // indexedDB
    database.getFromStore('news').then((news) => {
      /*
      
      SEND DATA TO THE SERVER
      
      */
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
    sendDataFromStorageToServer,
  );

  setTimeout(() => {
    renderNews();

    wasRendered = true;
  }, 500);
});
