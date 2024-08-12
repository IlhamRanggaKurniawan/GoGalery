import Avatar from '@/components/newDesign/Avatar'
import Header from '@/components/newDesign/Header'
import Message from '@/components/newDesign/Message'
import MessageInput from '@/components/newDesign/MessageInput'
import { ChevronLeft } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header>
        <div className="flex gap-2 items-center h-14">
          <div className="flex gap-2 items-center">
            <ChevronLeft size={30} />
            <div className="h-12 w-12">
              <Avatar profilePicture={null} username="tes" />
            </div>
          </div>
          <h2>Open AI</h2>
        </div>
      </Header>
      <div className=" overflow-y-auto">
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
      </div>
      <MessageInput value="" />
    </div>
  )
}

export default page