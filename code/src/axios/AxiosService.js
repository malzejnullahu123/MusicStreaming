import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5279/',
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers you need
  },
});

// Check if user credentials exist in session storage and set headers accordingly
const storedToken = localStorage.getItem('token');
if (storedToken) {
  apiClient.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
}

export const setToken = (token) => {
  localStorage.setItem('token', token);
  apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const removeToken = () => {
  localStorage.removeItem('token');
  delete apiClient.defaults.headers['Authorization'];
};

const ApiService = {
  getNewSongs(pageSize) {
    return apiClient.get(`/api/Song/new?pageSize=${pageSize}`);
  },

  getSongsByArtist(artistId) {
    return apiClient.get(`/api/Song/byArtist/${artistId}`);
  },

  getArtistById(id) {
    return apiClient.get(`/api/Artist/${id}`);
  },

  searchSongs(query, songPage, pageSize) {
    return apiClient.get(`/api/Search/songs?query=${query}&pageNumber=${songPage}&pageSize=${pageSize}`);
  },

  searchArtists(query, artistPage, pageSize) {
    return apiClient.get(`/api/Search/artists?query=${query}&pageNumber=${artistPage}&pageSize=${pageSize}`);
  },

  getAllArtists(pageNumber, pageSize) {
    return apiClient.get(`/api/Artist/all/${pageNumber}/${pageSize}`);
  },

  getGenreById(id) {
    return apiClient.get(`/api/Genre/${id}`);
  },

  registerUser(data) {
    return apiClient.post('/api/User/register', data);
  },

  registerArtist(data) {
    return apiClient.post('/api/Artist/register', data);
  },

  login(credentials) {
    return apiClient.post('/api/User/login', credentials);
  },

  postPlayHistory(songId) {
    return apiClient.post('/api/PlayHistory', { songId });
  },
  
  getPlayHistory(token) {
    return apiClient.get(`/api/PlayHistory/${token}`);
  },

  getAllAlbums(pageNumber, pageSize) {
    return apiClient.get(`/api/Album/all/${pageNumber}/${pageSize}`);
  },

  getSongsByAlbum(albumId) {
    return apiClient.get(`/api/Song/byAlbum/${albumId}`);
  },

  getAlbumById(id) {
    return apiClient.get(`/api/Album/${id}`);
  },

  getSongById(id) {
    return apiClient.get(`/api/Song/${id}`);
  },

};

export default ApiService;
