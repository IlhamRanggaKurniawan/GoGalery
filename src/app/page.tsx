import Content from "@/components/myComponents/content/Content";
import { getAllContent, IContent } from "@/lib/actions/content";

export default async function Home() {
  const contents = await getAllContent()
  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4">
      <div className="flex flex-col gap-4 items-center">
      {contents ? contents.map((content : IContent) => (
          <Content key={content.id} uploader={content.uploader.username} caption={content.caption} url={content.url}/>
        )): (
          <span className="text-red-600 font-semibold ">Something went wrong</span>
        )}
      </div>
    </div>
  );
}
