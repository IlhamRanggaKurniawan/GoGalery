import StraightContentInfinityScroll from "@/components/myComponents/content/StraightContentInfinityScroll";
import { getContentByFollowing } from "@/lib/actions/content";

export default async function Home() {
  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4">
      <div className="flex flex-col gap-4 items-center">
      <StraightContentInfinityScroll contentFuction={getContentByFollowing}/>
      </div>
    </div>
  );
}
