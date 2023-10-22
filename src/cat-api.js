import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_PhXg6m1e89ZbnG7FDR15hAjab85V5uL6D1VdPGujOW26oEg0APokw6KuJdQZKsWA";
 const BASE_URL = 'https://api.thecatapi.com/v1';
export function fetchBreeds() {
    const END_POINT = '/breeds';
   
    return axios.get(`${BASE_URL}${END_POINT}`)
        .then(resp => {
            return resp.data;
        });
}

export function fetchCatByBreed(breedId) {
    const END_POINT = '/images/search';
    const catId = `breed_ids=${breedId}`;
    return axios.get(`${BASE_URL}${END_POINT}?${catId}`)
        .then(resp => {
            return resp.data;
        });
}



