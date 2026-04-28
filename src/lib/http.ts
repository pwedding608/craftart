import axios from 'axios'
import { siteUrl } from '@/lib/config'

/** Preconfigured for future webhooks, Edge Functions, or payment callbacks (Razorpay, etc.) */
export const http = axios.create({
  baseURL: siteUrl,
  timeout: 20_000,
  headers: { 'Content-Type': 'application/json' },
})
