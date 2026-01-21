// Detecta automaticamente se está em desenvolvimento ou produção
const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';

const API_BASE_URL = isDevelopment 
  ? 'http://localhost:8001/api'
  : 'https://twitter-b01m.onrender.com/api';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/users/token/`,
  SIGNUP: `${API_BASE_URL}/users/signup/`,
  PROFILE: `${API_BASE_URL}/users/profile/`,
  TWEETS: `${API_BASE_URL}/tweets/`,
  LIKE_TWEET: (id: number) => `${API_BASE_URL}/tweets/${id}/like_tweet/`,
  TOGGLE_FOLLOW: (userId: number) => `${API_BASE_URL}/users/toggle-follow/${userId}/`,
  TWEET_COMMENTS: (id: number) => `${API_BASE_URL}/tweets/${id}/comments/`,
  ADD_COMMENT: (id: number) => `${API_BASE_URL}/tweets/${id}/add_comment/`,
  FOLLOWERS_FOLLOWING: `${API_BASE_URL}/users/followers-following/`,
};

export default API_BASE_URL;