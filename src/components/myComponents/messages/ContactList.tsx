"use client";

import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import { useSession } from "next-auth/react";
import { getContacts, getGroup, IContact, IGroup } from "@/lib/actions/messaging";
import { IUserPreview } from "@/lib/actions/user";

const ContactList = ({ group }: { group: boolean }) => {
  const { data: session } = useSession();

  const [contacts, setContacts] = useState<IContact[]>([]);
  const [groupList, setGroupList] = useState<IGroup[]>([]);

  const getAllContact = async () => {
    if (!session) return;

    if (!group) {
      const { data } = await getContacts({ userId: session.user.id });

      return setContacts(data);
    }

    const { data } = await getGroup({ userId: session.user.id });

    return setGroupList(data);
  };

  useEffect(() => {
    getAllContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div>
      {group ? groupList.map((group) => <Contact key={group.id} group id={group.id} name={group.name} />)
        : contacts.map((contact) => {
            const otherParticipant = contact.participants.find((participant: IUserPreview) => participant.id !== session?.user.id)?.username;

            return <Contact key={contact.id} id={contact.id} group={false} name={otherParticipant} />;
          })}
    </div>
  );
};

export default ContactList;
