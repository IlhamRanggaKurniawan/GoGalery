import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem("AccessToken")
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._entry) {
            originalRequest._entry = true

            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/token`,
                    { withCredentials: true }
                )

                localStorage.setItem("AccessToken", data.accessToken)

                originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`

                return api(originalRequest)
            } catch (error) {
                console.error("Refresh token failed", error);

                localStorage.removeItem("AccessToken")

                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
)

export default api