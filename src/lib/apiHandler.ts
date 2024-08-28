
class Api {
    token: () => Promise<string>

    constructor(tokenFunction: () => Promise<string>) {
        this.token = tokenFunction
    }

    get = async (endpoint: string, { cache }: { cache: RequestCache }) => {
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
    }

    post = async (endpoint: string, { body, cache }: { body: FormData | {}, cache: RequestCache }) => {
        const token = await this.token()

        const headers: HeadersInit = {
            "Authorization": `Bearer ${token}`,
        };

        if (!(body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(body);
        }

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
    }

    patch = async (endpoint: string, { body, cache }: { body: {}, cache: RequestCache }) => {
        const token = await this.token()

        const headers: HeadersInit = {
            "Authorization": `Bearer ${token}`,
        };

        if (!(body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(body);
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
            method: "PATCH",
            credentials: "include",
            body: body as BodyInit,
            headers,
            cache
        })

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        console.log(response)

        const data = await response.json()

        console.log(data)

        return data
    }

    delete = async (endpoint: string) => {

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
    }
}

export default Api