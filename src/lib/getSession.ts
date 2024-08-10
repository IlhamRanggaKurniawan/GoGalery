// "use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const getSession = async () => {
  const token = cookies().get("AccessToken")?.value;

  if (!token) {
    return { error: "token not found" };
  }

  return { session: jwtDecode(token) }
};

export default getSession;
