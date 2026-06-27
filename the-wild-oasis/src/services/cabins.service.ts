import type ICabin from '../interfaces/ICabin';
import supabase, { supabaseUrl } from './supabase.service';

export const getCabins = async (): Promise<ICabin[]> => {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        throw new Error(error.message);
    }

    return data as ICabin[];
};

export const createCabin = async (newCabin: ICabin): Promise<void> => {
    let imageName = '';
    let imagePath = '';

    if (newCabin.image) {
        imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
            '/',
            '',
        );

        imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
    }

    const { data, error } = await supabase
        .from('cabins')
        .insert([
            {
                ...newCabin,
                image: imagePath,
            },
        ])
        .select()
        .single();

    if (error) throw new Error(error.message);

    // No image? We're done.
    if (!newCabin.image) return;

    const { error: storageError } = await supabase.storage
        .from('cabins-images')
        .upload(imageName, newCabin.image);

    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);

        throw new Error(
            'Cabin image could not be uploaded and the cabin was not created.',
        );
    }
};

export const deleteCabin = async (id: number): Promise<void> => {
    const { error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
};
