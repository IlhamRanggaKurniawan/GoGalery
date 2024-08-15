"use server"

export const fetchToken = async () => {
    const accessTokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
        method: "GET",
        credentials: "include",
      });
  
      console.log(accessTokenResponse)
  
      const data = await accessTokenResponse.json();
      console.log(data);

      return data
}