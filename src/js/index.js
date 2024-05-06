import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { searchImages, totalHits } from "./pixabay-api";

const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

loadMoreBtn.style.display = "none";
let page = 1;

async function displayImages(query) {
    try {
        if (page === 1) {
        gallery.innerHTML = "";
        }
    
        const images = await searchImages(query, page);
        images.forEach(image => {
            const photoCard = document.createElement("a");
            photoCard.href = image.largeImageURL;
            photoCard.classList.add('photo-card');
            photoCard.innerHTML = `
                <img src="${image.previewURL}" alt="${image.tags}" loading="lazy"/>
                <div class="info">
                    <p class="info-item"><b>Likes:</b> ${image.likes}</p>
                    <p class="info-item"><b>Views:</b> ${image.views}</p>
                    <p class="info-item"><b>Comments:</b> ${image.comments}</p>
                    <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
                </div>
            `;
            gallery.appendChild(photoCard);
        });
        if (images.length < 40) {
            const endMessage = document.createElement("p");
            endMessage.textContent = "We're sorry, but you've reached the end of search results.";
            gallery.appendChild(endMessage);
        } else {
            page++;
            loadMoreBtn.style.display = "flex";
        }
        return images;
    } catch(error) {
        console.error("Błąd podczas pobierania danych z serwisu Pixabay:", error);
        return [];
    }
}

searchForm.addEventListener("submit", async ev => {
    ev.preventDefault();
    const searchedData = ev.currentTarget.elements.searchQuery.value;
    gallery.innerHTML = "";
    await displayImages(searchedData);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
    const lightbox = new SimpleLightbox(".gallery a", {
        captions: true,
    });
});

loadMoreBtn.addEventListener("click", async () => {
    const searchedData = searchForm.elements.searchQuery.value;
    await displayImages(searchedData);
})


