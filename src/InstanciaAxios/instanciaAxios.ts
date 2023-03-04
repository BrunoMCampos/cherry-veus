import axios from "axios";

const instanciaAxios = axios.create({
    baseURL:"http://localhost:8080/"
});

export default instanciaAxios;