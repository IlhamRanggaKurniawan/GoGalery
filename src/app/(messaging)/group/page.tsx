import Contact from "@/components/newDesign/messages/Contact"
import api from "@/lib/api"
import getSession from "@/lib/serverHooks/getSession"
import Link from "next/link"

const page = async () => {

  const { user } = await getSession()

  const groups = await api.get(`/gc/findall/${user?.id}`, { cache: "no-cache" })

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