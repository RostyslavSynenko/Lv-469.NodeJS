const newsContainer = document.querySelector(
  '.news-container'
);

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

const renderNews = () => {
  if (isOnline()) {
    // server
    getData('news').then(({ data: { news } }) => {
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

      allNews.forEach(news => {
        sendData('news', news);
        console.log(news);
        addNewsToThePage([news]);
      });

      localStorage.removeItem('news');
    }
  } else {
    // indexedDB
    database.getFromStore('news').then(allNews => {
      allNews.forEach(news => {
        sendData('news', news);
        addNewsToThePage([news]);
      });
    });

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
    if (isOnline()) {
      sendDataFromStorageToServer();
    }
  }, 500);
});
