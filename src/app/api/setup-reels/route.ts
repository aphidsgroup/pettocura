import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Missing env vars' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const { error } = await supabase.rpc('exec_sql', {
    query: `
      CREATE TABLE IF NOT EXISTS public.reels (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL DEFAULT '',
        video_url TEXT NOT NULL,
        platform TEXT NOT NULL DEFAULT 'youtube',
        is_active BOOLEAN NOT NULL DEFAULT true,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'reels' AND policyname = 'Allow public read on reels') THEN
          CREATE POLICY "Allow public read on reels" ON public.reels FOR SELECT USING (true);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'reels' AND policyname = 'Allow all operations on reels') THEN
          CREATE POLICY "Allow all operations on reels" ON public.reels FOR ALL USING (true) WITH CHECK (true);
        END IF;
      END $$;
    `
  });

  if (error) {
    // Fallback: table might already exist, try inserting directly
    return NextResponse.json({ message: 'Table may need manual creation. See admin panel for SQL.', error: error.message }, { status: 200 });
  }

  return NextResponse.json({ success: true });
}
