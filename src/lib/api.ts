import { cookies } from "next/headers";
import Api from "./apiHandler";

export const getToken = async () => {
    const accessToken = cookies().get("AccessToken")?.value;

    if (!accessToken) {
        const refreshToken = cookies().get("RefreshToken")?.value;

        console.log(refreshToken)

        const newAccessToken = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
            method: "GET",
            credentials: "include",
            headers: {
                Cookie: `RefreshToken=${refreshToken}`
            },
        })


        const { accessToken } = await newAccessToken.json()

        return accessToken
    }

    return accessToken
}

const api = new Api(getToken)

export default api
