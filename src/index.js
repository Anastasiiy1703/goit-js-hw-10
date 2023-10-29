import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
const selectors = {
  breeds: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  description: document.querySelector('.cat-info'),
};
selectors.breeds.classList.add('hidden');
selectors.error.classList.add('hidden');
selectors.breeds.style.display = 'block';
fetchBreeds()
  .then(data => {
    selectors.breeds.classList.remove('hidden');
    selectors.error.classList.remove('visible');
    let options = data.map(
      breed => ` <option value="${breed.id}">${breed.name}</option>`
    );
    options.unshift(`<option data-placeholder="true"></option>`);
    selectors.breeds.innerHTML = options.join('');
    new SlimSelect({
      select: selectors.breeds,
      settings: {
        placeholderText: 'Choose a breed',
      },
    });
    selectors.breeds.addEventListener('change', selectedCat);
  })
  .catch(err => {
    selectors.error.classList.add('visible');
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!',
      { timeout: 5000, userIcon: false }
    );
  
  })
  .finally(() => selectors.loader.classList.add('hidden'));
function selectedCat(evt) {
  selectors.loader.classList.add('visible');
  selectors.description.classList.add('hidden');
  const breedId = evt.target.value;
  fetchCatByBreed(breedId)
    .then(data => {
      selectors.loader.classList.remove('visible');
      selectors.description.classList.remove('hidden');
      selectors.description.innerHTML = data
        .map(
          ({ url, id, breeds }) => `
                <li class="item">
                    <img src="${url}" alt="${id}" class="image"/>
                    <div class="text-container">
                        <h2 class="name">${breeds[0].name}</h2>
                        <p class="description">${breeds[0].description}</p>
                        <p><span class="temperament">Temperament:</span>${breeds[0].temperament}</p>
                    </div>
                </li>
            `
        )
        .join('');
    })
    .catch(err => {
      selectors.error.classList.add('visible');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!',
        { timeout: 5000, userIcon: false }
      );
    });
}