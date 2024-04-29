import axios from 'axios';
import { useAuth } from '../authContext/AuthContext'

const apiClient = axios.create({
  baseURL: 'https://apibeatflow.web.app/',
  // baseURL: 'http://localhost:5279/',
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers you need
  },
});


const storedToken = localStorage.getItem('token');
if (storedToken) {
  apiClient.defaults.headers['Authorization'] = `${storedToken}`;
}

export const setToken = (token) => {
  localStorage.setItem('token', token);
  apiClient.defaults.headers['Authorization'] = `${token}`;
};

export const removeToken = () => {
  localStorage.removeItem('token');
  delete apiClient.defaults.headers['Authorization'];
};

const ApiService = {
  getNewSongs(pageSize) {
    return apiClient.get(`/api/Song/new?pageSize=${pageSize}`);
  },

  getSongsByArtist(artistId, pageNumber, pageSize) {
    return apiClient.get(`/api/Song/byArtist/${artistId}/${pageNumber}/${pageSize}`);
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
  
  searchUsers(query, artistPage, pageSize) {
    return apiClient.get(`/api/Search/users?query=${query}&pageNumber=${artistPage}&pageSize=${pageSize}`);
  },
  
  searchPlaylists(query, artistPage, pageSize) {
    return apiClient.get(`/api/Search/playlists?query=${query}&pageNumber=${artistPage}&pageSize=${pageSize}`);
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
    return apiClient.post('/api/PlayHistory/listen', { songId });
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

  getAllPlaylists(pageNumber, pageSize) {
    return apiClient.get(`/api/Playlist/allVisible/${pageNumber}/${pageSize}`);
  },

  getSongsOfPlaylist(playlistId) {
    return apiClient.get(`/api/Playlist/${playlistId}/all-songs`);
  },

  getPlaylistById(id) {
    return apiClient.get(`/api/Playlist/${id}`);
  },

  me(token) {
    return apiClient.get(`/api/User/me?token=${token}`);
  },

  getUserById(id) {
    return apiClient.get(`/api/User/${id}`);
  },

  getNrFollow(id) {
    return apiClient.get(`/api/User/allfollows/${id}`);
  },

  followUser(id) {
    return apiClient.post(`/api/User/follow/${id}`, { id });
  },

  unfollowUser(id) {
    return apiClient.post(`/api/User/unfollow/${id}`, { id });
  },

  checkIfIsFollowing(id) {
    return apiClient.get(`/api/User/isfollowing/${id}`);
  },

  getRecommendedSongs() {
    return apiClient.get(`/api/Song/recommended/a`);
  },

  registerAsArtist(data) {
    return apiClient.post(`/api/Artist/register`, data);
  },

  getPlaylistsOfUser(id, pageNumber, pageSize) {
    return apiClient.get(`/api/Playlist/ofUser/${id}/${pageNumber}/${pageSize}`);
   },
   
   getSongsByArtistId(id, pageNumber, pageSize) {
    return apiClient.get(`/api/Song/byArtist/${id}/${pageNumber}/${pageSize}`);
  },

  addNewGenre(data) {
    return apiClient.post(`/api/Genre`, data);
  },

  getGenres() {
    return apiClient.get(`/api/Genre/all`);
  },

  addSong(data) {
    return apiClient.post(`/api/Song`, data);
  },

  getPlaylistByArtist(id, pageNumber, pageSize) {
    return apiClient.get(`/api/Playlist/ofUser/${id}/${pageNumber}/${pageSize}`);
  },

  getPlaylistByUserId(id, pageNumber, pageSize) {
    return apiClient.get(`/api/Playlist/ofUser/${id}/${pageNumber}/${pageSize}`);
  },

  createPlaylist(data) {
    return apiClient.post(`/api/Playlist`, data);
  },

  getMyPlaylistsss(pageNumber, pageSize) {
    return apiClient.get(`/api/Playlist/mine/${pageNumber}/${pageSize}`);
  },

  addSongInPlaylist(playlistId, songId) {
    return apiClient.post(`/api/Playlist/${playlistId}/add-song/${songId}`);
  },

  addNewAlbum(data) {
    return apiClient.post(`/api/Album/Register`, data);
  },

  addSongToAlbum(albumId, songId) {
    return apiClient.post(`/api/Album/${albumId}/songs/${songId}`);
  },

};

export default ApiService;
