import Contact from "@/components/newDesign/messages/Contact"
import api from "@/lib/api"
import getSession from "@/lib/serverHooks/getSession"
import { Metadata } from "next";
import Link from "next/link"

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