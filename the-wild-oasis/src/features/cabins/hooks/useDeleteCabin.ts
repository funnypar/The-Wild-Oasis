import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin } from '../../../services/cabins.service';

export const useDeleteCabin = () => {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate } = useMutation({
        mutationFn: (id: number) => deleteCabin(id),
        onSuccess: () => {
            toast.success('Cabin successfully deleted');
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, mutate };
};
