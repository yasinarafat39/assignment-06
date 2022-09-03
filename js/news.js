

const loadingSpinner = document.getElementById('loadingSpinner');
const getNews = (category_id) => {
    // spinner start
    loadingSpinner.classList.remove('d-none');
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
}

const categoryName = document.getElementById('category-name');

    getNews('01');
    

document.getElementById('category-02').addEventListener('click', function(){
    getNews('02');
    categoryName.innerText = 'Regular news';
});
document.getElementById('category-03').addEventListener('click', function(){
    getNews('03');
    categoryName.innerText = 'International news';
});
document.getElementById('category-04').addEventListener('click', function(){
    getNews('04');
    categoryName.innerText = 'Sports';
});
document.getElementById('category-05').addEventListener('click', function(){
    getNews('05');
    categoryName.innerText = 'Entertainment';
});
document.getElementById('category-06').addEventListener('click', function(){
    getNews('06');
    categoryName.innerText = 'Cultur';
});
document.getElementById('category-07').addEventListener('click', function(){
    getNews('07');
    categoryName.innerText = 'All news';
});

const displayNews = allNews => {
    console.log(allNews);

    document.getElementById('total-item').innerText = allNews.length;
    // Error Message
    const errorMessage = document.getElementById('error_message');
    if(allNews.length === 0){
        errorMessage.classList.remove('d-none');
        // stop spinner
        loadingSpinner.classList.add('d-none');
    } else{
        errorMessage.classList.add('d-none');
    }

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    allNews.forEach(singleNews => {

        const {thumbnail_url, title, total_view, details, _id} = singleNews;
        const {name, published_date, img} = singleNews.author;

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'mb-3', 'w-full');
        newsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${thumbnail_url}" class="img-fluid w-full  rounded-start" alt="...">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${details.length > 100 ? details.slice(0, 400) + "..." : details}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img src="${img === 'undifined' ? 'N/A' : img}" class="rounded-circle border" alt="author_name" width="40" height="40">
                            &nbsp; &nbsp;
                            <div>
                                <p class="my-0">${name}</p>
                                <small>${published_date}</small>
                            </div>
                        </div>
                        <p class="mt-0 mb-0"> <i class="fa-duotone fa-eye"></i> ${total_view}</p>
                        <!-- Button trigger modal -->
                        <i onclick="showDetailsOfNews('${_id}')" style='font-size:24px' class='far' role="button" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">&#xf35a;</i>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
        // spinner stop
        loadingSpinner.classList.add('d-none');
    });
}


const showDetailsOfNews = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDatails(data.data[0]))
}

const displayNewsDatails = singleNews => {
    const {title, total_view, details, image_url} = singleNews;
    const {name, published_date, img} = singleNews.author;
    const {number: rating_number, badge} = singleNews.rating;

    const breakingNews = document.getElementById('category-01');
    const modalTitle = document.getElementById('newsDetailsModalLabel');
    modalTitle.innerText = `${breakingNews.innerText}`;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <img class="img-fluid" src="${image_url}" alt="..."> 
        <h3 class="my-3">${title}</h3>
        <p class="mb-4">${details}</p>

        <div> 
            <h4 class="fw-semibold">Writer:</h4>

            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img src="${img === 'undifined' ? 'N/A' : img}" class="rounded-circle border" alt="author_name" width="40" height="40">
                    &nbsp; &nbsp;<p class="mb-0 fw-semibold">${name === 'undifined' ? 'N/A' : name}</p>
                </div>
                <p class="fw-semibold mb-0 mt-0">Rating: <span class="text-warning">${rating_number}</span><p>
                <p class="fw-semibold mb-0">Badge: ${badge}</p>
            </div>
        </div>
    `;
}