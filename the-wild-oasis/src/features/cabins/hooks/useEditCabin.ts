import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type ICabin from '../../../interfaces/ICabin';
import { createEditCabin } from '../../../services/cabins.service';

type EditCabinVariables = {
    newCabinData: ICabin;
    id: number;
};

export const useEditCabin = () => {
    const queryClient = useQueryClient();

    const { isPending: isEditing, mutate: editCabin } = useMutation<
        void,
        Error,
        EditCabinVariables
    >({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),

        onSuccess: () => {
            toast.success('Cabin successfully edited.');
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editCabin };
};
