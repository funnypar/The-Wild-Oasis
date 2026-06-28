import type ICabin from '../interfaces/ICabin';
import supabase, { supabaseUrl } from './supabase.service';

export const getCabins = async (): Promise<ICabin[]> => {
    const { data, error } = await supabase.from('cabins').select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data as ICabin[];
};

export const createEditCabin = async (
    newCabin: ICabin,
    id?: number,
): Promise<void> => {
    // Check if image is a string (existing URL) or a File (new upload)
    const isFileObject = newCabin.image instanceof File;
    const isExistingImagePath =
        typeof newCabin.image === 'string' &&
        newCabin.image?.startsWith?.(supabaseUrl);

    const hasImagePath: boolean = isExistingImagePath;
    const imageName = hasImagePath
        ? ''
        : `${Math.random()}-${isFileObject ? (newCabin.image as File).name : newCabin.image}`.replaceAll(
              '/',
              '',
          );
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

    // Create/Edit cabin
    let query = supabase.from('cabins');

    // A) Create
    if (!id)
        query = query.insert([
            {
                ...newCabin,
                image: imagePath,
            },
        ]);
    // B) Edit
    if (id)
        query = query
            .update({
                ...newCabin,
                image: imagePath,
            })
            .eq('id', id);

    const { data, error } = await query.select().single();
    if (error) throw new Error(error.message);

    // No new image? We're done.
    if (!isFileObject) return;

    const { error: storageError } = await supabase.storage
        .from('cabins-images')
        .upload(imageName, newCabin.image as File);

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
