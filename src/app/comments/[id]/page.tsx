import CommentPage from '@/components/newDesign/comment/CommentPage'
import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <CommentPage contentId={+params.id}/>
        </>
    )
}

export default page