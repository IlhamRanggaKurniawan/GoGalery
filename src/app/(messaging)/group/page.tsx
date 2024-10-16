import Contact from "@/components/newDesign/messages/Contact"
import api from "@/lib/api"
import EachUtils from "@/lib/EachUtils";
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

  const groups = await api.get(`/v1/groups`, { cache: "no-cache" })

  return (
    <EachUtils of={groups} render={(group: any) => (
      <Link href={`/group/${group.Id}`} key={group.Id}>
        <Contact username={group.Name} profilePicture={group.PictureUrl} />
      </Link>
    )}/>
  )
}

export default page