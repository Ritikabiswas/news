const apiKey = "2d62da0f2ee24d92bcb6df65b3eb988e";

async function fetchNews(category) {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`);
        const data = await response.json();

        const newsList = document.getElementById('news-list');
        newsList.innerHTML = '';

        data.articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');
            articleElement.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <img src="${article.urlToImage}" alt="${article.title}">
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsList.appendChild(articleElement);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetchNews('general'); 

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const category = this.getAttribute('href').substring(1);
            fetchNews(category);
            searchtext.value=null;
        });
    });
});
const searchButton=document.getElementById("btn");
const searchtext=document.getElementById("tx");
searchButton.addEventListener("click",()=>{
    const category=searchtext.value;
    if(!category) return;
    fetchNews(category);
});
