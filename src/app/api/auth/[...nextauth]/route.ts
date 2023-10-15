import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { FirestoreAdapter } from '@auth/firebase-adapter'

import { firestore } from '@/lib/firebase-config'

export const authOptions = {
  adapter: FirestoreAdapter(firestore),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, isNewUser }) {
      if (isNewUser !== undefined) {
        token.isNewUser = isNewUser
      }
      return token
    },
    async session({ session, token }) {
      if (token.isNewUser !== undefined) {
        session.isNewUser = token.isNewUser
      }

      return session
    },
  },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
