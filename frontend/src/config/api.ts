// Detecta automaticamente se está em desenvolvimento ou produção
const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';

const API_BASE_URL = isDevelopment 
  ? 'http://localhost:8001/api'
  : 'https://twitter-production-0bb6.up.railway.app/api';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/users/token/`,
  SIGNUP: `${API_BASE_URL}/users/signup/`,
  PROFILE: `${API_BASE_URL}/users/profile/`,
  TWEETS: `${API_BASE_URL}/tweets/`,
  LIKE_TWEET: (id: number) => `${API_BASE_URL}/tweets/${id}/like_tweet/`,
  TOGGLE_FOLLOW: (userId: number) => `${API_BASE_URL}/users/toggle-follow/${userId}/`,
  TWEET_COMMENTS: (id: number) => `${API_BASE_URL}/tweets/${id}/comments/`,
  ADD_COMMENT: (id: number) => `${API_BASE_URL}/tweets/${id}/add_comment/`,
};

export default API_BASE_URL;