import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://mvkxiodaedvzdeovwobm.supabase.co';

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
    throw new Error('SUPABASE_KEY is missing');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
