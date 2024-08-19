import ContentHeader from "./ContentHeader";
import ContentFooter from "./ContentFooter";
import ContentDescription from "../../newDesign/content/ContentDescription";
import dynamic from "next/dynamic";
import ContentSkeleton from "./ContentSkeleton";
const ContentMain = dynamic(() => import("./ContentMain"), {
  loading: () => <ContentSkeleton />
})

const Content = ({uploader, url, caption, contentId, profilePicture, id}: {uploader : string, url : string, caption: string, contentId: number, profilePicture: string | null, id: number}) => {
  return (
    <div className="w-screen max-w-[500px]">
      <div className="m-1">
        <ContentHeader uploader={uploader} profilePicture={profilePicture} id={id}/>
      </div>
      <ContentMain url={url} alt={caption}/>
      <ContentFooter contentId={contentId}/>
      <ContentDescription caption={caption}/>
    </div>
  );
};

export default Content;
