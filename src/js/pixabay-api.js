import axios from "axios";
import Notiflix from "notiflix";

const apiKey = "43699308-360c89c4f1edc33425ecfb3a2";
let totalHits = 0;

export async function searchImages(query, page) {
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&page=${page}&per_page=40`);
        const data = response.data;
        totalHits = data.totalHits;
        return data.hits;
    } catch(error) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        console.error("Błąd podczas pobierania danych z serwisu Pixabay:", error);
        return [];
    }
}

export { totalHits };