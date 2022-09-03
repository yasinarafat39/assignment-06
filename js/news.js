

document.getElementById('category-01').addEventListener('click', function() {
    const url = `https://openapi.programming-hero.com/api/news/category/01`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    
});

const displayNews = allNews => {
    console.log(allNews);
    const newsContainer = document.getElementById('news-container');
    allNews.forEach(singleNews => {

        const {thumbnail_url, title, total_view, details} = singleNews;
        const {name, published_date, img} = singleNews.author;

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-3', 'w-full');
        newsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${thumbnail_url}" class="img-fluid w-full h-full rounded-start" alt="...">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.length > 100 ? details.slice(0, 400) + "..." : details}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img src="${img}" class="rounded-circle border" alt="author_name" width="40" height="40">
                            &nbsp; &nbsp;
                            <div>
                                <p class="my-0">${name}</p>
                                <small>${published_date}</small>
                            </div>
                        </div>
                        <p class="mt-0 mb-0"> <i class="fa-duotone fa-eye"></i> ${total_view}</p>
                        <i style='font-size:24px' class='far'>&#xf35a;</i>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
}