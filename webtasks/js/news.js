const newsContainer = document.querySelector(
  '.news-container',
);

const renderNews = () => {
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

    localStorage.removeItem('news');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderNews();
});
