import Contact from "@/components/newDesign/messages/Contact"
import api from "@/lib/api"
import getSession from "@/lib/serverHooks/getSession"
import { Metadata } from "next";
import Link from "next/link"

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

  const groups = await api.get(`/v1/groups/${user?.id}`, { cache: "no-cache" })

  return (
    <div>
      {groups && groups.map((group: any) => (
        <Link href={`/group/${group.ID}`} key={group.ID}>
          <Contact username={group.Name} profilePicture={group.PictureUrl} />
        </Link>
      )
      )}
    </div>
  )
}

export default page