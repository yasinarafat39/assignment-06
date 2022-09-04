

const newsCategoriesContainer = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayNewsCategories(data.data.news_category))
        .catch((err) => console.log("Error:", err.message))
}

const displayNewsCategories = (allCategories) => {
    const newsCategoriesContainer = document.getElementById('news-category-container');
    allCategories.forEach(category => {
        const li = document.createElement('li');
        li.classList.add('categoryList');
        li.innerHTML = `
            <a role="button" onclick="getNews('${category.category_id}')"> ${category.category_name}</a>
            
        `;
        newsCategoriesContainer.appendChild(li);
    });
}



const loadingSpinner = document.getElementById('loadingSpinner');
const getNews = (category_id) => {

    // spinner start
    loadingSpinner.classList.remove('d-none');

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    .catch((err) => console.log("Error:", err.message))
}


const displayNews = allNews => {
    
    allNews.sort((a,b) => {
        return b.total_view - a.total_view;
    });

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
    newsContainer.innerHTML = '';
    allNews.forEach(singleNews => {

        const {image_url, title, total_view, details, _id} = singleNews;
        const {name, published_date, img} = singleNews.author;

        const newsDiv = document.createElement('div');
        
        newsDiv.innerHTML = `
        <div class="container mt-5 col-lg-12">
        <div class="card mb-3 shadow-sm">

            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${image_url}" class=" img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text mt-3">${details.length > 300 ?singleNews.details.slice(0, 300) + "..." : details}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                        <img src="${img === 'undifined' ? 'N/A' : img}" class="rounded-circle border" alt="author_name" width="40" height="40">
                            &nbsp; &nbsp;
                            <div>
                                <p class="fw-semibold mb-0">${name ? name : 'N/A'}</p>
                                <small>${published_date ? published_date : 'N/A'}</small>
                            </div>
                        </div>
                        <p class="mt-0 mb-0"> <i class="fa-regular fa-eye"></i> ${total_view ? total_view : 'N/A'}</p>
                        <!-- Button trigger modal -->
                        <i onclick="showDetailsOfNews('${_id}')" style='font-size:24px' class='far' role="button" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">&#xf35a;</i>
                    </div>
                </div>
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
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDatails(data.data[0]))
        .catch((err) => console.log("Error:", err.message))
}

const displayNewsDatails = singleNews => {
    const {title, total_view, details, image_url} = singleNews;
    const {name, published_date, img} = singleNews.author;
    const {number: rating_number, badge} = singleNews.rating;

    const modalTitle = document.getElementById('newsDetailsModalLabel');
    modalTitle.innerText = `${title}`;

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

newsCategoriesContainer()