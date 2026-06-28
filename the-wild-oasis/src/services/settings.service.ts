import type { ISettings } from '../interfaces/ISettings';
import supabase from './supabase.service';

export async function getSettings(): Promise<ISettings> {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

    if (error) {
        console.error(error);
        throw new Error('Settings could not be loaded');
    }
    return data as ISettings;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting: ISettings) {
    const { data, error } = await supabase
        .from('settings')
        .update(newSetting)
        .eq('id', 1)
        .single();

    if (error) {
        console.error(error);
        throw new Error('Settings could not be updated');
    }
    return data;
}
