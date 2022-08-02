import axios from 'axios'

const baseUrl = `${process.env.NEXT_PUBLIC_GOLEDGER_API_URL}`

export const http = axios.create({
  baseURL: baseUrl,
})
