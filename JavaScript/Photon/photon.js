const auth = "563492ad6f9170000100000127d5b07ca5cc42a9ba033887f48c8fc0";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
const moreBtn = document.querySelector(".more");
let page = 1;
let fetchLink;
let searchValue;
let currentSearch;

searchInput.addEventListener("input", updateInput);
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});
moreBtn.addEventListener("click", loadMore);

function updateInput(event) {
    searchValue = event.target.value;
}

async function fetchAPI(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    });

    const data = await dataFetch.json();

    return data;
}

function generatePics(data) {
    data.photos.forEach((photo) => {
        const imgs = document.createElement("div");
        imgs.classList.add("gallery-img");
        imgs.innerHTML = `
            <div class="gallery-info">
                <p>${photo.photographer}</p>
                <a href = ${photo.src.original}>Download</a>
            </div>
            <img src=${photo.src.large}></img>`;
        gallery.appendChild(imgs);
    });
}

async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15";
    const data = await fetchAPI(fetchLink);
    generatePics(data);
}

async function searchPhotos(query) {
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15`;
    const data = await fetchAPI(fetchLink);
    clear();
    generatePics(data);
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchAPI(fetchLink);
    generatePics(data);
}

curatedPhotos();
