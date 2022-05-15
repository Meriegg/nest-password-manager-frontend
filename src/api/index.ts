import axios from 'axios'

export const ApiInstance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
})
