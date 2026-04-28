import { useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import type { Profile } from '@/lib/supabase/types'

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(() => supabase != null)

  useEffect(() => {
    const client = supabase
    if (!client) {
      return
    }

    const { data: sub } = client.auth.onAuthStateChange(async (_e, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) {
        const { data } = await client.from('profiles').select('*').eq('id', s.user.id).maybeSingle()
        setProfile(data as Profile | null)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    void client.auth.getSession().then(async ({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) {
        const { data } = await client.from('profiles').select('*').eq('id', s.user.id).maybeSingle()
        setProfile(data as Profile | null)
      }
      setLoading(false)
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  const isAdmin = profile?.role === 'admin'

  return { session, user, profile, loading, isAdmin, supabase }
}
