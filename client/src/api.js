import axios from 'axios'

axios.interceptors.request.use(
    function (config) { //Request gitmeden önce yapılması gereken işlemler
    const {origin} = new URL(config.url)
    const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT]
    const token = localStorage.getItem('access-token')

    if (allowedOrigins.includes(origin)) 
    {
        config.headers.Authorization=token    
    }

    return config;
  }, function (error) {
    //Hata olduğunda yapılması gereken işlemler
    return Promise.reject(error);
  });

export const fetchProductList = async ({pageParam = 0}) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`);
    return data
}

export const fetchProduct = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`);
    return data
}

export const fetchRegister = async(input)=>{
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,input);

    return data
}

export const fetchMe = async()=>{
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`);

    return data
}

export const fetchLogout = async()=>{
    const {data} = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,{
        refresh_token: localStorage.getItem('refresh-token')
    })
    return data
}