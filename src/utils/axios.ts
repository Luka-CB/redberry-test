import axios from "axios";

export default axios.create({
  baseURL: "https://api.blog.redberryinternship.ge/api",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer d9863d8d5efdda1375f379249e9614da88c403d52fcb0812b92522468253dfeb",
  },
});
