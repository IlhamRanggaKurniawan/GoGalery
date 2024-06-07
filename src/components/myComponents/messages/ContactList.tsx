"use client";

import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import { useSession } from "next-auth/react";
import { getExistingDM, IDM } from "@/lib/actions/messaging";

const ContactList = ({ group }: { group: boolean }) => {
  const { data: session } = useSession();

  const [contacts, setContacts] = useState<IDM[]>([])

  const getAllContact = async () => {
    if (session) {
      const DM: any = await getExistingDM({ userId: session.user.id });

      setContacts(DM)
    }
  };

  useEffect(() => {
    getAllContact();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!session) {
    return
  }

  return (
    <div>
        {contacts.map((contact) => {
        // Find the participant that is not the current user
        const otherParticipant = contact.participants.find(
          (participant) => participant.id !== session.user.id
        );

        // If otherParticipant is found, display their username
        const name = otherParticipant ? otherParticipant.username : "Unknown";

        return (
          <Contact
            key={contact.id}
            id={contact.id}
            group={group}
            name={name}
          />
        );
      })}
    </div>
  );
};

export default ContactList;
