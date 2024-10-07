import GroupConversation from "@/components/newDesign/messages/GroupConversation"
import GroupConversationHeader from "@/components/newDesign/messages/GroupConversationHeader"
import api from "@/lib/api"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | GoGalery",
  description: "Welcome to the GoGalery Messages page",
  keywords: "Go, Galery, social media",
  authors: [{ name: "GoGalery team" }],
  openGraph: {
    title: "Messages | GoGalery",
    description: "Welcome to the GoGalery Messages page",
    url: "https://gogalery.com/Messages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Messages | GoGalery",
    description: "Welcome to the GoGalery Messages page",
  },
};

const page = async ({ params }: { params: { id: string } }) => {

  const group = await api.get(`/v1/group/${params.id}`, { cache: "no-cache" })

  return (
    <div className="mt-2">
      <GroupConversationHeader name={group.Name} profileUrl={group.PictureUrl} id={+params.id} />
      <GroupConversation conversationId={+params.id} prevMessage={group.Messages} />
    </div>
  )
}

export default page