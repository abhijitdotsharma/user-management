import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

import { logger } from '../../logger'

export default async function Home() {
  const session = await getServerSession(authOptions)

  // console.log('page.tsx session', session)
  logger.info(`root page.tsx session - ${session}`)
  if (!session) {
    redirect('/auth')
  }

  if (session && session?.isNewUser) {
    redirect('/onboarding')
  }

  redirect('/home')
}
