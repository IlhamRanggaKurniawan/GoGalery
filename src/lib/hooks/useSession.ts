import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export interface IUserSession {
  username: string,
  email: string,
  id: number,
  role: string,
  exp: number
}

export const useSession = () => {
  const [user, setUser] = useState<IUserSession | null>(null)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = localStorage.getItem("AccessToken");
        if (token) {
          const decoded: IUserSession = await jwtDecode(token);

          setUser(decoded);
        }
      } catch (error) {
        console.error('Error fetching the token:', error);
      }
    };

    fetchToken();
  }, [])

  return { user }
}