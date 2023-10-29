import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_LutLuV7Yuj7xY77g1yMrIDptaiVuF1SFbxoB3BQSlNITe7bsWxihL1pB2wG1WDab";
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



