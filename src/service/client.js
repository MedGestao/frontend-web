import axios from 'axios'

const ViaCepClient = axios.create({
  baseURL: 'https://viacep.com.br/ws',
  headers: {
    'content-type': 'application/json;charset=utf-8',
  }
})

export { ViaCepClient }