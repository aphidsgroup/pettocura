import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({
      success: false,
      message: 'Supabase environment variables are not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
    }, { status: 500 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Try to read from the table first
    const { error: readError } = await supabase
      .from('site_settings')
      .select('key')
      .limit(1);

    if (readError?.code === '42P01') {
      return NextResponse.json({
        success: false,
        message: 'Table "site_settings" does not exist. Please run the SQL below in your Supabase SQL Editor:',
        sql: `CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.site_settings (key, value) VALUES ('maintenance_mode', 'false');

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can update site settings" ON public.site_settings FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert site settings" ON public.site_settings FOR INSERT WITH CHECK (true);`,
      });
    }

    // Table exists, check if maintenance_mode row exists
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'maintenance_mode')
      .single();

    if (!data) {
      await supabase
        .from('site_settings')
        .insert({ key: 'maintenance_mode', value: 'false' });
    }

    return NextResponse.json({
      success: true,
      message: 'site_settings table is ready!',
      maintenance_mode: data?.value || 'false',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
