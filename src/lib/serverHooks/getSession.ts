"use server"

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { IUserSession } from "../hooks/useSession";
import { getToken } from "../api";

const getSession = async () => {
  const accessToken = cookies().get("AccessToken")?.value;

  if (accessToken) {

    const user: IUserSession = await jwtDecode(accessToken)

    return { user }
  }

  const token = await getToken()

  const user: IUserSession = await jwtDecode(token)

  return { user }
};

export default getSession;
