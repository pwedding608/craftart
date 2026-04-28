import { useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import type { Profile } from '@/lib/supabase/types'

/** `undefined` means profile fetch not finished yet for the current user */
type ProfileState = Profile | null | undefined

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<ProfileState>(undefined)
  const [authLoading, setAuthLoading] = useState(() => supabase != null)

  useEffect(() => {
    const client = supabase
    if (!client) {
      return
    }

    let profileRequest = 0

    function loadProfile(userId: string | undefined) {
      const seq = ++profileRequest
      if (!userId) {
        setProfile(null)
        return
      }
      setProfile(undefined)
      const t = window.setTimeout(() => {
        if (seq !== profileRequest) return
        console.error('profiles request timed out')
        setProfile(null)
      }, 15_000)

      void client
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()
        .then(({ data, error }) => {
          window.clearTimeout(t)
          if (seq !== profileRequest) return
          if (error) {
            console.error('profiles fetch failed', error)
            setProfile(null)
            return
          }
          setProfile(data as Profile | null)
        })
    }

    const { data: sub } = client.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      loadProfile(s?.user?.id)
    })

    void client.auth
      .getSession()
      .then(({ data: { session: s }, error }) => {
        if (error) console.error('getSession', error)
        setSession(s)
        setUser(s?.user ?? null)
        loadProfile(s?.user?.id)
      })
      .catch((e) => console.error('getSession', e))
      .finally(() => setAuthLoading(false))

    return () => sub.subscription.unsubscribe()
  }, [])

  const isAdmin = profile?.role === 'admin'
  const loading = authLoading || (user != null && profile === undefined)

  return { session, user, profile, loading, isAdmin, supabase }
}
