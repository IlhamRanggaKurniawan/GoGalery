import { jwtDecode } from "jwt-decode";
import Api from "./apiHandler";


export const getToken = async () => {
    const accessToken = localStorage.getItem("AccessToken");

    if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && (decodedToken.exp - currentTime) <= 10) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/token`, {
                method: "GET",
                credentials: "include",
            });

            const { accessToken } = await response.json();

            localStorage.setItem("AccessToken", accessToken);

            return accessToken;
        }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/token`, {
        method: "GET",
        credentials: "include",
    });

    const { accessToken : newAccessToken } = await response.json();

    localStorage.setItem("AccessToken", newAccessToken);

    return accessToken;
};

const apiClient = new Api(getToken)

export default apiClient