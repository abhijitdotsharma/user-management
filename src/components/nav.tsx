'use client'
import { signIn, signOut } from 'next-auth/react'
export default function Navbar() {
  return (
    <nav>
      <button onClick={() => signIn('google', { callbackUrl: '/' })}>
        Sign in
      </button>
      <button onClick={() => signOut()}>Sign Out</button>
    </nav>
  )
}
