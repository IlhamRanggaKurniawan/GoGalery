"use server"

export const fetchToken = async () => {
    const accessTokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
        method: "GET",
        credentials: "include",
      });
    
      const data = await accessTokenResponse.json();

      return data
}