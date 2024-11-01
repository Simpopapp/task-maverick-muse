import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jgecrqhamqghfgxqcyqx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZWNycWhhbXFnaGZneHFjeXF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0NDA1MDYsImV4cCI6MjA0NjAxNjUwNn0.0dl5vAOE2Du4vHDITq7iEcmi6A65h4Wwr91_qXwoopE'

export const supabase = createClient(supabaseUrl, supabaseKey)