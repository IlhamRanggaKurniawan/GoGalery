import ContactHeader from "@/components/myComponents/messages/ContactHeader";
import ContactList from "@/components/myComponents/messages/ContactList";
import Contact from "@/components/newDesign/Contact";
import Header from "@/components/newDesign/Header";
import api from "@/lib/api";
import getSession from "@/lib/serverHooks/getSession";
import { Users } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

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

const page = async () => {

  const { user } = await getSession()

  const contacts = await api.get(`/dm/findall/${user?.id}`, { cache: "no-cache" })

  return (
    <div>
      {contacts && contacts.map((contact: any) => {
        const otherParticipant = contact.Participants.find((Participants: any) => Participants.ID !== user?.id);

        return (
          <Link href={`/messages/${contact.ID}`} key={contact.ID}>
            <Contact username={otherParticipant.Username} profilePicture={otherParticipant.ProfileUrl} />
          </Link>
        )
      })}

    </div>
  );
};

export default page;
