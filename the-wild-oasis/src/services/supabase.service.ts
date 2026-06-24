import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mvkxiodaedvzdeovwobm.supabase.co';

const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
    throw new Error('SUPABASE_KEY is missing');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
