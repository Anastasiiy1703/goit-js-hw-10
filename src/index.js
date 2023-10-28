import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import "slim-select/dist/slimselect.css";
import Notiflix from 'notiflix';

const selectors = {
    breeds: document.querySelector(".breed-select"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error"),
    description: document.querySelector(".cat-info")
};

selectors.breeds.classList.add('hidden');
selectors.error.classList.add('visible');
selectors.breeds.style.display = 'block';

fetchBreeds()
    .then(data => {
        selectors.breeds.classList.remove('hidden');
        selectors.error.classList.remove('visible');

        const options = data.map(breed => ({
            value: breed.id,
            text: breed.name
        }));

        new SlimSelect({
            select: selectors.breeds,
            data: options,
            placeholder: 'Select a cat breed'
        });

        selectors.breeds.addEventListener('change', selectedCat);
    })
    .catch(err => {
        selectors.error.classList.add('visible');
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', { timeout: 5000, userIcon: false });
    })
    .finally(() => selectors.loader.classList.add('hidden'));

function selectedCat(evt) {
    selectors.loader.classList.add('visible');
    selectors.description.classList.add('hidden');
    fetchCatByBreed(evt.value)
        .then(data => {
            selectors.loader.classList.remove('visible');
            selectors.description.classList.remove('hidden');
            selectors.description.innerHTML = data.map(({ url, id, breeds }) => `
                <li class="item">
                    <img src="${url}" alt="${id}" class="image"/>
                    <div class="text-container">
                        <h2 class="name">${breeds[0].name}</h2>
                        <p class="description">${breeds[0].description}</p>
                        <p><span class="temperament">Temperament:</span>${breeds[0].temperament}</p>
                    </div>
                </li>
            `).join('');
        })
        .catch(err => {
            selectors.error.classList.add('visible');
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', { timeout: 5000, userIcon: false });
        });
}
 



















