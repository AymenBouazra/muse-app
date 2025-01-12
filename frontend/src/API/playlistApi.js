import http from '../utils/http';

export const addToPlaylist = (trackId) => {
  return http.put(`/playlist/add`, { trackId });
};

export const removeFromPlaylist = (trackId) => {
  return http.put(`/playlist/remove`, { trackId });
};

export const getPlaylist = () => {
  return http.get(`/playlist/get`);
};