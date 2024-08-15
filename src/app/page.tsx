import StraightContentInfinityScroll from "@/components/myComponents/content/StraightContentInfinityScroll";
import HomePageBar from "@/components/myComponents/HomePageBar";
import Content from "@/components/newDesign/Content";
import Navbar from "@/components/newDesign/Navbar";
import { getContentByFollowing } from "@/lib/actions/content";
import { fetchToken } from "@/lib/actions/token";
import api from "@/lib/api";
import getSession from "@/lib/serverHooks/getSession";
import React from "react";

const page = async () => {
  const contents = await api.get("/content/findall")

  // console.log(contents)

  const data = await api.post("/user/login", {
    body: {
      username: "ilham",
      password: "123123123"
    },
    cache: "default"
  })


  return (
    <div>
      <div className="overflow-y-auto flex flex-col items-center">
        {/* <p>{token}</p> */}
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
      </div>
    </div>
  );
};

export default page;

