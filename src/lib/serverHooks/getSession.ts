
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const getSession = async () => {
  const accessToken = cookies().get("AccessToken")?.value;

  if (!accessToken) return

  return { session: jwtDecode(accessToken) }
};

export default getSession;
