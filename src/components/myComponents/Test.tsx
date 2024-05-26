"use client";

import React, {  } from "react";
import { Button } from "../ui/button";

const Test = () => {
  const followingId = 14;

  const followers = async() => {
    console.log("halo")
    console.log(followingId)
  }
  return (
    <div>
        <Button onClick={() => followers()} className="bg-slate-600">
          follow
        </Button>

    </div>
  );
};

export default Test;
