import ConversationHeader from "@/components/newDesign/messages/ConversationHeader";
import PrivateConversation from "@/components/newDesign/messages/PrivateConversation";
import api from "@/lib/api";
import getSession from "@/lib/serverHooks/getSession";
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

  const { user } = await getSession()


  const directMessage = await api.get(`/v1/direct/${params.id}`, { cache: "no-cache" })

  const otherParticipantUsername = user.id === directMessage.Participant1Id ? directMessage.Participant2.Username : directMessage.Participant1.Username


  return (
    <div className="mt-2">
      <ConversationHeader name={otherParticipantUsername} />
      <PrivateConversation conversationId={+params.id} prevMessage={directMessage.Messages}/>
    </div>
  );
};

export default page;
