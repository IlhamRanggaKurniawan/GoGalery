"use client";

import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import { useSession } from "next-auth/react";
import { getContacts, getGroup } from "@/lib/actions/messaging";

const ContactList = ({ group }: { group: boolean }) => {
  const { data: session } = useSession();

  const [contacts, setContacts] = useState<any[]>([]);
  const [groupList, setGroupList] = useState<any[]>([]);

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
            const otherParticipant = contact.participants.find((participant: any) => participant.id !== session?.user.id);

            const name = otherParticipant?.username;

            return <Contact key={contact.id} id={contact.id} group={false} name={name} />;
          })}
    </div>
  );
};

export default ContactList;
