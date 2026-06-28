import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type ICabin from '../../../interfaces/ICabin';
import { createEditCabin } from '../../../services/cabins.service';

export const useCreateCabin = () => {
    const queryClient = useQueryClient();

    const { isPending: isCreating, mutate: createCabin } = useMutation<
        void,
        Error,
        ICabin
    >({
        mutationFn: (newCabin: ICabin) => createEditCabin(newCabin),
        onSuccess: () => {
            toast.success('New cabin successfully created.');
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isCreating, createCabin };
};
