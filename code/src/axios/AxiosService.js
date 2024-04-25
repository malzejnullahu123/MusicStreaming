import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5279/',
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers you need
  },
});

const getUserIdFromHeaders = () => {
  const userIdHeader = apiClient.defaults.headers['X-User-Id'];
  return userIdHeader;
};

// Check if user credentials exist in session storage and set headers accordingly
const storedCredentials = JSON.parse(localStorage.getItem('userCredentials'));
if (storedCredentials) {
  apiClient.defaults.headers['X-User-Id'] = storedCredentials.userId;
  apiClient.defaults.headers['X-User-Name'] = storedCredentials.name;
  apiClient.defaults.headers['X-User-Email'] = storedCredentials.email;
}

export const setUserCredentials = (userId, name, email) => {
  localStorage.setItem('userCredentials', JSON.stringify({ userId, name, email }));
  apiClient.defaults.headers['X-User-Id'] = userId;
  apiClient.defaults.headers['X-User-Name'] = name;
  apiClient.defaults.headers['X-User-Email'] = email;
};

export const removeUserCredentials = () => {
  localStorage.removeItem('userCredentials');
  delete apiClient.defaults.headers['X-User-Id'];
  delete apiClient.defaults.headers['X-User-Name'];
  delete apiClient.defaults.headers['X-User-Email'];
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
    const userId = getUserIdFromHeaders();
    return apiClient.post('/api/PlayHistory', { userId, songId });
  },

  getPlayHistory() {
    const userId = getUserIdFromHeaders();
    return apiClient.get(`/api/PlayHistory/${userId}`);
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
