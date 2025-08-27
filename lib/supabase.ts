import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface FormularioLanding {
  id?: number
  nombre: string
  email: string
  telefono?: string
  objetivo_financiero?: string
  created_at?: string
  updated_at?: string
}
