import axios from 'axios'


export function request(config) {
  const a = axios.create({
    baseURL: '/api',
    settimeout: 20000
  })
  a.interceptors.request.use((config) => {
      return config
    }, error => {}
    // console.log(error)
  )
  a.interceptors.response.use((res) => {
    console.log(res.data);
    return res.data
  }, err => {
    console.log(err);
  })
  return a(config)
}