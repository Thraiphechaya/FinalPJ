import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL ของ supabase!
const supabaseUrl = 'https://zajxpgmnaexfnurpiamx.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphanhwZ21uYWV4Zm51cnBpYW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MTc3MTIsImV4cCI6MjA3Njk5MzcxMn0.rSFT5JDafn-WzIhZhNF85aH0bIP0yTwtDqX61-tbVrM'; 

// ตรวจสอบว่ากำหนดค่าแล้วหรือยัง
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id')) {
  console.warn(
    '⚠️  Please set your Supabase URL and Anon Key in src/lib/supabase.ts\n' +
    '   Get them from: Supabase Dashboard → Settings → API'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// ฟังก์ชันทดสอบการเชื่อมต่อ
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('favorite').select('count');
    if (error) {
      console.log('✅ Supabase connected but table may not exist:', error.message);
    } else {
      console.log('✅ Supabase connected successfully!');
    }
    return { data, error };
  } catch (err) {
    console.log('❌ Supabase connection failed:', err);
    return { error: err };
  }
};