import Contact from "@/components/newDesign/messages/Contact";
import api from "@/lib/api";
import EachUtils from "@/lib/EachUtils";
import getSession from "@/lib/serverHooks/getSession";
import { Metadata } from "next";
import Link from "next/link";


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

const page = async () => {

  const { user } = await getSession()

  const contacts = await api.get(`/v1/directs`, { cache: "no-cache" })

  return (
    <EachUtils of={contacts} render={(contact: any) => {
      const otherParticipant = user.id === contact.Participant1Id ? contact.Participant2 : contact.Participant1

      return (
        <Link href={`/messages/${contact.Id}`} key={contact.Id}>
          <Contact username={otherParticipant.Username} profilePicture={otherParticipant.ProfileUrl} />
        </Link>
      )
    }} />
  );
};

export default page;
