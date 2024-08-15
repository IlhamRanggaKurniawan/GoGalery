import { cookies } from "next/headers";

const getToken = async () => {
    const accessToken = cookies().get("AccessToken")?.value;

    if (!accessToken) {
        const refreshToken = cookies().get("RefreshToken")?.value;

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


class Api {
    get = async (endpoint: string) => {
        try {
            const token = await getToken()

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.log(error)
        }
    }

    post = async (endpoint: string, { body, cache }: { body: {}, cache: RequestCache }) => {
        try {
            const token = await getToken()

            console.log(body)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    ...body
                }),
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                cache
            })

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.log(error)
        }
    }

    update = async (endpoint: string, { body, cache }: { body: {}, cache: RequestCache }) => {
        try {
            const token = await getToken()

            console.log(body)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({
                    ...body
                }),
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                cache
            })

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.log(error)
        }
    }

    delete = async (endpoint: string, { body, cache }: { body: {}, cache: RequestCache }) => {
        try {
            const token = await getToken()

            console.log(body)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify({
                    ...body
                }),
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                cache
            })

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.log(error)
        }
    }
}

const api = new Api()

export default api