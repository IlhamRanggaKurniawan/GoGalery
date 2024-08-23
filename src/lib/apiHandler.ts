
class Api {
    token: () => Promise<string>

    constructor(tokenFunction: () => Promise<string>) {
        this.token = tokenFunction
    }

    get = async (endpoint: string, { cache }: { cache: RequestCache }) => {
        try {
            console.log(endpoint)

            const token = await this.token()

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                cache,
            })

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.log(error)
        }
    }

    post = async (endpoint: string, { body, cache }: { body: FormData | {}, cache: RequestCache }) => {
        try {
            const token = await this.token()

            const headers: HeadersInit = {
                "Authorization": `Bearer ${token}`,
            };

            if (!(body instanceof FormData)) {
                headers["Content-Type"] = "application/json";
                body = JSON.stringify(body);
            }

            console.log(body)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
                method: "POST",
                credentials: "include",
                body: body as BodyInit, 
                headers,
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
            const token = await this.token()

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

    delete = async (endpoint: string) => {
        try {
            const token = await this.token()

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
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

export default Api