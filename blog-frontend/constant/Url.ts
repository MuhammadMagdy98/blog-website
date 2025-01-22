export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  CATEGORIES: "/categories",
  POSTS: "/posts",
  TAGS: "/tags",
  COMMENTS: "/comments",
} as const;
