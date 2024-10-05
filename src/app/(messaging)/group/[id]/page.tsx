import GroupConversation from "@/components/newDesign/messages/GroupConversation"
import GroupConversationHeader from "@/components/newDesign/messages/GroupConversationHeader"
import api from "@/lib/api"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | Connect Verse",
  description: "Welcome to the Connect Verse Messages page",
  keywords: "connect, verse, social media",
  authors: [{ name: "Connect Verse team" }],
  openGraph: {
    title: "Messages | Connect Verse",
    description: "Welcome to the Connect Verse Messages page",
    url: "https://ConnectVerse.com/Messages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Messages | Connect Verse",
    description: "Welcome to the Connect Verse Messages page",
  },
};

const page = async ({ params }: { params: { id: string } }) => {

  const group = await api.get(`/v1/group/${params.id}`, { cache: "no-cache" })

  return (
    <div className="mt-14">
      <GroupConversationHeader name={group.Name} profileUrl={group.PictureUrl} id={+params.id} />
      <GroupConversation conversationId={+params.id} prevMessage={group.Messages} />
    </div>
  )
}

export default page