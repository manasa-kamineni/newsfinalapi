const apiUrl = 'news.json'; 
const fetchNewsBtn = document.getElementById('fetchNewsBtn');
const newsContainer = document.getElementById('newsContainer');
let articles = [];

async function fetchNews() {
    try {
        const response = await fetch(apiUrl); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched articles:", data.articles);
        articles = data.articles;
        renderRandomArticle();
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Error fetching articles.</p>';
    }
}

function renderRandomArticle() {
    newsContainer.innerHTML = ''; // Clear the container
    if (articles.length > 0) {
        const randomIndex = Math.floor(Math.random() * articles.length);
        const article = articles[randomIndex];
        const articleElement = document.createElement('div');
        articleElement.className = 'news-article';
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <img src="${article.urlToImage}" alt="${article.title}">
        `;
        articleElement.addEventListener('click', () => {
            window.open(article.url, '_blank');
        });
        newsContainer.appendChild(articleElement);
    } else {
        newsContainer.innerHTML = '<p>No articles available.</p>';
    }
}

fetchNewsBtn.addEventListener('click', fetchNews);
