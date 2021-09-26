import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com/users/",
  headers: {
    Authorization: process.env.GITHUB_CLIENT_SECRET,
  },
});
