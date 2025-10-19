import axios from "axios";

const api = axios.create({
  baseURL: 'http://jussimarleal.com.br/apievento/public/',
});

export default api;