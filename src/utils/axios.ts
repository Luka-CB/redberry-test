import axios from "axios";

export default axios.create({
  baseURL: "https://api.blog.redberryinternship.ge/api",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer ce8cdaf18bf0ca4a945dba410b3ceac0128df681563c04446f0915537ee7fcab",
  },
});
