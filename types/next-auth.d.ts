import NextAuth from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {

    interface Session {
        user: {
            username: string;
            email: string;
            id: number ;
            role: string;
        };
        expires: string;
    }

    interface User {
        id: number ,
        username: string,
        email: string,
        password: string,
        role: string,
        createdAt: Date
    }


}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
      id: number,
      username: string;
      role: string;
    }
  }