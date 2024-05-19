import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import register from '@/lib/actions/authentication'

const RegisterForm = () => {
  return (
    <div className="flex  justify-center items-center h-screen">
    <div className="w-full p-6 rounded-lg shadow-m max-w-[26rem]">
      <div className="mb-3 ">
        <h1 className="text-center font-bold"> SpaceShip Social media</h1>
      </div>
      <Separator className="my-2" />
      <form className="flex flex-col gap-4" action={register}>
        <div>
          <label htmlFor="username">username</label>
          <Input id="username" type="text" required placeholder="username" name='username'/>
        </div>
        <div>
          <label htmlFor="email">email</label>
          <Input id="email" type="email" required placeholder="email" name='email'/>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <Input id="password" type="password" required placeholder="password" name='password'/>
        </div>
        <div>
          <label htmlFor="confPassword">confirm password</label>
          <Input id="confPassword" type="password" required placeholder="confirm password" name='confPassword'/>
        </div>
        <div className="flex justify-center">
          <Button className="w-full font-bold" type='submit'>register</Button>
        </div>
      </form>
      <div>
        <Link href="/login">already have account?</Link>
      </div>
    </div>
  </div>
  )
}

export default RegisterForm