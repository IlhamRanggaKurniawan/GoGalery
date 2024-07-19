"use client";

import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import { useSession } from "next-auth/react";
import { getContacts, getGroup, IContact, IGroup } from "@/lib/actions/messaging";
import { IUserPreview } from "@/lib/actions/user";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createConversation, findConversation } from "@/lib/actions/ai";

const ContactList = ({ group }: { group: boolean }) => {
  const { data: session } = useSession();

  const [contacts, setContacts] = useState<IContact[]>([]);
  const [groupList, setGroupList] = useState<IGroup[]>([]);
  const [aiConversation, setAiConversation] = useState<number>();

  const getAllContact = async () => {
    try {
      if (!session) return;

      if (!group) {
        const { data } = await getContacts({ userId: session.user.id });

        return setContacts(data);
      }

      const { data } = await getGroup({ userId: session.user.id });

      return setGroupList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAIConversation = async () => {
    try {
      if (!session) return;
      const conversation = await findConversation({ userId: session.user.id });

      setAiConversation(conversation?.id);

      if (!conversation) {
        const conversation = await createConversation({ userId: session.user.id });

        setAiConversation(conversation?.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllContact();
    getAIConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div>
      {aiConversation && (
        <Link href={`ai/${aiConversation}`} className="h-14 flex items-center gap-3 p-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/openAI.jpeg" alt="@shadcn" />
          <AvatarFallback>Open AI</AvatarFallback>
        </Avatar>
        <h4 className="truncate">Open AI</h4>
      </Link>
      )}
      {group
        ? groupList.map((group) => <Contact key={group.id} group id={group.id} name={group.name} profilePicture={group.pictureUrl} />)
        : contacts.map((contact) => {
            const otherParticipant = contact.participants.find((participant: IUserPreview) => participant.id !== session?.user.id);

            return <Contact key={contact.id} id={contact.id} group={false} name={otherParticipant?.username} profilePicture={otherParticipant?.profileUrl} />;
          })}
    </div>
  );
};

export default ContactList;
