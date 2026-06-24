import supabase from './supabase.service';

interface ICabin {
    id: number;
    created_at: Date;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: string;
}

export const getCabins = async (): Promise<ICabin[]> => {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        throw new Error(error.message);
    }

    return data as ICabin[];
};
