import axios from "axios";

const api = axios.create({
  baseURL: "https://api.realworld.io/api",
});

// Set token for authentication
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};

// User login
export const loginUser = async (email, password) => {
  const response = await api.post("/users/login", {
    user: {
      email,
      password,
    },
  });
  return response.data.user;
};

// User registration
export const registerUser = async (username, email, password) => {
  const response = await api.post("/users", {
    user: { username, email, password },
  });
  return response.data.user;
};

// Get current user
export const getCurrentUser = async () => {
  const response = await api.get("/user");
  return response.data.user;
};

// Update user
export const updateUser = async (userData) => {
  const response = await api.put("/user", { user: userData });
  return response.data.user;
};

// Get profile
export const getProfile = async (username) => {
  const response = await api.get(`/profiles/${username}`);
  return response.data;
};

// Follow user
export const followUser = async (username) => {
  const response = await api.post(`/profiles/${username}/follow`);
  return response.data;
};

// Unfollow user
export const unfollowUser = async (username) => {
  const response = await api.delete(`/profiles/${username}/follow`);
  return response.data;
};

// List articles
export const listArticles = async (
  tag,
  author,
  favorited,
  limit = 0,
  offset = 0
) => {
  const params = {
    tag,
    author,
    favorited,
    limit,
    offset,
  };

  const response = await api.get("/articles", { params });
  return response.data;
};

// Feed articles
export const feedArticles = async (limit = 0, offset = 0) => {
  const params = {
    limit,
    offset,
  };
  const response = await api.get("/articles/feed", { params });
  return response.data;
};

// Get article
export const getArticle = async (slug) => {
  const response = await api.get(`/articles/${slug}`);
  return response.data;
};

// Create article
export const createArticle = async (articleData) => {
  const response = await api.post("/articles", { article: articleData });
  return response.data.article;
};

// Update article
export const updateArticle = async (slug, articleData) => {
  const response = await api.put(`/articles/${slug}`, { article: articleData });
  return response.data.article;
};

// Delete article
export const deleteArticle = async (slug) => {
  await api.delete(`/articles/${slug}`);
};

// Add comment to an article
export const addCommentToArticle = async (slug, body) => {
  const response = await api.post(`/articles/${slug}/comments`, {
    comment: body,
  });
  return response.data.comment;
};

// Get comments from an article
export const getCommentsFromArticle = async (slug) => {
  const response = await api.get(`/articles/${slug}/comments`);
  return response.data;
};

// Delete comment
export const deleteComment = async (slug, commentId) => {
  await api.delete(`/articles/${slug}/comments/${commentId}`);
};

// Favorite article
export const favoriteArticle = async (slug) => {
  const response = await api.post(`/articles/${slug}/favorite`);
  return response.data;
};

// Unfavorite article
export const unfavoriteArticle = async (slug) => {
  const response = await api.delete(`/articles/${slug}/favorite`);
  return response.data;
};

// Get tags
export const getTags = async () => {
  const response = await api.get("/tags");
  return response.data;
};

export default api;
