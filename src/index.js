import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_PhXg6m1e89ZbnG7FDR15hAjab85V5uL6D1VdPGujOW26oEg0APokw6KuJdQZKsWA";
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const selectors = {
    breeds: document.querySelector(".breed-select"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error"),
    description: document.querySelector(".cat-info")
}

fetchBreeds()
    .then(data => {
       data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name; 
           selectors.breeds.appendChild(option);
        });
    })
    .catch(err => console.log(`${selectors.error}`));
   
selectors.breeds.addEventListener('change', selectedCat);
function selectedCat(evt) {
    fetchCatByBreed(evt.target.value)
        .then(data => {
        selectors.description.innerHTML = createMarcup(data);
        })
        .catch(err => console.log(`${selectors.error}`));
}

function createMarcup(arr) {
    return arr.map(({name,vetstreet_url,temperament,description}) => `
      <img src="${vetstreet_url}" alt="${name}"/>
      <h2 class="name">${name}</h2>
      <p class="description">${description}</p>
      <p class="temperament">Temperament:${temperament}</p>
   `).join('')
}







