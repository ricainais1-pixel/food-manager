import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://vdnmdrufjrjewacrxtls.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbm1kcnVmanJqZXdhY3J4dGxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNTkwMDUsImV4cCI6MjA4NzkzNTAwNX0.Yc5UC25cs7ZkVARtOCEiEIcWOvgMbfS0IS2NCKQLQ9E'
)