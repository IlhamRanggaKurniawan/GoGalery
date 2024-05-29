import ContentHeader from "./ContentHeader";
import ContentFooter from "./ContentFooter";
import ContentDescription from "./ContentDescription";
import dynamic from "next/dynamic";
import ContentSkeleton from "./ContentSkeleton";
const ContentMain = dynamic(() => import("./ContentMain"), {
  loading: () => <ContentSkeleton />
})

const Content = ({uploader, url, caption}: {uploader : string, url : string, caption: string}) => {
  return (
    <div className="w-screen max-w-[500px]">
      <div className="m-1">
        <ContentHeader uploader={uploader}/>
      </div>
      <ContentMain url={url} alt={caption}/>
      <ContentFooter />
      <ContentDescription caption={caption}/>
    </div>
  );
};

export default Content;
