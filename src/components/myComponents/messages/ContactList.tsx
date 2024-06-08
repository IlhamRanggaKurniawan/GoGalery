"use client";

import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import { useSession } from "next-auth/react";
import { getDirectMessage, getGroup, IDM } from "@/lib/actions/messaging";

const ContactList = ({ group }: { group: boolean }) => {
  const { data: session } = useSession();

  const [contacts, setContacts] = useState<IDM[]>([]);
  const [groupList, setGroupList] = useState<any[]>([]);

  const getAllContact = async () => {
    if (!session) {
      return;
    }

    if (!group) {
      const DM: any = await getDirectMessage({ userId: session.user.id });

      return setContacts(DM);
    }

    const Group: any = await getGroup({ userId: session.user.id });

    return setGroupList(Group);
  };

  useEffect(() => {
    getAllContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (!session) {
    return;
  }

  return (
    <div>
      {group ? (
        groupList.map((group) => (
          <Contact key={group.id} group id={group.id} name={group.name}/>
        ))
      ) : (
        contacts.map((contact) => {
          const otherParticipant = contact.participants.find((participant: any) => participant.id !== session.user.id);

          const name = otherParticipant?.username;

          return <Contact key={contact.id} id={contact.id} group={false} name={name} />;
        })
      )}
    </div>
  );
};

export default ContactList;
