"use client"

import React from 'react'
import { Button } from '../ui/button'
import { getContentByUsername } from '@/lib/actions/content'

const Test = () => {
  return (
    <div>
      <Button onClick={() => getContentByUsername("ilham")}>tes</Button>

    </div>
  )
}

export default Test