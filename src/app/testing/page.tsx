import FollowButton from "@/components/myComponents/FollowButton";
import { isFollowing } from "@/lib/actions/follow";
import { getUserProfie } from "@/lib/actions/user";
import React from "react";

const page = async() => {

  const {data} = await getUserProfie("ilham")
  
  if(data) {
    const isFollow = await isFollowing({ followerId: 14, followingId: 16 })
    if(!isFollow.data) {
      console.log("halo")
    }
    console.log(isFollow)

    return (
      <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 w-screen">
          <FollowButton userId={data.id}/>
      </div>
    );
  }






 
};

export default page;
