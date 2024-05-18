import { Separator } from "@/components/ui/separator";
import { Grid3X3, Tag } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProfileNavigation = ({ username, isTagged }: { username: string; isTagged: boolean }) => {
  return (
    <div className="flex items-center justify-evenly">
      <Link href={`/${username}`}>{isTagged ? <Grid3X3 size={27} /> : <Grid3X3 size={27} color="#5eb9dd" />}</Link>
      <Separator orientation="vertical" className="h-6" />
      <Link href={`/${username}/tagged`}>{isTagged ? <Tag size={27} color="#5eb9dd" /> : <Tag size={27} />}</Link>
    </div>
  );
};

export default ProfileNavigation;
