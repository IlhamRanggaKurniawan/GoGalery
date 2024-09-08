import GroupConversation from "@/components/newDesign/messages/GroupConversation"
import GroupConversationHeader from "@/components/newDesign/messages/GroupConversationHeader"
import api from "@/lib/api"


const page = async ({ params }: { params: { id: string } }) => {

  const group = await api.get(`/gc/findone/${params.id}`, { cache: "no-cache" })

  return (
    <div className="mt-14">
      <GroupConversationHeader name={group.Name} profileUrl={group.PictureUrl} id={+params.id}/>
      <GroupConversation conversationId={+params.id} prevMessage={group.Messages} />
    </div>
  )
}

export default page