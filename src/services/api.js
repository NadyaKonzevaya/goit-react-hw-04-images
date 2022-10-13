import axios from 'axios';

const API_KEY = '27639427-70597f5ebc7133bee1f081188';
const BASE_URL = 'https://pixabay.com/api';

const fetchImagesWithQuery = async (searchQuery, page) => {
  return await axios
    .get(
      `${BASE_URL}/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response => {
      if (response.status === 200) {
        return response.data.hits;
      }
      return Promise.reject(new Error('No images found'));
    });
};

const api = {
  fetchImagesWithQuery,
};

export default api;
