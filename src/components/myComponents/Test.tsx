"use client"

import React from 'react'
import { Button } from '../ui/button'
import { getAllContent } from '@/lib/actions/content'

const Test = () => {
  return (
    <div>
      <Button onClick={() => getAllContent()}>tes</Button>

    </div>
  )
}

export default Test