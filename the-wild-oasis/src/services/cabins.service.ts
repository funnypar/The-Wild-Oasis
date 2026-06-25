import type ICabin from '../interfaces/ICabin';
import supabase from './supabase.service';

export const getCabins = async (): Promise<ICabin[]> => {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        throw new Error(error.message);
    }

    return data as ICabin[];
};

export const deleteCabin = async (id: number): Promise<void> => {
    const { error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
};
