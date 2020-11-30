import axios from "axios";

export default axios.create({
  baseURL: 'https://ghibliapi.herokuapp.com',
  headers: {
    "Content-type": "application/json",
  },
});
