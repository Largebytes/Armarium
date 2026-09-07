import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://emfnlapvxdkcqznrusse.supabase.co'
const supabaseAnonKey = 'sb_publishable_CT1E0pbZVRl44NxB-DZm-A_3LJAC8oK'

export const supabase = createClient(supabaseUrl,supabaseAnonKey)




