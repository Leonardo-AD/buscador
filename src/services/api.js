import axios from 'axios'

// API: https://viacep.com.br/ws/numero_do_cep/json/

export const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
})
