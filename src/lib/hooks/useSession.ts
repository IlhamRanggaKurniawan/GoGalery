import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export interface IUserSession {
  username: string,
  email: string,
  id: number,
  role: string,
  profileUrl: string,
  bio: string,
  exp: number
}

export const useSession = () => {
  const [user, setUser] = useState<IUserSession>()

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const accessToken = localStorage.getItem("AccessToken");

        if (accessToken) {
          const decodedToken = jwtDecode(accessToken);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp && (decodedToken.exp - currentTime) <= 10) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
              method: "GET",
              credentials: "include",
            });

            const { accessToken } = await response.json();

            localStorage.setItem("AccessToken", accessToken);

            const user: IUserSession = await jwtDecode(accessToken);

            return setUser(user)
          }

          const user: IUserSession = await jwtDecode(accessToken);

          return setUser(user)
        } else {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
            method: "GET",
            credentials: "include",
          });

          const { accessToken } = await response.json();

          localStorage.setItem("AccessToken", accessToken);

          const user: IUserSession = await jwtDecode(accessToken);

          return setUser(user)
        }
      } catch (error) {
        console.error('Error fetching the token:', error);
      }
    };

    fetchToken();
  }, [])

  return { user }
}